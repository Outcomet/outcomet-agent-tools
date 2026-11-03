---
name: outcomet-discovery
description: "Discover Outcomet's public agent endpoints, OpenAPI 3.1 specification, MCP server cards, A2A agent card, and RFC 9421 Web Bot Auth key directory."
---

# Outcomet Discovery Skill

Query Outcomet's machine-readable discovery endpoints on `https://outcomet.app` without credentials:

- `GET https://outcomet.app/llms.txt` — LLM navigation index
- `GET https://outcomet.app/openapi.json` — OpenAPI 3.1.0 specification
- `GET https://outcomet.app/.well-known/mcp/server-card.json` — MCP server card
- `GET https://outcomet.app/.well-known/agent-card.json` — A2A v0.3.0 agent card
- `GET https://outcomet.app/.well-known/http-message-signatures-directory` — RFC 9421 Web Bot Auth Ed25519 JWKS directory
- `GET https://outcomet.app/v1` — Public keyless API index
