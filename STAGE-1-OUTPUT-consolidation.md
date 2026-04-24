# [STAGE-1-OUTPUT-consolidation.md]
# Personal OS — Repository Consolidation Spec
# Status: APPROVED

## Context

Merge three external repositories into `smewwwno/work-life-balance`
on branch `claude/personal-os-architecture-tCBIu`.

**Sources:**
- `https://github.com/gsd-build/gsd-2` → repo root (execution engine)
- `https://github.com/msitarzewski/agency-agents` → `context/agents/`
- `https://github.com/msitarzewski/AGENT-ZERO` → `context/protocols/`

**Existing code** (current React/Vite app) → `application/`

**Working directory:** `/home/user/Work-Life-Balance`

---

## Pre-flight checks

```bash
# Confirm correct branch
git branch --show-current
# Expected: claude/personal-os-architecture-tCBIu

# Confirm Node.js version (gsd-2 requires >= 22)
node --version
```

If Node.js < 22, install via `nvm install 22 && nvm use 22` before proceeding.

---

## Step 1 — Move existing React/Vite app to `application/`

```bash
mkdir -p application

# Move all source files
mv App.css App.jsx AppContext.jsx CalendarView.jsx ContactsView.jsx \
   GlobalSearch.jsx GoalsView.jsx Header.jsx InboxView.jsx KanbanView.jsx \
   RolesView.jsx SettingsView.jsx Sidebar.jsx TaskModal.jsx WorkflowsView.jsx \
   eslint.config.js index.css index.html main.jsx seedData.js \
   favicon.svg react.svg vite.svg hero.png icons.svg \
   package.json package-lock.json vite.config.js \
   application/

# Delete build artifacts (not source, safe to remove)
rm -f index-vkTfZQqq.css index-vuE_7kX9.js
```

---

## Step 2 — Clone gsd-2 into repo root

```bash
git clone --depth=1 https://github.com/gsd-build/gsd-2.git /tmp/gsd-2-src

# Copy everything except .git and node_modules
rsync -av \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.gsd' \
  /tmp/gsd-2-src/ ./

# Clean up
rm -rf /tmp/gsd-2-src
```

**Conflict resolution:**
- `README.md` from gsd-2 replaces the current one. The current README has no critical content.
- `package.json` from gsd-2 becomes the root package. React/Vite deps are now in `application/package.json`.
- If any other file already exists at root, gsd-2 version wins (rsync overwrites).

---

## Step 3 — Clone agency-agents into `context/agents/`

```bash
git clone --depth=1 https://github.com/msitarzewski/agency-agents.git /tmp/agency-agents-src

mkdir -p context/agents

rsync -av \
  --exclude='.git' \
  /tmp/agency-agents-src/ context/agents/

rm -rf /tmp/agency-agents-src
```

Result: `context/agents/` contains all 12 domain directories
(engineering, design, marketing, sales, product, project-management,
finance, testing, support, spatial-computing, game-development, academic)
plus `integrations/`, `examples/`, `scripts/`, `README.md`.

---

## Step 4 — Copy AGENT-ZERO protocol files into `context/protocols/`

```bash
git clone --depth=1 https://github.com/msitarzewski/AGENT-ZERO.git /tmp/agent-zero-src

mkdir -p context/protocols

cp /tmp/agent-zero-src/AGENTS.md context/protocols/AGENTS.md
cp /tmp/agent-zero-src/README.md context/protocols/WORKFLOW-README.md

rm -rf /tmp/agent-zero-src
```

---

## Step 5 — Initialize Memory Bank

Create the following four files exactly as specified below.

### `context/memory-bank/project-brief.md`

