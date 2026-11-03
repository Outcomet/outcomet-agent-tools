---
name: outcomet-cli
description: "Use the Outcomet CLI (`npx outcomet`) and TypeScript/Python/Go/Ruby SDKs to query the public API, ask natural-language product questions, and inspect MCP tools from the terminal."
---

# Outcomet CLI & SDK Skill

Use `npx outcomet` (or `npm install outcomet`, `pip install outcomet`, `gem install outcomet`, `go get github.com/Outcomet/outcomet-agent-tools/go`) to interact with Outcomet without hand-rolling HTTP requests.

## Commands

```bash
# List public capabilities and endpoints (no auth required)
npx outcomet capabilities --json

# Ask a natural-language question against Outcomet documentation
npx outcomet ask "How does Outcomet link evidence chunks to problems and initiatives?" --json

# List all 84 tools on the Outcomet MCP server (no auth required)
npx outcomet tools --json
```
