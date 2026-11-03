#!/usr/bin/env node
import {
  ask,
  callTool,
  listDocs,
  readDoc,
  sandbox,
  searchDocs,
  tools
} from "../src/index.mjs";

const HELP = `Usage: outcomet <command> [arguments]

Commands:
  sandbox                      Fetch the zero-auth Outcomet product sandbox (/v1)
  ask <query>                  Ask a question against Outcomet's public knowledge base (/ask)
  docs search <query>          Search Outcomet documentation over MCP (/mcp/docs)
  docs list [section]          List Outcomet documentation pages over MCP (/mcp/docs)
  docs read <path>             Read a Markdown documentation page over MCP (/mcp/docs)
  tools                        List tools exposed by the Outcomet MCP server
  call <tool> [json-args]      Call an authenticated Outcomet MCP tool (requires OUTCOMET_TOKEN)
`;

export async function run(argv = process.argv.slice(2), io = { log: console.log, error: console.error }) {
  const [cmd, sub, ...rest] = argv;
  if (!cmd || cmd === "--help" || cmd === "-h" || cmd === "help") {
    io.log(HELP.trim());
    return 0;
  }
  if (cmd === "--version" || cmd === "-v" || cmd === "version") {
    io.log("0.1.0");
    return 0;
  }

  try {
    if (cmd === "sandbox" || cmd === "status") {
      io.log(JSON.stringify(await sandbox(), null, 2));
      return 0;
    }
    if (cmd === "ask") {
      const query = [sub, ...rest].filter(Boolean).join(" ");
      io.log(JSON.stringify(await ask(query), null, 2));
      return 0;
    }
    if (cmd === "docs") {
      if (sub === "search") {
        io.log(JSON.stringify(await searchDocs(rest.join(" ")), null, 2));
        return 0;
      }
      if (sub === "read") {
        io.log(JSON.stringify(await readDoc(rest[0] ?? "/"), null, 2));
        return 0;
      }
      io.log(JSON.stringify(await listDocs({ section: sub ?? "All" }), null, 2));
      return 0;
    }
    if (cmd === "tools") {
      io.log(JSON.stringify(await tools(), null, 2));
      return 0;
    }
    if (cmd === "call") {
      if (!sub) {
        io.error("Missing tool name. Usage: outcomet call <tool> [json-args]");
        return 1;
      }
      const args = rest[0] ? JSON.parse(rest[0]) : {};
      io.log(JSON.stringify(await callTool(sub, args), null, 2));
      return 0;
    }

    io.error(`Unknown command: ${cmd}\n\n${HELP.trim()}`);
    return 1;
  } catch (err) {
    io.error(err instanceof Error ? err.message : String(err));
    return 1;
  }
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  process.exitCode = await run();
}
