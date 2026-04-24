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
