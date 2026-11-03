---
name: outcomet-feedback
description: "Ingest, search, and triage customer feedback, contacts, companies, and research campaigns in Outcomet using the MCP toolset."
---

# Outcomet Feedback & CRM Skill

Use Outcomet's CRM and feedback tools (`feedback_create`, `feedback_search`, `company_search`, `contact_search`, `campaign_search`) to capture user signals and link them to companies and contacts with full provenance.

## Key Tools

- `feedback_create` / `feedback_update` — Record customer feedback with source attribution (`Idempotency-Key` supported).
- `company_search` / `company_upsert` — Look up or update B2B accounts and ICP fit ratings.
- `campaign_search` / `campaign_interaction_create` — Track user research interviews and outreach touchpoints.
