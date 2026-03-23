from collections import defaultdict, deque
from typing import Any

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.options("/pipelines/parse")
def parse_pipeline_options():
    return Response(status_code=204)

def is_dag(nodes: list[dict[str, Any]], edges: list[dict[str, Any]]) -> bool:
    node_ids = {node.get("id") for node in nodes if node.get("id")}
    graph = defaultdict(list)
    indegree = {node_id: 0 for node_id in node_ids}

    for edge in edges:
      source = edge.get("source")
      target = edge.get("target")
      if source not in node_ids or target not in node_ids:
          continue
      graph[source].append(target)
      indegree[target] += 1

    queue = deque([node_id for node_id in node_ids if indegree[node_id] == 0])
    visited = 0

    while queue:
        current = queue.popleft()
        visited += 1
        for neighbor in graph[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)


@app.post('/pipelines/parse')
def parse_pipeline(payload: dict[str, Any]):
    nodes = payload.get("nodes", [])
    edges = payload.get("edges", [])
    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag(nodes, edges),
    }
