import json
import faiss
import numpy as np
from datetime import datetime
from typing import List, Dict, Optional, Tuple, Any
from openai import OpenAI
from pathlib import Path
import networkx as nx
from dataclasses import dataclass
import matplotlib.pyplot as plt
from matplotlib.figure import Figure

@dataclass
class CommitNode:
    commit_hash: str
    author: str
    date: str
    message: str
    summary: Dict[str, Any]
    embedding: Optional[np.ndarray] = None

class GraphRAG:
    def __init__(self, openai_api_key: str, dimension: int = 3072):
        self.openai_api_key = openai_api_key
        self.dimension = dimension
        self.index = faiss.IndexFlatL2(dimension)
        self.graph = nx.DiGraph()
        self.commit_nodes: Dict[str, CommitNode] = {}
        self.commit_embeddings: Dict[str, np.ndarray] = {}
        
    def _get_embedding(self, text: str) -> np.ndarray:
        client = OpenAI(api_key=self.openai_api_key)  # Create new client for each request
        response = client.embeddings.create(
            input=text,
            model="text-embedding-3-large"
        )
        return np.array(response.data[0].embedding, dtype=np.float32)
    
    def save_index(self, directory: str = "./store"):
        Path(directory).mkdir(parents=True, exist_ok=True)
        
        index_path = Path(directory) / "faiss_index.bin"
        commits_path = Path(directory) / "commits_data.json"
        embeddings_path = Path(directory) / "embeddings.npy"
        
        faiss.write_index(self.index, str(index_path))
        
        commit_data = {
            hash_: {
                "commit_hash": node.commit_hash,
                "author": node.author,
                "date": node.date,
                "message": node.message,
                "summary": node.summary
            } for hash_, node in self.commit_nodes.items()
        }
        
        with open(commits_path, "w") as f:
            json.dump(commit_data, f)
        
        embeddings_dict = {hash_: emb.tolist() for hash_, emb in self.commit_embeddings.items()}
        np.save(str(embeddings_path), embeddings_dict)

    def load_index(self, directory: str = "./store") -> bool:
        index_path = Path(directory) / "faiss_index.bin"
        commits_path = Path(directory) / "commits_data.json"
        embeddings_path = Path(directory) / "embeddings.npy"
        
        if not all(p.exists() for p in [index_path, commits_path, embeddings_path]):
            return False
        
        self.index = faiss.read_index(str(index_path))
        
        with open(commits_path, "r") as f:
            commit_data = json.load(f)
        
        embeddings_dict = np.load(str(embeddings_path), allow_pickle=True).item()
        
        self.commit_nodes = {}
        self.commit_embeddings = {}
        self.graph = nx.DiGraph()
        
        for hash_, data in commit_data.items():
            node = CommitNode(
                commit_hash=data["commit_hash"],
                author=data["author"],
                date=data["date"],
                message=data["message"],
                summary=data["summary"],
                embedding=np.array(embeddings_dict[hash_], dtype=np.float32)
            )
            
            self.commit_nodes[hash_] = node
            self.commit_embeddings[hash_] = np.array(embeddings_dict[hash_], dtype=np.float32)
            
            if len(self.graph.nodes()) > 0:
                prev_commit = list(self.graph.nodes())[-1]
                self.graph.add_edge(prev_commit, hash_)
            self.graph.add_node(hash_)
        
        return True

    def load_commits(self, commit_file_path: str):
        if self.load_index():
            return
        
        with open(commit_file_path, 'r') as f:
            commits = json.load(f)
            
        for commit in commits:
            commit_text = f"{commit['message']} {commit['summary']['summary']}"
            embedding = self._get_embedding(commit_text)
            
            node = CommitNode(
                commit_hash=commit['commit_hash'],
                author=commit['author'],
                date=commit['date'],
                message=commit['message'],
                summary=commit['summary'],
                embedding=embedding
            )
            
            self.commit_nodes[commit['commit_hash']] = node
            self.commit_embeddings[commit['commit_hash']] = embedding
            self.index.add(embedding.reshape(1, -1))
            
            if len(self.graph.nodes()) > 0:
                prev_commit = list(self.graph.nodes())[-1]
                self.graph.add_edge(prev_commit, commit['commit_hash'])
            self.graph.add_node(commit['commit_hash'])
        
        self.save_index()
    
    def query_similar_commits(self, query: str, k: int = 5) -> List[Tuple[str, float]]:
        query_embedding = self._get_embedding(query)
        D, I = self.index.search(query_embedding.reshape(1, -1), k)
        
        results = []
        commit_hashes = list(self.commit_nodes.keys())
        for idx, distance in zip(I[0], D[0]):
            if idx < len(commit_hashes):
                results.append((commit_hashes[idx], float(distance)))
        return results
    
    def get_commit_timeline(self, commit_hash: str, depth: int = 3) -> nx.DiGraph:
        if commit_hash not in self.graph:
            return nx.DiGraph()
            
        subgraph_nodes = {commit_hash}
        current_depth = 0
        current_nodes = {commit_hash}
        
        while current_depth < depth:
            next_nodes = set()
            for node in current_nodes:
                predecessors = list(self.graph.predecessors(node))
                successors = list(self.graph.successors(node))
                next_nodes.update(predecessors + successors)
            subgraph_nodes.update(next_nodes)
            current_nodes = next_nodes
            current_depth += 1
            
        return self.graph.subgraph(subgraph_nodes)
    
    def visualize_commit_graph(self, subgraph: Optional[nx.DiGraph] = None) -> Figure:
        if subgraph is None:
            subgraph = self.graph
            
        plt.figure(figsize=(15, 10))
        pos = nx.spring_layout(subgraph)
        
        nx.draw(subgraph, pos,
                node_color='lightblue',
                node_size=1500,
                arrowsize=20,
                with_labels=True,
                labels={node: f"{node[:8]}\\n{self.commit_nodes[node].date.split()[0]}"
                       for node in subgraph.nodes()})
        
        plt.title("Commit History Graph")
        return plt.gcf()
    
    def get_commit_details(self, commit_hash: str) -> Optional[Dict[str, Any]]:
        if commit_hash not in self.commit_nodes:
            return None
            
        node = self.commit_nodes[commit_hash]
        return {
            "hash": node.commit_hash,
            "author": node.author,
            "date": node.date,
            "message": node.message,
            "summary": node.summary
        }
    
    def find_changes_between_dates(self, start_date: str, end_date: str) -> List[CommitNode]:
        start_dt = datetime.strptime(start_date, "%Y-%m-%d")
        end_dt = datetime.strptime(end_date, "%Y-%m-%d")
        
        relevant_commits = []
        for node in self.commit_nodes.values():
            commit_dt = datetime.strptime(node.date.split()[0], "%Y-%m-%d")
            if start_dt <= commit_dt <= end_dt:
                relevant_commits.append(node)
                
        return sorted(relevant_commits, key=lambda x: x.date)
    
    def analyze_changes_by_type(self, commit_hash: str) -> Dict[str, int]:
        if commit_hash not in self.commit_nodes:
            return {}
            
        node = self.commit_nodes[commit_hash]
        changes = node.summary.get("changes_type", [])
        return {change_type: changes.count(change_type) for change_type in set(changes)}

    def get_formatted_commit_details(self, query: str, k: int = 4) -> List[Dict[str, Any]]:
        similar_commits = self.query_similar_commits(query, k)
        formatted_results = []
        
        for commit_hash, similarity_score in similar_commits:
            commit = self.get_commit_details(commit_hash)
            if commit:
                formatted_results.append(commit)
            
        return formatted_results 