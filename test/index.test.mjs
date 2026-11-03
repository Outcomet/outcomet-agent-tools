import assert from "node:assert/strict";
import test from "node:test";
import { ask, callTool, OutcometError, sandbox, searchDocs, tools } from "../src/index.mjs";
import { run } from "../bin/outcomet.mjs";

test("sandbox and ask use injected fetch and parse JSON", async () => {
  const calls = [];
  const fakeFetch = async (url) => {
    calls.push(String(url));
    return new Response(JSON.stringify({ ok: true, url: String(url) }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  };

  const sb = await sandbox({ baseUrl: "https://outcomet.app", fetch: fakeFetch });
  assert.equal(sb.ok, true);
  const ans = await ask("pricing", { limit: 3, baseUrl: "https://outcomet.app", fetch: fakeFetch });
  assert.equal(ans.ok, true);
  assert.deepEqual(calls, [
    "https://outcomet.app/v1",
    "https://outcomet.app/ask?q=pricing&limit=3"
  ]);
});

test("tools parses SSE data lines and callTool requires a token", async () => {
  const fakeFetch = async () =>
    new Response(
      'event: message\ndata: {"jsonrpc":"2.0","id":1,"result":{"tools":[{"name":"server_status_get"}]}}\n\n',
      { status: 200, headers: { "content-type": "text/event-stream" } }
    );

  const listed = await tools({ fetch: fakeFetch });
  assert.equal(listed.tools[0].name, "server_status_get");

  assert.throws(
    () => callTool("feedback_search", {}, { token: "" }),
    (err) => err instanceof OutcometError && err.code === "no_token"
  );
});

test("searchDocs sends MCP JSON-RPC tools/call", async () => {
  let postedBody;
  const fakeFetch = async (_url, init) => {
    postedBody = JSON.parse(init.body);
    return new Response(
      JSON.stringify({ jsonrpc: "2.0", id: 1, result: { content: [{ type: "text", text: "ok" }] } }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const res = await searchDocs("oauth", { limit: 2, fetch: fakeFetch });
  assert.equal(res.content[0].text, "ok");
  assert.equal(postedBody.method, "tools/call");
  assert.equal(postedBody.params.name, "search_docs");
});

test("CLI --help and --version return 0", async () => {
  const logs = [];
  const codeHelp = await run(["--help"], { log: (m) => logs.push(m), error: () => {} });
  const codeVer = await run(["--version"], { log: (m) => logs.push(m), error: () => {} });
  assert.equal(codeHelp, 0);
  assert.equal(codeVer, 0);
  assert.match(logs[0], /Usage: outcomet/);
  assert.equal(logs[1], "0.1.0");
});
