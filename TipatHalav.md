---
aliases: ["TipatHalav", "tipat-halav"]
client: tipat-halav
created: 2026-05-07
created_by: audit-brain (stub)
---

# TipatHalav — Project Brain

> ⚠️ **STUB** — auto-created 2026-05-07 by audit-brain because brain file was missing.
> Run `/retro-sop --client tipat-halav` to rebuild from current project state.

## Quick Context
See [[tipat-halav/BRIEF]] for full brief.

## Open Tasks
*(populate via /retro-sop)*

## Recent Learnings
*(populate via /retro-sop)*

## Key Decisions
*(populate via /retro-sop scanning ADRs)*

## Backlinks
[[agency-brain]]

## 🆕 Newly Available — 2026-05-17

The agency just shipped **Kivun OS v1.0** ([cohenra/KivunOs](https://github.com/cohenra/KivunOs)) — internal dashboard for the founder. 19 reusable patterns + components were promoted to the shared registry. Available for any future feature in your project:

**Security patterns** (~/.claude/shared/patterns/):
- `audit-log-tamper-evident-v1` — SHA-256 chain-hash + mutex for concurrent appends (CR-2 ready)
- `pii-redactor-hebrew-v1` — Hebrew + Israeli ID + phone + email patterns with ReDoS guards
- `path-traversal-guard-v1` — double prefix check + slug rejection (SR-8, SR-9)
- `safe-spawn-wrapper-v1` — child_process.spawn with args array, never shell:true
- `rate-limiter-toctou-safe-v1` — synchronous checkAndRecord() pattern
- `origin-allowlist-validator-v1` — Origin header validation middleware
- `secret-leak-ignore-list-v1` — chokidar ignored patterns for .env, *.key, etc.
- `sse-path-sanitizer-v1` — convert absolute paths to safe relative refs

**UI components** (~/.claude/shared/components/):
- `pii-redaction-mark-v1` — visual marker for redacted PII (RTL Hebrew, a11y)
- `chain-verify-badge-v1` — audit log integrity status indicator
- `tier-b-consent-modal-v1` — explicit-confirm pattern for destructive actions
- `error-boundary-generic-v1` — SEC-T11 trace-hiding boundary

**Frontend patterns:**
- `sse-consumer-reconnect-v1` — typed SSE with heartbeat + reconnect
- `deep-mode-idle-detect-v1` — Noa-approved cognitive ergonomics hook

**Schemas:**
- `audit-log-schema-v1` — chain-hash JSON Schema
- `skill-registry-schema-v1` — whitelisted skill registry

**Use via:** `/openspec` when adding features → mention "use shared registry" → relevant patterns auto-injected into agent prompts. No code changes needed in your existing project until you add a feature that benefits.

---
