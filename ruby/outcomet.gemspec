# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name = "outcomet"
  spec.version = "0.1.0"
  spec.authors = ["Outcomet GmbH"]
  spec.email = ["info@outcomet.com"]

  spec.summary = "Official Ruby SDK and CLI for Outcomet"
  spec.description = "Query the Outcomet public API, ask product questions, search docs, and list or call Outcomet MCP tools. Standard library only."
  spec.license = "MIT"
  spec.required_ruby_version = ">= 2.7.0"

  spec.homepage = "https://outcomet.app/developers"
  spec.metadata = {
    "homepage_uri" => "https://outcomet.app/developers",
    "documentation_uri" => "https://outcomet.app/developers",
    "source_code_uri" => "https://github.com/Outcomet/outcomet-agent-tools",
    "bug_tracker_uri" => "https://github.com/Outcomet/outcomet-agent-tools/issues"
  }

  spec.files = Dir["lib/**/*.rb"]
  spec.require_paths = ["lib"]
end
