# outcomet

Official CLI and JavaScript/TypeScript SDK for [Outcomet](https://outcomet.app), the AI-native product management platform.

## CLI Usage

```bash
# Zero-auth product sandbox (/v1)
npx outcomet sandbox

# Ask questions against Outcomet's public documentation (/ask)
npx outcomet ask "How does Outcomet connect feedback to capabilities?"

# Search, list, or read documentation over MCP (/mcp/docs)
npx outcomet docs search "oauth scopes"
npx outcomet docs list
npx outcomet docs read /pricing

# List all tools on the Outcomet workspace MCP server
npx outcomet tools

# Call an authenticated workspace MCP tool (requires OAuth 2.1 Bearer token)
OUTCOMET_TOKEN=<token> npx outcomet call feedback_search '{"limit":5}'
```

## SDK Usage

```js
import { sandbox, ask, searchDocs, tools, callTool } from "outcomet";

const demo = await sandbox();
const answer = await ask("What plans does Outcomet offer?");
const docs = await searchDocs("mcp");
const toolCatalog = await tools();
```

## Links

- **Homepage**: [https://outcomet.app](https://outcomet.app)
- **Developer & MCP Docs**: [https://outcomet.app/developers](https://outcomet.app/developers)
- **OAuth 2.1 Agent Auth Spec**: [https://outcomet.app/auth.md](https://outcomet.app/auth.md)
- **Agent Instructions**: [https://outcomet.app/AGENTS.md](https://outcomet.app/AGENTS.md)
