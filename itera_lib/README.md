# Itera

A beautiful git changelog generator with semantic search capabilities. Itera helps you generate detailed, well-formatted changelogs from your git repository and provides powerful semantic search functionality to find relevant commits.

## Features

- 🎨 Beautiful, rich-formatted changelogs
- 🔍 Semantic search through commits using OpenAI embeddings
- 📊 Detailed commit summaries with tags and change types
- 📅 Date range filtering for changelogs
- 🔎 Specific commit lookup
- 📈 Commit history visualization
- 🤖 AI-powered commit analysis

## Installation

```bash
pip install itera
```

## Usage

### Basic Usage

```python
from itera import Itera

# Initialize with default settings (uses OPENAI_KEY from environment)
changelog = Itera()

# Or initialize with explicit API key
changelog = Itera(openai_api_key="your-api-key")

# Generate changelog for last 30 commits
changes = changelog.generate_changelog(num_commits=30)

# Get latest changes
latest = changelog.get_latest_changes(num_commits=1)
```

### CLI Commands and Options

Itera provides several CLI commands for different use cases:

#### Show All Commits
```bash
itera all [OPTIONS]

Options:
  -l, --limit INTEGER  Number of commits to show (default: 10)
```

Example:
```bash
# Show last 20 commits
itera all --limit 20

# Show last 10 commits (default)
itera all
```

#### Show Specific Commit
```bash
itera show [OPTIONS]

Options:
  -h, --hash TEXT  Specific commit hash to show changelog for (required)
```

Example:
```bash
# Show changelog for specific commit
itera show --hash abc123

# Using short option
itera show -h abc123
```

#### Show Commits in Date Range
```bash
itera range [OPTIONS]

Options:
  -s, --start TEXT  Start date (YYYY-MM-DD) [required]
  -e, --end TEXT    End date (YYYY-MM-DD) [required]
```

Example:
```bash
# Show commits between dates
itera range --start 2024-01-01 --end 2024-03-01

# Using short options
itera range -s 2024-01-01 -e 2024-03-01
```

#### Search Commits
```bash
itera search [OPTIONS]

Options:
  -q, --query TEXT    Search query to find relevant commits [required]
  -l, --limit INTEGER Number of similar commits to show (default: 5)
```

Example:
```bash
# Search for commits about authentication changes
itera search --query "authentication system changes"

# Search with custom limit
itera search -q "UI improvements" -l 10
```

### Python API Parameters

#### Itera Class
```python
Itera(
    repo_path: str = '.',              # Path to git repository
    storage_dir: Optional[str] = None, # Custom storage directory for changelogs
    openai_api_key: Optional[str] = None # OpenAI API key
)
```

#### Methods

```python
# Generate changelog
generate_changelog(
    num_commits: int = 30,  # Number of commits to process
    use_cache: bool = True  # Whether to use cached results
) -> List[Dict[str, Any]]

# Get latest changes
get_latest_changes(
    num_commits: int = 1  # Number of most recent commits to process
) -> List[Dict[str, Any]]
```

### Output Format

Each commit in the changelog contains:

```python
{
    'commit_hash': str,        # First 8 characters of commit hash
    'author': str,            # Commit author
    'date': str,             # ISO format date (YYYY-MM-DD HH:MM:SS)
    'human_readable_date': str, # Friendly date format
    'message': str,          # Commit message
    'summary': {
        'summary': str,      # Detailed bullet-point summary
        'blurb': str,       # Brief overview
        'tags': List[str],  # Changed elements/files
        'changes_type': List[str]  # Types of changes (added/modified/deleted)
    }
}
```

## Environment Variables

- `OPENAI_KEY`: Your OpenAI API key (optional, can be passed directly to the Itera class)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/) 