# Core System Documentation

## Overview
The core system automates changelog generation by intelligently analyzing your Git history. It transforms technical commit diffs into clear, meaningful summaries that everyone can understand - no special commit formats or manual writing required.

## Key Components

### Smart Commit Analysis
- Extracts meaningful changes from standard git commits
- Understands code changes in context
- Groups related changes automatically
- Detects impact across files

### AI-Powered Summaries
- Converts technical diffs into clear English
- Generates both detailed and quick summaries
- Automatically identifies key changes
- Tags changes by type and impact
- Maintains technical accuracy while being readable

### Changelog Storage
- Efficient JSON-based storage
- Caches generated summaries
- Links related changes
- Easy export to various formats

## Technical Implementation

### Generation Flow
1. Read git commit history
2. Extract and analyze changes
3. Generate human-friendly summaries
4. Categorize and tag changes
5. Store for quick access

### Performance Features
- Parallel commit processing
- Smart caching of summaries
- Efficient diff analysis
- Handles large repositories

### Error Prevention
- Validates commit access
- Handles binary files properly
- Manages encoding issues
- Prevents API failures

## Developer Usage

### Quick Start
```python
from core import list_commits

# Generate changelog for recent commits
commits = list_commits()

# Access formatted summaries
for commit in commits:
    print(f"Change: {commit['summary']['blurb']}")
    print(f"Impact: {', '.join(commit['summary']['tags'])}")
```

### Customization
- Control summary detail level
- Choose output format
- Filter by change type
- Set date ranges

## Best Practices
- Run in CI/CD for automatic updates
- Cache results for performance
- Use semantic queries for searching
- Keep summaries focused and clear 