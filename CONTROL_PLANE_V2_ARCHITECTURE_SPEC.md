# Primeus x Codex Control Plane V2

This document is the long-term architecture spec for evolving the current Primeus x Codex monitor into a multi-department operations workspace.

It assumes the current app remains useful as a snapshot-based monitor and guarded admin shell, but it should no longer be treated as the final product shape.

## Chẩn đoán ngắn

The current app is still a snapshot-based agent control shell.

It is not yet:

- a multi-role collaboration workspace
- a multi-department operating surface
- a thread, task, and file system
- a true per-agent workbench

The current shell still centers around:

- `Home`
- `Agents`
- `Runtime`
- `Reports`
- `Skills`
- `Config`
- `Identity`
- `Audit`

The backend is still mostly centered around:

- `/api/dashboard`
- `/api/refresh`
- `/api/runtime/restart`
- `/api/integrations/save`
- `/api/identity/save`
- `/api/agents/save`
- `/api/skills/install`

That is enough for an operations shell, but not enough for a scalable collaboration product.

## V2 North Star

Agent Control V2 should become:

> a multi-department operations workspace for managers, workers, and agents working together on threads, tasks, files, approvals, and runtime

The core objects should no longer be inferred from a dashboard snapshot alone.

The core objects should become:

- `department`
- `thread`
- `message`
- `task`
- `assignment`
- `attachment`
- `agent`
- `session`
- `run`
- `approval`

`dashboard.json` should remain an operations summary read model, not the primary source of truth for the entire UI.

## 1. Product model

V2 should have three major layers.

### A. Collaboration layer

Used by managers, team leads, and workers.

- Departments
- Threads / Inbox
- Tasks / Board
- Files
- Notes / Decisions

### B. Execution layer

Used by agent operators and system operators.

- Agents
- Sessions / Runs
- Approvals
- Runtime
- Skills

### C. Admin layer

Used by owners and admins.

- Channels / Integrations
- Identity / Policy
- Config
- Audit
- Logs
- Health
- Updates

This keeps daily work, execution work, and platform control from collapsing into one flat shell.

## 2. Sitemap V2

### Use

- Home
- Departments
- Inbox
- Tasks
- Files

### Operate

- Agents
- Sessions
- Approvals
- Runtime
- Skills

### Admin

- Channels
- Config
- Identity
- Audit
- Health
- Logs
- Updates

This structure maps to operator intent instead of API accumulation.

## 3. Department Workspace

`BD Manager` should not be implemented as a one-off hardcoded tab.

It should be a `Department Workspace` template, with `BD` as the first preset.

### Purpose

This is the primary collaboration surface for a department.

It should be where a manager:

- reads threads
- replies
- assigns work
- attaches files
- asks for approvals
- escalates
- invokes agent assistance

### Layout

Use a three-column layout.

#### Left column: thread and task list

- filter by department
- filter by team
- filter by assignee
- unread
- blocked
- due today
- waiting approval
- my team
- my department

#### Center column: conversation timeline

- manager messages
- worker replies
- agent replies
- internal notes
- decisions
- task events
- file cards

#### Right column: context panel

- thread status
- task status
- assignee
- due date
- priority
- linked files
- participants
- related agent or session
- quick actions

### Quick actions

- assign to manager
- assign to worker
- assign to agent
- change status
- set due date
- request approval
- add note
- attach files
- start agent assist
- escalate to department lead

### BD preset

The first preset can be:

- `BD Inbox`
- `Deals in progress`
- `Waiting manager reply`
- `Waiting client reply`
- `Needs approval`
- `Assigned to agent`

This gives BD a tailored experience without forking the architecture.

## 4. Agent Workbench

The current `Agents` route is mostly a control editor plus summary surface.

V2 needs a true workbench per agent.

### Each agent should have a dedicated page with these tabs

- Overview
- Conversation
- Assigned Tasks
- Files / Context
- Memory / Identity / Policy
- Runs / History
- Health / Tools
- Overrides

### Overview

- role
- current status
- assigned department or team
- current workload
- pending approvals
- last activity

