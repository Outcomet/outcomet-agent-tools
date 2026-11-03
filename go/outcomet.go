// Package outcomet is the official Go client for the Outcomet public API and MCP surfaces.
//
// Standard library only: zero external dependencies.
package outcomet

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"
)

const (
	DefaultBaseURL = "https://outcomet.app"
	DefaultMCPURL  = "https://mcp.outcomet.app/mcp"
	Version        = "0.1.0"
)

type Client struct {
	BaseURL    string
	MCPURL     string
	Token      string
	HTTPClient *http.Client
}

func NewClient() *Client {
	return &Client{
		BaseURL:    DefaultBaseURL,
		MCPURL:     DefaultMCPURL,
		HTTPClient: &http.Client{Timeout: 15 * time.Second},
	}
}

func (c *Client) Index(ctx context.Context) (map[string]any, error) {
	return c.getJSON(ctx, c.BaseURL+"/v1")
}

func (c *Client) Capabilities(ctx context.Context) (map[string]any, error) {
	return c.getJSON(ctx, c.BaseURL+"/v1/capabilities")
}

func (c *Client) Ask(ctx context.Context, query string) (map[string]any, error) {
	u := c.BaseURL + "/ask?q=" + url.QueryEscape(query) + "&format=json"
	return c.getJSON(ctx, u)
}

func (c *Client) ListTools(ctx context.Context) (map[string]any, error) {
	payload := map[string]any{
		"jsonrpc": "2.0",
		"id":      1,
		"method":  "tools/list",
		"params":  map[string]any{},
	}
	b, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, c.MCPURL, bytes.NewReader(b))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json, text/event-stream")
	if c.Token != "" {
		req.Header.Set("Authorization", "Bearer "+c.Token)
	}
	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode >= 400 {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("outcomet mcp %d: %s", resp.StatusCode, string(body))
	}
	var out map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&out); err != nil {
		return nil, err
	}
	return out, nil
}

func (c *Client) getJSON(ctx context.Context, target string) (map[string]any, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, target, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Accept", "application/json")
	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode >= 400 {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("outcomet api %d: %s", resp.StatusCode, string(body))
	}
	var out map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&out); err != nil {
		return nil, err
	}
	return out, nil
}
