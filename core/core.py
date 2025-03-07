import git
from datetime import datetime
from openai import OpenAI
from env import OPENAI_KEY
from pydantic import BaseModel
import json
import multiprocessing
import os

class GitSummaryStuff(BaseModel):
    summary: str
    blurb: str
    tags: list[str]
    changes_type: list[str]

def gen_summary(diff):
    client = OpenAI(api_key=OPENAI_KEY)
    response = client.beta.chat.completions.parse(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that summarizes git commit changes. Your summaries should be:\n- Highly detailed and logical\n- Simple and concise\n- Natural and conversational\n- Easy to understand\n- Comprehensive and thorough\nFocus on the actual changes and their impact, avoiding any unnecessary text."
            },
            {
                "role": "system",
                "content": "Provide the summary in JSON format with these keys:\n- summary:with proper indentation and bullet points,\n- blurb: A brief, natural-soundingn- tags: List of specific elements that were changed (e.g., functions, features, files)\n- changes_type: List containing any of ['added', 'deleted', 'modified']\n\nExample of an ideal summary format:\n\nAuthentication System Overhaul:\n• Implemented a new JWT-based authentication system in auth.py, replacing the legacy cookie-based approach. This change significantly improves security by using industry-standard token encryption and provides better cross-domain support for our API consumers. The system now handles token refresh automatically, reducing user session timeouts.\n\n• Added comprehensive user session management that tracks device information, login timestamps, and geographic location. This gives users better visibility into their account activity and allows them to manage multiple sessions across devices. The system automatically detects and flags suspicious login patterns.\n\nPerformance Optimizations:\n• Completely restructured database query patterns in user_service.py to reduce load times by 60%. Implemented connection pooling with a maximum of 20 concurrent connections, which resolved the connection timeout issues reported in #1234. Added query result caching with a 5-minute TTL for frequently accessed user data.\n\n• Optimized the image processing pipeline to handle bulk uploads more efficiently. The system now processes images in batches of 50, using worker threads to parallelize the workload. This reduced the average processing time from 3.2s to 0.8s per image while maintaining the same quality standards.\n\nBug Fixes and Security Patches:\n• Fixed a critical race condition in the payment processing module that could occasionally cause double-charging. The fix implements proper transaction isolation levels and adds retry logic with exponential backoff. All payment operations are now atomic and idempotent.\n\n• Addressed security vulnerability CVE-2023-XXXX by updating the password hashing mechanism to Argon2id. Added automatic password strength validation that enforces minimum length (12 chars), complexity rules, and checks against common password databases. Existing passwords will be automatically upgraded on next login.\n\nThe tags should specifically reference unique components affected by the changes."
            },
            {
                "role": "system",
                "content": "The summary should be so damn useful that it can be used to write a blog post or a technical paper, like no fluff, just the facts, only the main changes, be utmost certain & utter clarity [very very insanely important - do not fail to follow this instruction]"
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

def process_commit(commit_data):
    commit, repo_path = commit_data
    repo = git.Repo(repo_path)
    
    date = datetime.fromtimestamp(commit.committed_date)
    formatted_date = date.strftime('%Y-%m-%d %H:%M:%S')
    human_readable_date = date.strftime('%A %dth %B %Y @ %I:%M%p').lower()
    
    print(f'Processing commit: {commit.hexsha[:8]}')
    
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
                    diff_str += f"➕ File Added\n"
                    if diff.b_path in commit.tree:
                        try:
                            new_content = commit.tree[diff.b_path].data_stream.read().decode('utf-8')
                            diff_str += f"\nNew Content: \n{new_content}\n"
                        except UnicodeDecodeError:
                            diff_str += f"Binary file - content not shown\n"
                elif diff.change_type == 'D':
                    diff_str += f"❌ File Deleted\n"
                    if diff.a_path in parent.tree:
                        try:
                            old_content = parent.tree[diff.a_path].data_stream.read().decode('utf-8')
                            diff_str += f"\nDeleted Content: \n{old_content}\n"
                        except UnicodeDecodeError:
                            diff_str += f"Binary file - content not shown\n"
                elif diff.change_type == 'M':
                    diff_str += f"📝 File Modified\n"
                    diff_str += f"Changes: \n"
                    
                    try:
                        a_blob = parent.tree[diff.a_path].data_stream.read().decode('utf-8')
                        b_blob = commit.tree[diff.b_path].data_stream.read().decode('utf-8')
                        
                        a_lines = a_blob.splitlines()
                        b_lines = b_blob.splitlines()
                        
                        diff_str += f"Old content lines: {len(a_lines)}\n"
                        diff_str += f"New content lines: {len(b_lines)}\n"
                        
                        if len(a_lines) < 100 and len(b_lines) < 100:
                            diff_str += f"\nLine-by-line comparison:\n"
                            max_lines = max(len(a_lines), len(b_lines))
                            
                            found_diff = False
                            
                            for i in range(max_lines):
                                if i < len(a_lines) and i < len(b_lines):
                                    if a_lines[i] != b_lines[i]:
                                        found_diff = True
                                        diff_str += f"Line {i+1}:\n"
                                        diff_str += f"\033[91m- {a_lines[i]}\033[0m\n"
                                        diff_str += f"\033[92m+ {b_lines[i]}\033[0m\n"
                                elif i < len(a_lines):
                                    found_diff = True
                                    diff_str += f"Line {i+1}:\n"
                                    diff_str += f"\033[91m- {a_lines[i]}\033[0m\n"
                                elif i < len(b_lines):
                                    found_diff = True
                                    diff_str += f"Line {i+1}:\n"
                                    diff_str += f"\033[92m+ {b_lines[i]}\033[0m\n"
                            
                            if not found_diff:
                                diff_str += f"No visible text changes (possibly whitespace or line ending changes)\n"
                        else:
                            try:
                                diff_text = diff.diff.decode('utf-8')
                                if diff_text.strip():
                                    for line in diff_text.splitlines():
                                        if line.startswith('+') and not line.startswith('+++'):
                                            diff_str += f"\033[92m{line}\033[0m\n"
                                        elif line.startswith('-') and not line.startswith('---'):
                                            diff_str += f"\033[91m{line}\033[0m\n"
                                        else:
                                            diff_str += f"{line}\n"
                                else:
                                    diff_str += f"File too large for full comparison. Showing sample of new content:\n"
                                    content_preview = b_blob[:500] + "..." if len(b_blob) > 500 else b_blob
                                    diff_str += f"{content_preview}\n"
                            except (AttributeError, TypeError):
                                content_preview = b_blob[:500] + "..." if len(b_blob) > 500 else b_blob
                                diff_str += f"{content_preview}\n"
                    except UnicodeDecodeError:
                        diff_str += f"Binary file - content not shown\n"
                    except (KeyError, AttributeError) as e:
                        try:
                            diff_text = diff.diff.decode('utf-8')
                            if diff_text.strip():
                                for line in diff_text.splitlines():
                                    if line.startswith('+') and not line.startswith('+++'):
                                        diff_str += f"\033[92m{line}\033[0m\n"
                                    elif line.startswith('-') and not line.startswith('---'):
                                        diff_str += f"\033[91m{line}\033[0m\n"
                                    else:
                                        diff_str += f"{line}\n"
                            else:
                                diff_str += f"Unable to show diff: {str(e)}\n"
                        except (AttributeError, TypeError, UnicodeDecodeError):
                            diff_str += f"Unable to show diff: {str(e)}\n"
            except (KeyError, UnicodeDecodeError, AttributeError) as e:
                diff_str += f'Unable to display content - {str(e)}\n'
    else:
        diff_str += '\nInitial commit - showing full content\n'
        for item in commit.tree.traverse():
            if item.type == 'blob':
                diff_str += f'\n📄 File: {item.path}\n'
                try:
                    content = item.data_stream.read().decode('utf-8')
                    diff_str += f'{content}\n'
                except UnicodeDecodeError:
                    diff_str += f'Binary file - content not shown\n'
    
    print(f'Generating summary for commit: {commit.hexsha[:8]}')
    summary = gen_summary(diff_str)
    
    return {
        'commit_hash': commit.hexsha[:8],
        'author': str(commit.author),
        'date': formatted_date,
        'human_readable_date': human_readable_date,
        'message': commit.message.strip(),
        'summary': summary,
    }

def list_commits():
    repo_path = '.'
    repo = git.Repo(repo_path)
    commits = list(repo.iter_commits())
    
    # Prepare data for multiprocessing
    commit_data = [(commit, repo_path) for commit in commits[0:30]]
    
    # Determine the number of processes to use
    num_cores = os.cpu_count()
    num_processes = max(1, min(num_cores - 1, len(commits)))
    
    print(f"Processing {len(commits)} commits using {num_processes} processes")
    
    # Process commits in parallel
    with multiprocessing.Pool(processes=num_processes) as pool:
        commit_store = pool.map(process_commit, commit_data)
    
    # Save results to JSON file
    with open('commit_store.json', 'w') as f:
        json.dump(commit_store, f, indent=4)
    
    print(f"Processed {len(commit_store)} commits and saved to commit_store.json")
    return commit_store

if __name__ == '__main__':
    try:
        list_commits()
    except git.exc.InvalidGitRepositoryError:
        print("Error: Not a valid git repository")
    except Exception as e:
        print(f"An error occurred: {str(e)}") 