```markdown
# Personal OS — Project Brief

## What this is

A personal operating system for life and work, running locally on my machine.
Terminal-first interface powered by gsd + LLM. Context stored in this GitHub repo.

## Two layers

**application** — web frontend, connectors, automations, no LLM.
Current foundation: React/Vite app in `application/`. Will grow into
the full UI with both life and work modes.

**context** — LLM context library. Collects application-layer state
and provides it to the AI so it can generate decisions inside the app.
Lives in `context/`.

## Two modes

**life** — personal task tracker + habit tracker.
Categories: body / home / rest / leisure.
Tools: board (tasks), calendar (events), calculator (transactions).

**work** — ERP covering the full cycle from idea to market.
Entities: companies, projects, products.
Tools: board (tasks), calendar (events), calculator (transactions).

## Terminal interface

- All management via terminal: direct commands + text queries to LLM
- LLM queries go through gsd CLI
- `gsd` at repo root is the primary entry point

## Current status

Stage 1: Consolidating three source repositories into this unified repo.
Application layer: embryonic (React/Vite views in `application/`).
Context layer: initialized (agents + protocols + memory bank).
```

### `context/memory-bank/architecture.md`

```markdown
# Architecture

## Repository layout

```
work-life-balance/
├── src/                    # gsd-2: agent runtime source
├── packages/               # gsd-2: Pi SDK packages
├── extensions/             # gsd-2: 24 built-in tools
├── gsd-orchestrator/       # gsd-2: parallel task orchestrator
├── native/                 # gsd-2: native extensions
├── web/                    # gsd-2: built-in web UI
├── vscode-extension/       # gsd-2: VS Code plugin
├── .gsd/                   # gsd runtime state [gitignored]
├── CLAUDE.md               # master context loader
│
├── context/
│   ├── memory-bank/        # project state — loaded at every session
│   │   ├── project-brief.md
│   │   ├── architecture.md  ← this file
│   │   ├── system-modes.md
│   │   └── tasks/          # monthly task logs
│   ├── agents/             # 144+ agent role definitions (agency-agents)
│   └── protocols/          # workflow protocol (AGENT-ZERO)
│
└── application/            # React/Vite app — future custom UI
    ├── *.jsx               # current views: Kanban, Calendar, Goals…
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Execution flow

1. `gsd` starts in repo root
2. gsd reads `CLAUDE.md` → loads `context/memory-bank/`
3. LLM has full context: project state, agent library, workflow protocol
4. User interacts via terminal (commands + natural language)
5. gsd state machine handles: PLAN → EXECUTE → COMPLETE → REASSESS

## Key architectural decisions

- gsd-2 is the runtime; it is not modified, only configured via CLAUDE.md
- context/ is append-only during normal operation (memory bank grows)
- application/ is a standalone Vite project; developed independently
- agents in context/agents/ are loaded on demand, not pre-loaded wholesale
- .gsd/ is gitignored (runtime ephemeral state); context/ is committed
```

### `context/memory-bank/system-modes.md`

```markdown
# System Modes

## life mode

Personal life management.

**Entities:**
- Task (with category tag)
- Habit (recurring, with streak)
- Event (calendar)
- Transaction (financial)

**Habit categories:**
- body — health, fitness, sleep, nutrition
- home — household, errands, maintenance
- rest — recovery, sleep schedule, downtime
- leisure — hobbies, entertainment, socializing

**Three base tools:**
- board — kanban for tasks and habits
- calendar — events and reminders
- calculator — personal budget and spending

## work mode

Business and project management (ERP).

**Entities:**
- Company (client or own venture)
- Project (belongs to company)
- Product (belongs to project; full cycle: idea → market)
- Task (belongs to project or product)
- Event (meetings, deadlines)
- Transaction (revenue, expenses, investments)

**Full product cycle:**
idea → research → spec → build → test → launch → grow → exit

**Three base tools:**
- board — project/product kanban
- calendar — business events and milestones
- calculator — company financials and projections

## Shared principles

- Both modes share the same three tool types (board / calendar / calculator)
- Both modes accessible from the same terminal interface via `gsd`
- Context layer maintains state for both modes simultaneously
- Switching modes: `gsd --mode life` / `gsd --mode work`
```

### `context/memory-bank/tasks/` directory

Create the directory with a `.gitkeep` file:

```bash
mkdir -p context/memory-bank/tasks
touch context/memory-bank/tasks/.gitkeep
```

---

## Step 6 — Create `CLAUDE.md` at repo root

Create file `/home/user/Work-Life-Balance/CLAUDE.md` with this exact content:

```markdown
# Personal OS

