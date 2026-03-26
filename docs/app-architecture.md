# Browser App Architecture

## Product idea

The product is a browser application with a single shell and two primary modes:

- **Life** mode
- **Work** mode

The user switches between them with a top-level toggle.

The application keeps one shared platform, but exposes two different interfaces, color systems, filters, role sets, workflows, and data views.

- **Life** is green and associated with the tree or leaf metaphor.
- **Work** is brown and associated with the trunk, wood, or structural growth metaphor.

## Core principle

This is **not** two separate apps.
It is **one platform with two domain modes**.

That means:
- one authentication system,
- one shared object model,
- one integration layer,
- one automation layer,
- one role engine,
- one UI shell,
- two domain interfaces.

## Primary UX model

### Top-level shell

The browser app should contain:

1. **Mode Toggle**: Work / Life
2. **Global Search / Command Input**
3. **Kanban View**
4. **Calendar View**
5. **Inbox / Capture View**
6. **Roles View**
7. **Workflows View**
8. **People / Contacts View**
9. **Settings / Integrations View**

The shell remains stable.
The selected mode changes:
- visible categories,
- default workflows,
- color palette,
- role routing,
- widgets,
- summaries,
- relevant integrations.

## Information architecture

### Shared platform layer

The following modules are shared by both Work and Life:

- auth and user profile
- task and event engine
- kanban engine
- calendar engine
- role registry
- workflow registry
- integration registry
- notification engine
- logging and audit trail
- search and command layer

### Life mode

Life mode focuses on:
- body
- household
- relationships
- leisure
- development

Main Life screens:
- Life Dashboard
- Life Kanban
- Life Calendar
- People Table
- Goals and Events
- Roles
- Workflows

### Work mode

Work mode focuses on:
- projects
- delivery
- backlog
- sprints
- team-facing work items
- external integrations with Jira and Confluence

Main Work screens:
- Work Dashboard
- Work Kanban
- Work Calendar
- Sprint / Backlog View
- Roles
- Workflows
- Integrations

## UI modules

### 1. App Shell

Contains:
- top navigation
- mode toggle
- sidebar
- content area
- command bar
- notifications

### 2. Kanban module

Minimal kanban implementation is enough at the beginning.

Recommended default statuses:
- Backlog
- Planned
- In Progress
- Review
- Done

This can be visually implemented as five status bars or five columns.

Kanban must support:
- drag and drop
- filters
- category filtering
- role filtering
- due date badges
- calendar linkage

### 3. Calendar module

Shared calendar engine with different filtered views.

Calendar types:
- Life Calendar
- Work Calendar
- Combined Calendar

Calendar must support:
- tasks with due dates
- events with time ranges
- recurring items
- imported external calendar data
- role-linked events

### 4. Roles module

Roles are stored as markdown-defined role artifacts, similar in spirit to agency-style agent files.

Each role should contain:
- identity
- scope
- mission
- critical rules
- workflows used
- input objects
- output objects
- allowed integrations

Browser UI should expose:
- role list
- role detail page
- role status
- workflows using this role
- linked categories

### 5. Workflows module

Workflows are structured, reusable operating sequences where one or more roles are involved.

Workflow object should define:
- name
- description
- domain (Life / Work / Shared)
- trigger
- roles involved
- inputs
- steps
- outputs
- integrations used

Examples for Life:
- plan weekend
- organize travel
- prepare birthday
- monthly household reset
- personal finance review
- restore sleep routine

Examples for Work:
- create work item from idea
- run sprint planning
- sync Jira issue to internal card
- prepare weekly review
- create Confluence summary from work log

### 6. People module

Needed mainly for Life, but can later support work contacts too.

People records should contain:
- name
- relation type
- importance
- notes
- important dates
- last touchpoint
- next suggested touchpoint
- linked events and tasks

### 7. Command layer

The command layer is critical.

It should allow text and later voice input such as:
- create task
- schedule event
- show today's life tasks
- show work backlog
- route to role
- run workflow
- create summary

This layer is where LLM routing can be introduced.

## Role architecture

