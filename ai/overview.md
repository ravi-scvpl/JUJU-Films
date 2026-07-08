# JUJU Films AI Discovery & Agent Overview

This directory contains machine-readable configuration files and structured markdown documentation designed to help AI agents, crawlers, and LLMs understand and interact with JUJU Films.

JUJU Films is a creator collective specializing in:
1. **Vertical Micro-Drama Production (VMD)** (9:16 mobile-first episodic content)
2. **OTT Original Series & Feature Films**
3. **Organic Branded Content**
4. **JUJU AI Lab** (integration of generative AI in story development and pre-production)

---

## Directory Index

- [skills.json](/ai/skills.json): Standardized JSON of target skills and services that our business performs.
- [capabilities.json](/ai/capabilities.json): Technical taxonomy mapping tools used, industries served, success metrics, and process workflows.
- [knowledge.md](/ai/knowledge.md): Knowledge base summarizing company philosophy, FAQs, and the JUJU VMD Framework™ specifications.

---

## Developer and API Resources

- **OpenAPI Catalog**: [openapi.yaml](/openapi.yaml) provides paths and schemas for content consumption.
- **REST APIs**: Exposes `/api/services`, `/api/blogs`, and `/api/case-studies` for dynamic search/indexing.
- **MCP Server**: Stdio JSON-RPC agent tool `mcp-server.js` located at the root of the workspace.
