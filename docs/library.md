# Itera Library Documentation

## Overview
The Itera library provides a powerful, developer-friendly way to analyze and understand Git commit history. It combines semantic search, AI-powered analysis, and graph-based commit relationships.

## Core Classes

### Itera Class
```python
from itera_lib import Itera

# Initialize with custom settings
itera = Itera(
    repo_path='.',
    storage_dir='~/.itera',
    openai_api_key='your-key'
)

# Generate changelog
changelog = itera.generate_changelog(num_commits=30)
```

### GraphRAG
```python
from itera_lib.graphrag import GraphRAG

# Initialize with embeddings
rag = GraphRAG(openai_api_key='your-key')

# Query similar commits
results = rag.query_similar_commits("add authentication feature")
```

## CLI Interface

### Commands
```bash
# Show recent changes
itera show --hash abc123

# List all commits
itera all --limit 10

# Search commits
itera search --query "add login page"

# Date range search
itera range --start 2024-01-01 --end 2024-03-01
```

## Features

### Semantic Search
- FAISS-powered similarity search
- Text embeddings via OpenAI
- Context-aware results
- Efficient indexing

### Graph Analysis
- Commit relationship tracking
- Timeline visualization
- Impact analysis
- Change type tracking

### Rich Summaries
- AI-generated descriptions
- Change categorization
- File impact analysis
- Author attribution

## Technical Details

### Storage System
- Local caching
- JSON serialization
- Embedding persistence
- Graph state management

### Performance
- Parallel processing
- Efficient indexing
- Smart caching
- Incremental updates

## Best Practices
- Initialize once, reuse instance
- Cache results when possible
- Handle large repos carefully
- Validate API keys early 