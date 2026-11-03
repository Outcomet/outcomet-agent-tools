"""Official Python SDK for the Outcomet public API and MCP surfaces (stdlib only)."""

import json
import urllib.parse
import urllib.request

DEFAULT_BASE_URL = "https://outcomet.app"
DEFAULT_MCP_URL = "https://mcp.outcomet.app/mcp"
__version__ = "0.1.0"


class OutcometClient:
    def __init__(self, base_url: str = DEFAULT_BASE_URL, mcp_url: str = DEFAULT_MCP_URL, token: str | None = None):
        self.base_url = base_url.rstrip("/")
        self.mcp_url = mcp_url
        self.token = token

    def index(self) -> dict:
        return self._get("/v1")

    def capabilities(self) -> dict:
        return self._get("/v1/capabilities")

    def ask(self, query: str) -> dict:
        q = urllib.parse.quote(query)
        return self._get(f"/ask?q={q}&format=json")

    def list_tools(self) -> dict:
        payload = json.dumps({"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}).encode("utf-8")
        headers = {"Content-Type": "application/json", "Accept": "application/json, text/event-stream"}
        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"
        req = urllib.request.Request(self.mcp_url, data=payload, headers=headers, method="POST")
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read().decode("utf-8"))

    def _get(self, path: str) -> dict:
        req = urllib.request.Request(f"{self.base_url}{path}", headers={"Accept": "application/json"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read().decode("utf-8"))