### Conversation

- direct chat with that agent
- send instruction
- inject note
- stop current run
- start new run
- show streamed tool output

### Assigned Tasks

- task list
- task status
- reassign
- mark blocked
- escalate

### Files / Context

- file scope for that agent
- attach or remove file
- pin context
- show extracted text
- show previews

### Memory / Identity / Policy

- linked identity files
- notes
- approval policy
- temporary model or reasoning override
- per-agent guardrails

### Runs / History

- run history
- run result
- errors
- files produced
- related sessions or threads

### Health / Tools

- service status
- channel availability
- tool availability
- last error
- capability matrix

### Overrides

- temporary instruction
- temporary model
- reasoning level
- channel lock
- department lock
- expiration time

This is the missing layer that makes per-agent interaction actually useful.

## 5. Files and upload system

Upload cannot be treated as a decorative input control.

Attachments must become first-class objects with storage, metadata, previews, extraction, and linkages.

### Supported file types in Phase 1

- text: `.txt`, `.md`, `.json`, `.csv`
- image: `.png`, `.jpg`, `.jpeg`, `.webp`
- pdf: `.pdf`

### Supported file types in Phase 2

- `.docx`
- `.xlsx`
- `.zip`
- audio and video if needed

### Upload flow

#### 1. Frontend attach

- attach from composer
- drag and drop
- multi-file
- progress
- remove before send

#### 2. Backend validation

- mime allowlist
- size limits
- role permission
- extension rejection

#### 3. Blob and metadata storage

Keep binary storage separate from metadata.

#### 4. Preview or extraction

- text file → text preview
- image → thumbnail
- pdf → preview plus extracted text where possible
- other file → metadata card

#### 5. Link to domain object

Files must be linkable to:

- message
- thread
- task
- agent
- run
- session

### UI surfaces that must support files

- global `Files` page
- chat composer
- task drawer
- agent workbench
- reusable file card component

## 6. Data model V2

### Organization and people

- `organizations`
- `departments`
- `teams`
- `users`
- `memberships`

### Execution entities

- `agents`
- `agent_profiles`
- `workers`
- `managers`
- `sessions`
- `runs`
- `run_events`

### Collaboration entities

- `threads`
- `thread_participants`
- `messages`
- `message_events`
- `tasks`
- `task_assignments`
- `task_events`
- `decisions`
- `notes`

### File entities

- `attachments`
- `attachment_links`
- `file_extractions`

### Governance and system

- `approvals`
- `approval_policies`
- `channels`
- `integrations`
- `skills`
- `audit_events`

### Relationship rules

- one thread has many messages
- one thread can have many tasks
- one task can have many assignments
- one task can target a user or an agent
- one attachment can link to many objects
- one run can start from a message or a task
- one department can contain many teams, managers, workers, and agents

## 7. API surface V2

The current local server is still admin-action oriented.

V2 needs domain APIs.

### Collaboration APIs

- `GET /api/departments`
- `GET /api/departments/:id`
- `GET /api/threads`
- `POST /api/threads`
- `GET /api/threads/:id`
- `POST /api/threads/:id/messages`
- `POST /api/threads/:id/notes`
- `POST /api/threads/:id/attachments`

### Task APIs

- `GET /api/tasks`
- `POST /api/tasks`
- `GET /api/tasks/:id`
- `PATCH /api/tasks/:id`
- `POST /api/tasks/:id/assign`
- `POST /api/tasks/:id/reassign`
- `POST /api/tasks/:id/status`
- `POST /api/tasks/:id/attachments`

### Agent APIs

- `GET /api/agents`
- `GET /api/agents/:id`
- `GET /api/agents/:id/history`
- `POST /api/agents/:id/messages`
- `POST /api/agents/:id/tasks`
- `POST /api/agents/:id/override`
- `POST /api/agents/:id/files`
- `POST /api/agents/:id/run`
- `POST /api/agents/:id/abort`

### Upload APIs

