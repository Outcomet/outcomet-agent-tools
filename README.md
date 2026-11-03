# Outcomet Agent Tools (CLI, Multi-Language SDKs, Skills & MCP Manifest)

Official CLI, TypeScript/JavaScript, Python, Go, and Ruby SDKs, agent skills (`skills/`), `AGENTS.md`, and Agent Plugins manifest (`plugin.json`) for [Outcomet](https://outcomet.app), the AI-native product management platform.

## Install

```bash
# Node.js / TypeScript CLI & SDK
npx outcomet capabilities --json
npm install outcomet

# Python SDK (stdlib only)
pip install outcomet

# Go SDK (stdlib only)
go get github.com/Outcomet/outcomet-agent-tools/go

# Ruby SDK (stdlib only)
gem install outcomet

# Install Agent Skills via skills.sh
npx skills add Outcomet/outcomet-agent-tools
```

## CLI Usage

```bash
npx outcomet index --json
npx outcomet capabilities --json
npx outcomet ask "How does Outcomet connect customer feedback to capabilities?" --json
npx outcomet tools --json
```

## MCP Servers

- **Primary Product MCP Server**: `https://mcp.outcomet.app/mcp` (Streamable HTTP, 84 tools; unauthenticated `initialize` and `tools/list` discovery, OAuth 2.1 + PKCE for `tools/call`)
- **Public Documentation MCP Server**: `https://outcomet.app/mcp/docs` (Streamable HTTP, 3 read-only tools, no auth required)
