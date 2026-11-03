# outcomet

Official Python SDK for [Outcomet](https://outcomet.app), the AI-native product management platform. Standard library only (`urllib`), zero runtime dependencies.

## Install

```bash
pip install outcomet
```

## Usage

```python
from outcomet import OutcometClient

client = OutcometClient()
print(client.index())
print(client.ask("How does Outcomet connect feedback to decisions?"))
print(client.list_tools())
```

- Documentation & MCP Setup: https://outcomet.app/developers
- Source Repository: https://github.com/Outcomet/outcomet-agent-tools
