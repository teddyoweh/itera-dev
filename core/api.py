import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from graphrag import GraphRAG
from env import OPENAI_KEY
from openai import OpenAI
from datetime import datetime
app = FastAPI(title="Itera API", description="API for querying commit history using GraphRAG")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

 
rag = GraphRAG(openai_api_key=OPENAI_KEY)
rag.load_commits("./commit_store.json")

class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    hash: str
    type: str
    content: str
    timestamp: str
    tags: list
    changeDetails: dict

@app.post("/api/query", response_model=QueryResponse)
async def query_commits(request: QueryRequest):
    try:
        client = OpenAI(api_key=OPENAI_KEY) 
        formatted_commits = rag.get_formatted_commit_details(request.query,1)
        print('Formatte commits',formatted_commits)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that can answer questions a user qusesstion in context of the commit history of a project,I want you to be inherently smart, like really really smart and coherent and very clear. Insanely clear and go straight to the point, still a bit casual too, be very concise and to the point, all output should never be in markdown format. "},
                {"role": "user", "content": request.query},
                {"role": "user", "content": f"Here are the commits: {formatted_commits}"}
            ]
        )
        with open("response.json", "w") as f:
            json.dump(formatted_commits, f)
        ans=response.choices[0].message.content
        print(response.choices[0].message.content)
        return QueryResponse(hash=formatted_commits[0]["hash"], type="ai", content=ans, timestamp=datetime.now().isoformat(),tags=formatted_commits[0]["tags"], changeDetails=formatted_commits[0]["changeDetails"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}