The platform should not expose many separate bots as separate products.
It should expose one app with internal role modules.

Recommended first-level roles:
- Router
- Body Coach
- Life Operations Manager
- Relationship Manager
- Leisure Curator
- Learning Coach
- later: Work Delivery Manager, Work Analyst, Documentation Agent, Sprint Facilitator

## Workflow architecture

A workflow can involve:
- one role,
- many roles,
- one or more integrations,
- task and event creation,
- summaries,
- decisions.

What else can be included in workflows besides roles:
- triggers
- state transitions
- forms
- templates
- reminders
- external sync rules
- approval rules
- summaries
- logging rules
- permissions

This is important: workflows are not just sequences of prompts.
They are operating flows across UI, data, roles, and integrations.

## Data architecture

### Shared core objects

- Goal
- Task
- Event
- Person
- Workflow
- Role
- Category
- Label
- Log Entry
- Integration Connection

### Domain partitioning

Each object should have:
- domain = Life / Work / Shared
- visibility rules
- linked categories
- linked roles
- source system

This allows the same platform to keep clean separation between Work and Life without splitting the whole backend.

## Data access and exposure rules

This is one of the most important parts.
Not every role should see all data.

### Recommended access model

#### 1. Role-scoped access
Each role only sees the data relevant to its scope.

Example:
- Body Coach sees body records, sleep, sport, nutrition, and related events.
- Relationship Manager sees people, dates, touchpoints, and linked tasks/events.
- Life Operations Manager sees household, finance, purchases, obligations.

#### 2. Workflow-scoped access
A workflow only gets the data necessary for the current operation.

#### 3. Mode-scoped UI exposure
Life mode should not surface work-heavy details by default.
Work mode should not surface intimate life data by default.

#### 4. Shared object linkage without full exposure
A shared calendar can know that a time block is occupied without exposing all details to every role.

This means the system should support:
- metadata visibility,
- detail visibility,
- masked visibility,
- permission inheritance.

## Integration architecture

### Initial integrations

- Jira
- Confluence
- Google Calendar
- Google Workspace components as needed

### Integration layer responsibilities

- import external objects
- map them to internal objects
- sync status and time data
- create summaries from external data
- avoid turning the external system into the only source of truth

Recommended principle:
External systems remain source systems for their domain, but the app becomes the orchestration and visibility layer.

Example:
- Jira remains source of truth for detailed work issue tracking
- the app stores mirrored or normalized work objects for planning, visibility, and role workflows

## Recommended frontend architecture

### Frontend
- React or Next.js app shell
- mode-aware layout system
- kanban board components
- calendar components
- command bar
- role and workflow detail pages

### Backend
- Python backend for deterministic workflow logic
- API layer for objects, kanban, calendar, people, workflows, integrations
- role orchestration service
- sync jobs and schedulers

### Storage
- relational database for structured objects
- markdown or file-backed registry for roles and workflows
- optional vector/search layer later for retrieval and summaries

## MVP scope

The MVP should not try to build everything at once.

### MVP for browser app

1. App shell
2. Work / Life toggle
3. Kanban board
4. Calendar
5. Categories and labels
6. Goals, Tasks, Events
7. Role registry pages from markdown
8. Workflow registry pages from markdown
9. Basic Life mode
10. Basic Work mode
11. Basic Jira and Google Calendar sync later, not first

## Delivery phases

### Phase 1
- define information architecture
- define shared object model
- define roles and workflows as markdown artifacts
- define mode system: Life / Work / Shared

### Phase 2
- build browser shell
- build mode toggle
- build kanban
- build calendar
- build object CRUD

### Phase 3
- connect roles to interface
- connect workflows to interface
- add routing and command bar

### Phase 4
- add integrations
- add summaries
- add permissions and data-scoping

### Phase 5
- add advanced analytics
- add agentic workflow execution
- add meta-prompting subsystem

## Final product position

This app is not just a planner.
It is a dual-domain operating system:
- one domain for Life,
- one domain for Work,
- one platform for visibility, action, planning, routing, and orchestration.
