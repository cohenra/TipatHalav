---
client: TipatHalav
slug: tipat-halav
created: 2026-04-24
owner: Ran (cohenra)
repo: https://github.com/cohenra/TipatHalav
deploy: GitHub Pages → https://cohenra.github.io/TipatHalav/
stack: Vite 5 + React 18 + TailwindCSS 3 + lucide-react
language: Hebrew (RTL native)
status: live
links:
  - "[[agency-brain]]"
  - "[[agents/dana]]"
---

# TipatHalav — מחשבון גיל לטיפת חלב

## Brief

אפליקציה לחישוב גיל מדויק של תינוק ותאריכי חיסונים משוערים, מותאמת לאחיות טיפת חלב והורים בישראל.

## פיצ'רים

1. **חישוב גיל מדויק** — חודשים, שבועות, ימים מתאריך לידה לתאריך בדיקה
2. **גיל לחיסונים** — סך שבועות + ימים שנותרו (פורמט שאחיות טיפת חלב משתמשות בו)
3. **מחשבון תאריכי חיסונים** — לוח חיסונים סטנדרטי (חודש, 6 שבועות, 4ח, 6ח, 9ח)
4. **RTL מלא, פונט Rubik, עיצוב נקי תכלת/לבן** — מותאם לסביבת בית-חולים/מרפאה

## תקלה שזוהתה (2026-04-24)

הקובץ הקיים ב-`cohenra/TipatHalav` הועלה כ-`index.html` אבל הוא JSX גולמי. GitHub Pages מציג טקסט במקום אפליקציה.

## פתרון

לארוז כפרויקט Vite + React + Tailwind אמיתי, להוסיף GitHub Actions לבילד אוטומטי, ולהפעיל Pages במצב Actions.

## מי טיפל

- **dana** — קוד frontend (Vite scaffold, polish רכיב, deployment config)
- (build-pipeline המלא לא רץ — היישום קצר מדי בשביל זה)


## 🆕 Newly Available — 2026-04-27

**Source:** `/sync-agency` propagation (Kivun agency capability expansion).

### New agent: רותם (Privacy & Compliance Officer / DPO)
- **File:** `~/.claude/agents/rotem.md` · vault: `[[agents/rotem]]`
- **4 operating modes:** A (`/client-meeting` pre-PRD), B (`/build-pipeline` Phases 3+3.5.5+4.5+5 hand-off), C (`/openspec` delta gate), D (`/marketing-kickoff` Phase 1.5)
- **Triggers (conditional join):** PII, payments, kids, health, multi-tenant SaaS, file uploads, 3rd-party data sharing, regulated sector, B2C >1K users, EU data, AI training on user data, customer testimonials
- **Coordinates with:** [[agents/erez]] (security peer), [[agents/eitan]] (financial peer), [[agents/dba]] (downstream schema), [[agents/jordan]] (downstream endpoints)

### Updated: Erez (CISO) → 2-mode agent
- **Mode A — Pre-PRD Discovery (NEW):** joins `/client-meeting` conditionally → `security-preconditions.md` BEFORE maya drafts PRD
- **Mode B — Threat Model (existing):** unchanged — Phase 3 of `/build-pipeline`

### Skills updated
- `/client-meeting` — 4 conditional specialists (noa, eitan, erez Mode A, rotem Mode A) + Phase 2.5 preconditions writing
- `/build-pipeline` — rotem at Phases 3 (compliance-spec), 3.5.5 (schema review BLOCK gate), 4.5 (implementation review), 5 (test cases hand-off to amit-logic)
- `/openspec` — Step 3c.5 compliance delta gate
- `/marketing-kickoff` — Phase 1.5 marketing compliance checklist (always)

### Per-this-client priority: **LOW**
Static calculator on GH Pages — no user data storage detected. rotem לא נדרש לעת עתה. אם יתווסף email capture / user accounts בעתיד — לבדוק שוב.

### Where to start
- Read SOP: `~/.claude/agents/rotem.md`
- Vault proxy: `[[agents/rotem]]`
- Brain hub update: `[[agency-brain]]` (rotem now listed under 💰 Specialists)

---


## 🔒 Security Audit Propagation — 2026-05-12

**Source:** `/sync-agency` after `2026-05-12` agency-wide security audit (see `~/Desktop/projects/MakeCompany/security-audit-skills-2026-05-12.md`).

### Findings (agency-wide)
- 0 CRITICAL · 0 backdoors · 0 spyware · 0 supply-chain attacks
- 1 minor leak found: `kids-quest/output/frontend/.env.vercel.tmp` had an EXPIRED Vercel OIDC token. Removed from git history + force-pushed.
- 3 MCP servers were unpinned → now pinned (notebooklm@2.0.0, openai@0.1.1, n8n@2.51.3)
- `~/.claude/skills/gstack.bak/` deleted (10MB+ duplicates)

### What this means for this client
1. **`.gitignore` hardened** — all new clients (and existing ones via this update) now block `.env.vercel*`, `*.tmp`, `.vercel/`, firebase + AWS credential files. Append to current `.gitignore` if missing.
2. **No action required for past commits** unless an env file is actively committed (run `git ls-files | grep -E '\.env|\.vercel'` to verify).
3. **Quarterly audits** — next: 2026-08-12. Re-scan all skills + repos.

### Where to look
- Audit report: `~/Desktop/projects/MakeCompany/security-audit-skills-2026-05-12.md`
- Security policy: `~/.claude/SECURITY-NOTES.md`
- Brain hub: `[[agency-brain]]` (security note added in 2026-05-12 line)

---