This repository is a personal operating system for life and work.
It runs on gsd (Get Shit Done) as the primary execution engine.

## How to start

```bash
npm install -g gsd-pi@latest   # install once
gsd                             # launch personal OS
```

## System context — load at session start

When starting a session, always read these files first:

1. `context/memory-bank/project-brief.md` — what this system is
2. `context/memory-bank/architecture.md` — repository layout and layers
3. `context/memory-bank/system-modes.md` — life and work modes

## Agent library

Specialized role definitions are in `context/agents/` organized by domain.
Load a specific agent when the task requires domain expertise:

- Engineering work → `context/agents/engineering/`
- Product decisions → `context/agents/product/`
- Project coordination → `context/agents/project-management/`
- Financial analysis → `context/agents/finance/`
- UI/UX work → `context/agents/design/`
- All other domains → see `context/agents/` subdirectories

## Workflow protocol

Follow the state machine defined in `context/protocols/AGENTS.md`:
PLAN → BUILD → DIFF → QA → APPROVAL → APPLY → DOCS

Human approval is required before APPLY.

## Application layer

The custom UI is in `application/`. It is a standalone React/Vite project.
To run it:

```bash
cd application
npm install
npm run dev
```

Current views: Kanban, Calendar, Goals, Roles, Inbox, Contacts, Workflows.
This app will evolve into the primary UI for both life and work modes.

## Task hierarchy (gsd)

Milestone → Slice → Task

Each task must fit within one LLM context window.
State is stored in `.gsd/` (gitignored, ephemeral).
Context is stored in `context/` (committed, persistent).
```

---

## Step 7 — Update `.gitignore`

Append the following to the existing `.gitignore` (or create it if absent):

```
# gsd runtime state
.gsd/

# dependencies
node_modules/
application/node_modules/

# build output
dist/
application/dist/
*.tsbuildinfo

# environment
.env
.env.local
.env*.local

# OS
.DS_Store
Thumbs.db
```

---

## Step 8 — Commit and push

```bash
git add -A

git commit -m "$(cat <<'EOF'
Stage 1: consolidate gsd-2 + agency-agents + AGENT-ZERO into unified repo

- gsd-2 becomes repo root (execution engine, Node.js >= 22, SQLite)
- context/agents/: 144+ agent role definitions (agency-agents)
- context/protocols/: workflow state machine (AGENT-ZERO)
- context/memory-bank/: project brief, architecture, system modes
- application/: existing React/Vite app (embryonic UI layer)
- CLAUDE.md: master context loader and system entry point

https://claude.ai/code/session_01Knochgu6iUmpnEhSMuh9X8
EOF
)"

git push -u origin claude/personal-os-architecture-tCBIu
```

If push fails due to network error, retry with exponential backoff:
2s → 4s → 8s → 16s (max 4 retries).

---

## Validation checklist

After execution, verify:

- [ ] `gsd` command resolves (`which gsd` or `npx gsd --version`)
- [ ] `context/agents/` has 12+ domain subdirectories
- [ ] `context/protocols/AGENTS.md` exists and is non-empty
- [ ] `context/memory-bank/` has 3 `.md` files + `tasks/` dir
- [ ] `CLAUDE.md` exists at repo root
- [ ] `application/package.json` has React/Vite dependencies
- [ ] `application/App.jsx` exists (confirms move succeeded)
- [ ] `.gsd/` is listed in `.gitignore`
- [ ] Branch `claude/personal-os-architecture-tCBIu` is up to date on remote

---

## Final state

After completing all steps, the working command is:

```bash
cd /home/user/Work-Life-Balance
gsd
```

This opens the personal OS with full context: project memory bank,
144+ agent definitions, workflow protocol, and the embryonic application layer.
All subsequent development happens inside this gsd session.
