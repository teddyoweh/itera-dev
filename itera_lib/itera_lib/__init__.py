import git
from datetime import datetime
from openai import OpenAI
import os
from pathlib import Path
from typing import List, Dict, Any, Optional
import multiprocessing
from pydantic import BaseModel
import json

class GitSummaryStuff(BaseModel):
    summary: str
    blurb: str
    tags: list[str]
    changes_type: list[str]

class Itera:
    def __init__(self, repo_path: str = '.', storage_dir: Optional[str] = None, openai_api_key: Optional[str] = None):
        self.repo_path = repo_path
        self.storage_dir = storage_dir or os.path.join(os.path.expanduser('~'), '.itera')
        self._ensure_storage_exists()
        
        self.openai_api_key = openai_api_key or os.getenv('OPENAI_KEY')
        if not self.openai_api_key:
            raise ValueError("OpenAI API key must be provided either through environment variable OPENAI_KEY or directly to the constructor")
            
        self.openai_client = OpenAI(api_key=self.openai_api_key)
        
    def _ensure_storage_exists(self):
        Path(self.storage_dir).mkdir(parents=True, exist_ok=True)
        
    def _get_storage_path(self, repo_name: str) -> str:
        return os.path.join(self.storage_dir, f"{repo_name}_changelog.json")
        
    def _load_existing_changelog(self, repo_name: str) -> List[Dict[str, Any]]:
        storage_path = self._get_storage_path(repo_name)
        if os.path.exists(storage_path):
            with open(storage_path, 'r') as f:
                return json.load(f)
        return []

    def _save_changelog(self, repo_name: str, changelog: List[Dict[str, Any]]):
        storage_path = self._get_storage_path(repo_name)
        with open(storage_path, 'w') as f:
            json.dump(changelog, f, indent=4)

    def _gen_summary(self, diff: str) -> Dict[str, Any]:
        response = self.openai_client.beta.chat.completions.parse(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that summarizes git commit changes. Your summaries should be:\n- Highly detailed and logical\n- Simple and concise\n- Natural and conversational\n- Easy to understand\n- Comprehensive and thorough\nFocus on the actual changes and their impact, avoiding any unnecessary text."
                },
                {
                    "role": "system",
                    "content": "Provide the summary in JSON format with these keys:\n- summary: with proper indentation and bullet points\n- blurb: A brief, natural-sounding overview\n- tags: List of specific elements that were changed (e.g., functions, features, files)\n- changes_type: List containing any of ['added', 'deleted', 'modified']"
                },
                {
                    "role": "user",
                    "content": f"Here is the diff: {diff}"
                }
            ],
            response_format=GitSummaryStuff,
            max_tokens=3000,
            temperature=0.7,
        )
        return json.loads(response.choices[0].message.parsed.json())

    def _process_commit(self, commit_data: tuple) -> Dict[str, Any]:
        commit, repo_path = commit_data
        repo = git.Repo(repo_path)
        
        date = datetime.fromtimestamp(commit.committed_date)
        formatted_date = date.strftime('%Y-%m-%d %H:%M:%S')
        human_readable_date = date.strftime('%A %dth %B %Y @ %I:%M%p').lower()
        
        diff_str = self._generate_diff_str(commit, repo)
        summary = self._gen_summary(diff_str)
        
        return {
            'commit_hash': commit.hexsha[:8],
            'author': str(commit.author),
            'date': formatted_date,
            'human_readable_date': human_readable_date,
            'message': commit.message.strip(),
            'summary': summary,
        }

    def _generate_diff_str(self, commit, repo) -> str:
        diff_str = ""
        if commit.parents:
            parent = commit.parents[0]
            diffs = parent.diff(commit)
            
            diff_str += f"Changes: \n"
            for diff in diffs:
                diff_str += f"\n File: {diff.a_path}\n"
                if diff.a_path.endswith(('.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf', '.zip', '.DS_Store')):
                    continue
                    
                try:
                    if diff.change_type == 'A':
                        diff_str += self._handle_added_file(diff, commit)
                    elif diff.change_type == 'D':
                        diff_str += self._handle_deleted_file(diff, parent)
                    elif diff.change_type == 'M':
                        diff_str += self._handle_modified_file(diff, parent, commit)
                except (KeyError, UnicodeDecodeError, AttributeError) as e:
                    diff_str += f'Unable to display content - {str(e)}\n'
        else:
            diff_str += self._handle_initial_commit(commit)
        
        return diff_str

    def _handle_added_file(self, diff, commit):
        result = f"➕ File Added\n"
        if diff.b_path in commit.tree:
            try:
                new_content = commit.tree[diff.b_path].data_stream.read().decode('utf-8')
                result += f"\nNew Content: \n{new_content}\n"
            except UnicodeDecodeError:
                result += f"Binary file - content not shown\n"
        return result

    def _handle_deleted_file(self, diff, parent):
        result = f"❌ File Deleted\n"
        if diff.a_path in parent.tree:
            try:
                old_content = parent.tree[diff.a_path].data_stream.read().decode('utf-8')
                result += f"\nDeleted Content: \n{old_content}\n"
            except UnicodeDecodeError:
                result += f"Binary file - content not shown\n"
        return result

    def _handle_modified_file(self, diff, parent, commit):
        result = f"📝 File Modified\nChanges: \n"
        try:
            a_blob = parent.tree[diff.a_path].data_stream.read().decode('utf-8')
            b_blob = commit.tree[diff.b_path].data_stream.read().decode('utf-8')
            
            a_lines = a_blob.splitlines()
            b_lines = b_blob.splitlines()
            
            result += f"Old content lines: {len(a_lines)}\n"
            result += f"New content lines: {len(b_lines)}\n"
            
            if len(a_lines) < 100 and len(b_lines) < 100:
                result += self._handle_small_file_diff(a_lines, b_lines)
            else:
                result += self._handle_large_file_diff(diff, b_blob)
        except UnicodeDecodeError:
            result += f"Binary file - content not shown\n"
        except (KeyError, AttributeError) as e:
            result += self._handle_diff_error(diff, e)
        return result

    def _handle_small_file_diff(self, a_lines, b_lines):
        result = f"\nLine-by-line comparison:\n"
        max_lines = max(len(a_lines), len(b_lines))
        found_diff = False
        
        for i in range(max_lines):
            if i < len(a_lines) and i < len(b_lines):
                if a_lines[i] != b_lines[i]:
                    found_diff = True
                    result += f"Line {i+1}:\n"
                    result += f"\033[91m- {a_lines[i]}\033[0m\n"
                    result += f"\033[92m+ {b_lines[i]}\033[0m\n"
            elif i < len(a_lines):
                found_diff = True
                result += f"Line {i+1}:\n"
                result += f"\033[91m- {a_lines[i]}\033[0m\n"
            elif i < len(b_lines):
                found_diff = True
                result += f"Line {i+1}:\n"
                result += f"\033[92m+ {b_lines[i]}\033[0m\n"
        
        if not found_diff:
            result += f"No visible text changes (possibly whitespace or line ending changes)\n"
        return result

    def _handle_large_file_diff(self, diff, b_blob):
        try:
            diff_text = diff.diff.decode('utf-8')
            if diff_text.strip():
                result = ""
                for line in diff_text.splitlines():
                    if line.startswith('+') and not line.startswith('+++'):
                        result += f"\033[92m{line}\033[0m\n"
                    elif line.startswith('-') and not line.startswith('---'):
                        result += f"\033[91m{line}\033[0m\n"
                    else:
                        result += f"{line}\n"
                return result
            else:
                content_preview = b_blob[:500] + "..." if len(b_blob) > 500 else b_blob
                return f"File too large for full comparison. Showing sample of new content:\n{content_preview}\n"
        except (AttributeError, TypeError):
            content_preview = b_blob[:500] + "..." if len(b_blob) > 500 else b_blob
            return f"{content_preview}\n"

    def _handle_diff_error(self, diff, error):
        try:
            diff_text = diff.diff.decode('utf-8')
            if diff_text.strip():
                result = ""
                for line in diff_text.splitlines():
                    if line.startswith('+') and not line.startswith('+++'):
                        result += f"\033[92m{line}\033[0m\n"
                    elif line.startswith('-') and not line.startswith('---'):
                        result += f"\033[91m{line}\033[0m\n"
                    else:
                        result += f"{line}\n"
                return result
            else:
                return f"Unable to show diff: {str(error)}\n"
        except (AttributeError, TypeError, UnicodeDecodeError):
            return f"Unable to show diff: {str(error)}\n"

    def _handle_initial_commit(self, commit):
        result = '\nInitial commit - showing full content\n'
        for item in commit.tree.traverse():
            if item.type == 'blob':
                result += f'\n📄 File: {item.path}\n'
                try:
                    content = item.data_stream.read().decode('utf-8')
                    result += f'{content}\n'
                except UnicodeDecodeError:
                    result += f'Binary file - content not shown\n'
        return result

    def generate_changelog(self, num_commits: int = 30, use_cache: bool = True) -> List[Dict[str, Any]]:
        repo = git.Repo(self.repo_path)
        repo_name = os.path.basename(os.path.abspath(self.repo_path))
        
        if use_cache:
            existing_changelog = self._load_existing_changelog(repo_name)
            if existing_changelog:
                return existing_changelog

        commits = list(repo.iter_commits())
        commit_data = [(commit, self.repo_path) for commit in commits[0:num_commits]]
        
        num_cores = os.cpu_count()
        num_processes = max(1, min(num_cores - 1, len(commits)))
        
        with multiprocessing.Pool(processes=num_processes) as pool:
            changelog = pool.map(self._process_commit, commit_data)
        
        self._save_changelog(repo_name, changelog)
        return changelog

    def get_latest_changes(self, num_commits: int = 1) -> List[Dict[str, Any]]:
        repo = git.Repo(self.repo_path)
        commits = list(repo.iter_commits()[:num_commits])
        commit_data = [(commit, self.repo_path) for commit in commits]
        
        return [self._process_commit(data) for data in commit_data] 