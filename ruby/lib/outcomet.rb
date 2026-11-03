# frozen_string_literal: true

require "json"
require "net/http"
require "uri"

module Outcomet
  VERSION = "0.1.0"
  DEFAULT_BASE_URL = "https://outcomet.app"
  DEFAULT_MCP_URL = "https://mcp.outcomet.app/mcp"

  class Client
    def initialize(base_url: DEFAULT_BASE_URL, mcp_url: DEFAULT_MCP_URL, token: nil)
      @base_url = base_url.chomp("/")
      @mcp_url = mcp_url
      @token = token
    end

    def index
      get_json("/v1")
    end

    def capabilities
      get_json("/v1/capabilities")
    end

    def ask(query)
      get_json("/ask?q=#{URI.encode_www_form_component(query)}&format=json")
    end

    private

    def get_json(path)
      uri = URI("#{@base_url}#{path}")
      req = Net::HTTP::Get.new(uri)
      req["Accept"] = "application/json"
      res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") { |http| http.request(req) }
      JSON.parse(res.body)
    end
  end
end
