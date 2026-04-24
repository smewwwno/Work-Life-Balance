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
