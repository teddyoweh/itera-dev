# Itera

> AI-powered changelog generation that just works.

Itera turns your git commits into clear, meaningful changelogs - automatically. No special commit formats needed, no manual writing, just intelligent summaries that actually make sense.

## Quick Start

```bash
# Install
pip install itera

# Initialize in your repo
itera init

# Generate changelog
itera generate

# Or use the interactive UI
itera serve
```

## Features

- 🤖 **AI-Powered**: Intelligent summaries that understand your code changes
- 🚀 **Zero Config**: Works with your existing git workflow
- 💬 **Natural Language**: Ask questions about changes in plain English
- 🔍 **Smart Search**: Find changes by topic, not just by date
- 🎨 **Beautiful UI**: Interactive timeline and modern web interface

## Documentation

- [Core System](docs/core.md) - How Itera works under the hood
- [API Reference](docs/api.md) - REST API endpoints and usage
- [Web Interface](docs/web.md) - UI components and features
- [Library Usage](docs/library.md) - Python package integration
- [Overview](docs/overall_gist.md) - Complete feature overview

## Example

From this commit:
```git
commit abc123
Files changed: auth.py, users.py
+150/-50 lines
```

To this changelog:
```markdown
## Authentication System Upgrade
Added JWT-based authentication with automatic token refresh.
- Implemented secure token encryption
- Added cross-domain support
- Improved session management
Impact: Security, API, User Experience
```

# 