- `POST /api/uploads`
- `GET /api/uploads/:id`
- `GET /api/uploads/:id/preview`
- `POST /api/uploads/:id/link`

### Existing ops and admin APIs to preserve

- `/api/dashboard`
- `/api/refresh`
- `/api/runtime/restart`
- `/api/integrations/save`
- `/api/identity/save`
- `/api/agents/save`
- `/api/skills/install`

### Real-time layer

Phase 1 can stay on REST plus polling.

Phase 2 should add:

- `WS /ws/events` or SSE
- thread updates
- task updates
- run stream
- upload progress
- approval changes

## 8. Backend architecture

### The dashboard snapshot should stop being the source of truth

The current `dashboard.json` is appropriate for:

- home summary
- runtime summary
- audit summary
- health summary

It is not appropriate as the source of truth for:

- chat
- tasks
- delegation
- attachments
- approvals workflow

### Recommended backend split

#### 1. Control API / BFF

- serves the UI
- handles auth and session
- exposes collaboration, task, file, and agent workbench APIs

#### 2. Ops adapter layer

- runtime inspection
- config writes
- service restarts
- report syncing
- health syncing

#### 3. Collaboration DB

- threads
- messages
- tasks
- assignments
- attachments
- approvals

#### 4. Event bus / event log

- message created
- task assigned
- run started
- run completed
- upload finished
- approval requested

#### 5. Read models

- dashboard summary
- department summary
- agent summary
- inbox counters

## 9. Migration plan

### Phase 1 — Foundation

- keep the current monitor alive
- add DB objects for departments, threads, tasks, attachments
- add shell routes for `Departments`, `Inbox`, and `Files`
- start with `BD` as the pilot department

### Phase 2 — BD Manager Workspace

- thread list
- chat timeline
- task create and assign
- upload `.txt`, `.png`, `.jpg`, `.pdf`
- file preview
- assign to worker or agent

### Phase 3 — Agent Workbench

- per-agent conversation
- assigned task list
- files and context
- overrides
- run history

### Phase 4 — Multi-department scale

- department registry
- per-department presets
- role-based views
- department-scoped agent pools

### Phase 5 — Ops unification

- approvals center
- sessions view
- health and logs integration
- real-time event stream

## 10. Things V2 should not do

### 1. Do not hardcode `BD Manager` as a one-off page

That would guarantee more duplicated pages later.

### 2. Do not keep `dashboard.json` as the center of everything

Snapshot is not a collaboration model.

### 3. Do not shove chat, task, and file UI into the current Agents editor

That route is already a control editor and will become more confusing if overloaded.

### 4. Do not fake upload

Upload needs real storage, metadata, preview, extraction, and linkage.

### 5. Do not keep hardcoded runtime registry forever

Current names like `primeus`, `codex`, `john`, `sora` and fixed services can stay as seed data, but not as the future system model.

## 11. Acceptance criteria

V2 direction is correct when:

- a manager can open a department workspace and chat or assign work directly
- a task can be assigned to a human or an agent
- a thread can contain text, images, and PDFs
- each agent has a real workbench for custom interaction
- a new department can be added by data and config, not by forking UI
- the dashboard snapshot is no longer the only truth source
- permissions can distinguish owner, manager, worker, and viewer
- thread, task, run, and approval updates can be observed in near real time

## 12. Recommended first build order

The next implementation order should be:

1. Department Workspace
2. file and upload system
3. task and assignment model
4. Agent Workbench
5. live event layer
6. broader multi-department support

This order solves the biggest gaps first:

- no place for a manager to chat and delegate
- no file upload model
- no per-agent interaction surface
- no scalable department model

## 13. Follow-up artifacts

The next concrete documents to write from this umbrella spec are:

1. `DATA_MODEL_V2.md`
2. `API_CONTRACT_V2.md`
3. `DEPARTMENT_WORKSPACE_WIREFRAME_V2.md`
4. `AGENT_WORKBENCH_WIREFRAME_V2.md`
5. `UPLOAD_FLOW_V2.md`

This file is the source-of-truth umbrella spec for those follow-up artifacts.
