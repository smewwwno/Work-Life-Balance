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
