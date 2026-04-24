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
