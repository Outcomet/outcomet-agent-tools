# Outcomet — Agent Instructions (AGENTS.md)

Official CLI (`npx outcomet`), JavaScript/TypeScript SDK (`npm install outcomet`), MCP manifests (`mcp.json`, `plugin.json`), and installable agent skill (`skills/outcomet-mcp/SKILL.md`) for [Outcomet](https://outcomet.app).

## Quick Commands

- `npx outcomet sandbox`: Inspect the zero-auth Outcomet product sandbox (`https://outcomet.app/v1`).
- `npx outcomet ask "How does Outcomet connect feedback to capabilities?"`: Query Outcomet's public knowledge base (`https://outcomet.app/ask`).
- `npx outcomet docs search "oauth scopes"`: Search Outcomet documentation via `https://outcomet.app/mcp/docs`.
- `npx outcomet tools`: List all tools exposed by `https://mcp.outcomet.app/mcp`.
- `OUTCOMET_TOKEN=<token> npx outcomet call feedback_search '{"limit":5}'`: Call an authenticated workspace MCP tool.

## Connecting via MCP

- **Workspace MCP (OAuth 2.1 + PKCE)**: `https://mcp.outcomet.app/mcp` (unauthenticated `initialize`, `tools/list`, and `resources/list` supported; `tools/call` requires an OAuth 2.1 Bearer token per `https://outcomet.app/auth.md`).
- **Documentation MCP (Zero Auth)**: `https://outcomet.app/mcp/docs`
