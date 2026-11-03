export declare const BASE_URL: string;
export declare const MCP_URL: string;
export declare const DOCS_MCP_URL: string;

export declare class OutcometError extends Error {
  status?: number;
  code?: string;
  url?: string;
  constructor(
    message: string,
    options?: { status?: number; code?: string; url?: string }
  );
}

export interface RequestOptions {
  baseUrl?: string;
  mcpUrl?: string;
  token?: string;
  fetch?: typeof globalThis.fetch;
}

export declare function sandbox(options?: RequestOptions): Promise<Record<string, unknown>>;
export declare function ask(
  query: string,
  options?: RequestOptions & { limit?: number }
): Promise<Record<string, unknown>>;
export declare function searchDocs(
  query: string,
  options?: RequestOptions & { limit?: number }
): Promise<Record<string, unknown>>;
export declare function listDocs(
  options?: RequestOptions & { section?: string }
): Promise<Record<string, unknown>>;
export declare function readDoc(
  path: string,
  options?: RequestOptions
): Promise<Record<string, unknown>>;
export declare function tools(options?: RequestOptions): Promise<{ tools: Array<Record<string, unknown>> }>;
export declare function callTool(
  name: string,
  args?: Record<string, unknown>,
  options?: RequestOptions
): Promise<Record<string, unknown>>;
