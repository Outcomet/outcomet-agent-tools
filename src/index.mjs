export const BASE_URL = process.env.OUTCOMET_BASE_URL ?? "https://outcomet.app";
export const MCP_URL = process.env.OUTCOMET_MCP_URL ?? "https://mcp.outcomet.app/mcp";
export const DOCS_MCP_URL = `${BASE_URL}/mcp/docs`;

const USER_AGENT = "outcomet-cli/0.1.0";

export class OutcometError extends Error {
  constructor(message, { status, code, url } = {}) {
    super(message);
    this.name = "OutcometError";
    this.status = status;
    this.code = code;
    this.url = url;
  }
}

async function parseResponsePayload(response, url) {
  const text = await response.text();
  const dataLine = text
    .split("\n")
    .find((line) => line.startsWith("data: "));
  const rawJson = dataLine ? dataLine.slice("data: ".length).trim() : text.trim();
  try {
    return rawJson ? JSON.parse(rawJson) : {};
  } catch {
    throw new OutcometError(
      `${url} answered ${response.status} with non-JSON payload`,
      { status: response.status, url }
    );
  }
}

async function request(
  url,
  { method = "GET", body, token, fetch: fetchImpl = globalThis.fetch } = {}
) {
  const response = await fetchImpl(url, {
    method,
    headers: {
      Accept: "application/json, text/event-stream",
      "User-Agent": USER_AGENT,
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });

  const parsed = await parseResponsePayload(response, url);
  if (!response.ok) {
    throw new OutcometError(
      parsed?.error?.message ?? parsed?.error_description ?? parsed?.error ?? `${url} answered ${response.status}`,
      { status: response.status, code: parsed?.error?.code ?? parsed?.error, url }
    );
  }
  return parsed;
}

async function rpc(url, method, params, { token, fetch: fetchImpl } = {}) {
  const body = { jsonrpc: "2.0", id: 1, method, ...(params ? { params } : {}) };
  const answer = await request(url, { method: "POST", body, token, fetch: fetchImpl });
  if (answer.error) {
    throw new OutcometError(answer.error.message ?? "MCP RPC error", {
      code: String(answer.error.code ?? "rpc_error"),
      url
    });
  }
  return answer.result;
}

export function sandbox({ baseUrl = BASE_URL, fetch } = {}) {
  return request(`${baseUrl}/v1`, { fetch });
}

export function ask(query, { limit = 5, baseUrl = BASE_URL, fetch } = {}) {
  const params = new URLSearchParams({ q: query, limit: String(limit) });
  return request(`${baseUrl}/ask?${params}`, { fetch });
}

export function searchDocs(query, { limit = 5, baseUrl = BASE_URL, fetch } = {}) {
  return rpc(
    `${baseUrl}/mcp/docs`,
    "tools/call",
    { name: "search_docs", arguments: { query, limit } },
    { fetch }
  );
}

export function listDocs({ section = "All", baseUrl = BASE_URL, fetch } = {}) {
  return rpc(
    `${baseUrl}/mcp/docs`,
    "tools/call",
    { name: "list_docs", arguments: { section } },
    { fetch }
  );
}

export function readDoc(path, { baseUrl = BASE_URL, fetch } = {}) {
  return rpc(
    `${baseUrl}/mcp/docs`,
    "tools/call",
    { name: "read_doc", arguments: { path } },
    { fetch }
  );
}

export function tools({ mcpUrl = MCP_URL, token = process.env.OUTCOMET_TOKEN, fetch } = {}) {
  return rpc(mcpUrl, "tools/list", {}, { token, fetch });
}

export function callTool(
  name,
  args = {},
  { mcpUrl = MCP_URL, token = process.env.OUTCOMET_TOKEN, fetch } = {}
) {
  if (!token) {
    throw new OutcometError(
      `Calling ${name} requires an OAuth 2.1 access token. Set OUTCOMET_TOKEN or follow https://outcomet.app/auth.md.`,
      { code: "no_token", url: mcpUrl }
    );
  }
  return rpc(mcpUrl, "tools/call", { name, arguments: args }, { token, fetch });
}
