import click
from rich.console import Console
from rich.panel import Panel
from rich.text import Text
from rich.markdown import Markdown
from rich.console import Group
from datetime import datetime
import git
from typing import Optional
from . import Itera
import os
from openai import OpenAI
import json

console = Console()

def format_summary(summary_dict):
    header = Text("📝 Summary\n", style="bold cyan")
    md = Markdown(summary_dict["summary"], style="white")
    summary_panel = Panel(md, padding=(1, 2), border_style="cyan")
    
    overview_text = Text()
    overview_text.append("🔍 Quick Overview\n", style="bold cyan")
    overview_text.append(summary_dict["blurb"], style="italic white")
    
    tags_text = Text()
    tags_text.append("\n🏷️  Tags: ", style="bold cyan")
    tags = [f"[yellow]{tag}[/]" for tag in summary_dict["tags"]]
    tags_text.append(" • ".join(tags))
    
    changes_text = Text()
    changes_text.append("\n📊 Changes: ", style="bold cyan")
    changes = [f"[{'green' if c == 'added' else 'red' if c == 'deleted' else 'yellow'}]{c}[/]" 
              for c in summary_dict["changes_type"]]
    changes_text.append(" | ".join(changes))
    
    return Group(
        header,
        summary_panel,
        overview_text,
        tags_text,
        changes_text
    )

def print_commit(commit_data):
    panel = Panel(
        format_summary(commit_data["summary"]),
        title=f"[bold blue]Commit {commit_data['commit_hash']}[/] by [yellow]{commit_data['author']}[/]",
        subtitle=f"[italic]{commit_data['human_readable_date']}[/]",
        border_style="blue",
        padding=(1, 2)
    )
    console.print(panel)
    console.print("\n")

@click.group()
def cli():
    """Itera - Generate beautiful changelogs from your git repository"""
    pass

@cli.command()
@click.option('--hash', '-h', help='Specific commit hash to show changelog for')
def show(hash: Optional[str]):
    """Show changelog for a specific commit"""
    try:
        changelog = Itera()
        if hash:
            repo = git.Repo()
            commit = repo.commit(hash)
            changes = changelog._process_commit((commit, '.'))
            print_commit(changes)
        else:
            console.print("[red]Please provide a commit hash using --hash option[/]")
    except git.exc.BadName:
        console.print(f"[red]Error: Commit hash '{hash}' not found[/]")
    except Exception as e:
        console.print(f"[red]Error: {str(e)}[/]")

@cli.command()
@click.option('--limit', '-l', default=10, help='Number of commits to show')
def all(limit: int):
    """Show changelog for all commits"""
    try:
        repo = git.Repo()
        changelog = Itera()
        commits = list(repo.iter_commits())[:limit]
        
        with console.status(f"[bold green]Processing {len(commits)} commits...") as status:
            for i, commit in enumerate(commits, 1):
                status.update(f"[bold green]Processing commit {i}/{len(commits)}...")
                changes = changelog._process_commit((commit, '.'))
                print_commit(changes)
                
    except Exception as e:
        console.print(f"[red]Error: {str(e)}[/]")

@cli.command()
@click.option('--start', '-s', required=True, help='Start date (YYYY-MM-DD)')
@click.option('--end', '-e', required=True, help='End date (YYYY-MM-DD)')
def range(start: str, end: str):
    """Show changelog for a date range"""
    try:
        start_date = datetime.strptime(start, "%Y-%m-%d")
        end_date = datetime.strptime(end, "%Y-%m-%d")
        
        repo = git.Repo()
        changelog = Itera()
        
        commits = list(repo.iter_commits())
        filtered_commits = [
            commit for commit in commits
            if start_date <= datetime.fromtimestamp(commit.committed_date) <= end_date
        ]
        
        if not filtered_commits:
            console.print("[yellow]No commits found in the specified date range[/]")
            return
            
        with console.status(f"[bold green]Processing {len(filtered_commits)} commits...") as status:
            for i, commit in enumerate(filtered_commits, 1):
                status.update(f"[bold green]Processing commit {i}/{len(filtered_commits)}...")
                changes = changelog._process_commit((commit, '.'))
                print_commit(changes)
                
    except ValueError:
        console.print("[red]Error: Invalid date format. Use YYYY-MM-DD[/]")
    except Exception as e:
        console.print(f"[red]Error: {str(e)}[/]")

@cli.command()
@click.option('--query', '-q', required=True, help='Search query to find relevant commits')
@click.option('--limit', '-l', default=5, help='Number of similar commits to show')
def search(query: str, limit: int):
    """Search through commits using semantic search"""
    try:
        openai_api_key = os.getenv('OPENAI_KEY')
        if not openai_api_key:
            console.print("[red]Error: OPENAI_KEY environment variable not set[/]")
            return

        # Generate commits.json if it doesn't exist
        if not os.path.exists("commits.json"):
            status = console.status("[bold green]Generating commit history...")
            status.start()
            
            try:
                changelog = Itera()
                repo = git.Repo()
                commits = list(repo.iter_commits())[:100]  # Get last 100 commits
                
                processed_commits = []
                for i, commit in enumerate(commits, 1):
                    status.update(f"[bold green]Processing commit {i}/{len(commits)}...")
                    changes = changelog._process_commit((commit, '.'))
                    processed_commits.append(changes)
                
                with open("commits.json", "w") as f:
                    json.dump(processed_commits, f)
            finally:
                status.stop()

        status = console.status("[bold green]Initializing semantic search...")
        status.start()
        try:
            from .graphrag import GraphRAG
            rag = GraphRAG(openai_api_key=openai_api_key)
            rag.load_commits("commits.json")
            
            status.update("[bold green]Searching commits...")
            results = rag.get_formatted_commit_details(query, limit)
        finally:
            status.stop()
            
        if not results:
            console.print("[yellow]No relevant commits found[/]")
            return
            
        console.print(f"\n[bold cyan]Found {len(results)} relevant commits for query: [italic]'{query}'[/][/]\n")
        
        for result in results:
            summary_panel = Panel(
                format_summary(result["summary"]),
                title=f"[bold blue]Commit {result['hash'][:8]}[/] by [yellow]{result['author']}[/]",
                subtitle=f"[italic]{result['date']}[/]",
                border_style="blue",
                padding=(1, 2)
            )
            console.print(summary_panel)
            console.print("\n")
            
    except Exception as e:
        console.print(f"[red]Error: {str(e)}[/]")
 
