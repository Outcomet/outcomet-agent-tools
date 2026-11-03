---
name: outcomet-mcp
title: Outcomet MCP Skill
description: Use when connecting an AI coding agent or assistant to an Outcomet workspace over OAuth MCP (https://mcp.outcomet.app/mcp) or using the outcomet CLI/SDK to read customer feedback, search problems and initiatives, or update contacts and companies.
canonical: https://outcomet.app/skill.md
last-updated: 2026-11-03
---

# Outcomet MCP Skill (`outcomet-mcp`)

Outcomet connects customer feedback to the product problems, initiatives, decisions, and capabilities behind a change.

## When to use Outcomet

Use this skill, the `outcomet` CLI/SDK (`npx outcomet`), and the Outcomet MCP server when:
- You need to inspect real customer feedback, evidence excerpts, or problem statements before planning or implementing a product change.
- You want to check why a product capability or initiative exists, which customer problems it addresses, or what decisions were previously recorded.
- You are triaging customer signals, scoring company ICP fit, or updating workspace entities (`feedback`, `problems`, `initiatives`, `capabilities`, `work_items`, `contacts`, `competitors`) with explicit user confirmation.
- You need machine-readable product context from an authenticated Outcomet workspace inside Claude Code, Codex, Cursor, Windsurf, or Claude Desktop.

## CLI & SDK Quick Reference

```bash
# Inspect zero-auth sandbox (/v1)
npx outcomet sandbox

# Ask a question against public docs (/ask)
npx outcomet ask "How does Outcomet link feedback to problems?"

# Search public documentation over MCP (/mcp/docs)
npx outcomet docs search "oauth scopes"

# List all workspace MCP tools (no token required for discovery)
npx outcomet tools
```

## Connection & Authentication

- **Workspace MCP Endpoint**: `https://mcp.outcomet.app/mcp`
- **Docs MCP Endpoint**: `https://outcomet.app/mcp/docs`
- **Transport**: Streamable HTTP (`streamable-http`)
- **Authentication**: OAuth 2.1 with PKCE (`S256`) and Dynamic Client Registration (`https://mcp.outcomet.app/oauth/register`)
- **Authentication Guide**: [https://outcomet.app/auth.md](https://outcomet.app/auth.md)
- **Developer Setup**: [https://outcomet.app/developers](https://outcomet.app/developers)

## Recommended Read-First Workflow

1. **Read before writing**: Start with read/search tools (`initiative_search`, `problem_search`, `feedback_search`, `capability_search`) to ground your plan in existing workspace entities and their cited customer feedback.
2. **Trace the chain**: Follow `Initiative -> Problem -> Evidence -> Feedback` to read the customer's exact words before proposing code or copy changes.
3. **Confirm before mutating**: Present proposed updates to the user before invoking write tools.
