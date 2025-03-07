# API Documentation

## Overview
Itera's API layer provides a clean, RESTful interface for interacting with the commit analysis system. Built with FastAPI, it offers high performance, automatic validation, and easy integration.

## Endpoints

### Query Commits
```http
POST /api/query
Content-Type: application/json

{
    "query": "string"
}
```

#### Response Format
```json
{
    "hash": "string",
    "type": "string",
    "content": "string",
    "timestamp": "string",
    "tags": ["string"],
    "changeDetails": {
        "files": [
            {
                "type": "string",
                "path": "string",
                "changes": "string"
            }
        ],
        "impact": [
            {
                "label": "string"
            }
        ],
        "timeline": {
            "committed": "string",
            "author": "string"
        }
    }
}
```

### Health Check
```http
GET /api/health
```

## Technical Details

### GraphRAG Integration
- Seamless connection with GraphRAG for semantic search
- Efficient query processing
- Smart result formatting

### AI Processing
- GPT-4 powered response generation
- Context-aware answers
- Natural language understanding

### Performance Features
- CORS support for web integration
- Automatic request validation
- Error handling and status codes

## Usage Examples

### Query Similar Commits
```python
import requests

response = requests.post(
    "http://localhost:8000/api/query",
    json={"query": "when did we add authentication?"}
)
commits = response.json()
```

### Error Handling
- 400: Bad Request (invalid query format)
- 500: Internal Server Error (processing issues)
- 200: Successful response

## Best Practices
- Use appropriate error handling
- Keep queries focused and specific
- Monitor API performance
- Cache frequent queries 