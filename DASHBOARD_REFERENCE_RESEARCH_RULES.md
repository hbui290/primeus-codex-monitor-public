# Dashboard Reference Research Rules

This document defines how dashboard references must be studied before applying ideas to the Primeus x Codex monitor.

The goal is simple:

- learn workflow logic before visual details
- extract reusable product patterns instead of copying surfaces blindly
- protect the monitor from turning into a pile of unrelated borrowed UI

## 1. Core rule

When a reference dashboard is shared, do not start by copying:

- theme
- widgets
- cards
- animations
- side features

Start by identifying:

- what job the product is doing
- who it is for
- what decisions the main screen helps users make
- what the primary workflow is
- what data model the UI assumes

Short version:

> Copy workflow logic first, information structure second, presentation third.

## 2. Required research order

Every reference review must follow this order.

### Step 1. Identify the product type

Classify the reference first:

- monitor
- control plane
- dashboard builder
- database workspace
- task board
- runtime console
- admin surface
- reporting surface

If the product type is different from this monitor, write that down explicitly before applying anything.

Example:

- LobsterBoard is a dashboard builder
- this repo is a snapshot-driven operator monitor

That means its layout logic may inspire us, but its product model must not be copied whole.

### Step 2. Define the main user job

Before extracting patterns, answer:

1. What is the main job of the screen?
2. What decision should a user be able to make in under 10 seconds?
3. What action happens next after reading this screen?

If these are unclear, do not implement anything yet.

### Step 3. Map the workflow

Write the workflow in plain language:

- what enters the system
- what gets reviewed
- what is blocked
- what can continue
- what requires escalation
- where deep detail lives

This is the most important step.

If the reference does not clarify workflow, it is only a style reference, not a structural reference.

### Step 4. Separate primary vs secondary surfaces

For each screen, identify:

- primary surface
  - the one place where the user makes the key decision
- supporting surfaces
  - context, logs, filters, metadata, settings

The current monitor should never contain multiple primary surfaces fighting each other on the same page.

### Step 5. Identify the source of truth

Ask:

- what data source drives the UI
- what object the page is centered on
- whether the screen is record-first, queue-first, or summary-first

Examples:

- Notion database: record-first
- ClickUp list: task-first
- this monitor today: snapshot-first

Never copy a UI pattern that assumes a different source of truth unless the backend model supports it.

## 3. What to extract from a reference

For every useful reference, collect only these categories.

### A. Workflow patterns

Examples:

- scan -> select -> inspect -> act
- blocked -> pending -> safe to continue
- board -> detail page
- summary -> queue -> deep record

### B. Information architecture patterns

Examples:

- what belongs in Home
- what deserves its own route
- what stays in sidebar vs header vs inspector
- how routes are grouped by user intent

### C. Density and hierarchy patterns

Examples:

- one primary table, not two competing tables
- one workflow summary layer, not repeated queue cards
- detail belongs in child pages, not in summary boards

### D. Interaction patterns

Examples:

- row click opens detail in the same workspace
- filters act on the same source data as the board
- summary cards narrow the board, not open disconnected worlds

### E. Copy and labeling patterns

Examples:

- blocked vs waiting vs safe to continue
- owner vs next owner
- issue vs status vs next step

## 4. What must not be copied blindly

Never copy these directly from references without proving they fit this monitor:

- theming systems
- widget systems
- drag-drop builders
- decorative motion
- fake feature shells
- surfaces that require backend objects we do not have

If a reference feature depends on data or workflows that this repo does not support, it must be labeled as:

- future direction
- not for current phase

and must not be patched into the current UI as fake interaction.

## 5. Mandatory questions before implementing

Before any UI change based on a reference, answer these questions in writing.

1. What is the monitor's actual job on this screen?
2. What is the primary decision the user must make here?
3. What workflow state does this UI expose?
4. What object is the screen centered on?
5. Does the backend actually support the interaction?
6. What should stay on the overview surface?
7. What should move into a detail surface?
8. What part of the reference should be ignored?

If these are not answered, no implementation should happen.

## 6. Required output format when a reference is shared

When reviewing a reference, the response should be structured like this:

### A. Product type

- what the reference product actually is
- how it differs from this monitor

### B. Good patterns worth learning

- workflow patterns
- structure patterns
- interaction patterns

### C. Things to reject

- patterns that do not fit the current product model
- features that would add noise or fake depth

### D. Safe adaptations for this monitor

- exact pages affected
- what should change
- what should remain unchanged

### E. Implementation boundary

- current-phase safe
- future-phase only

## 7. Page-specific rules for this monitor

These rules are specific to the current product.

### Home

Home is for:

- overall state
- what needs attention
- recent activity

Home is not for:

- deep workflow handling
- long detail panels
- duplicate runtime facts
- duplicate report logic

### Reports

Reports is the primary operator surface.

Reports should answer:

1. what is blocked
2. why it is blocked
3. who acts next
4. what can keep moving

Reports must not become:

- a second Home
- a second Runtime
- a decorative dashboard full of unrelated summary cards

### Agents

Agents is for:

- roster
- current state
- control profile
- targeted review of agent configuration

Agents is not a fake chat workspace unless the backend truly supports per-agent sessions, tasks, files, and runs.

### Runtime

Runtime is for:

- service health
- worker health
- mode drift
- restart controls

Runtime should not compete with Home for the same summary role.

## 8. Adaptation rule

Any borrowed idea must fit one of these three buckets:

### Keep now

Fits the current snapshot-driven monitor and improves clarity immediately.

### Park for V2

Good idea, but requires new objects such as:

- threads
- tasks
- approvals
- sessions
- uploads

### Reject

Interesting in the reference, but wrong for this monitor's job.

## 9. Anti-pattern checklist

Stop if any of these appear:

- adding a new card because the reference had one
- adding summary layers that repeat the same data
- mixing workflow, runtime, and settings on one page
- adding interactions that have no backend support
- copying visual style before clarifying user job
- making one page do both overview and deep work badly

## 10. Implementation gate

No dashboard-reference-driven change should be implemented until:

- the product type is named
- the workflow is described
- the primary surface is identified
- the adaptation bucket is chosen
- the affected route is justified

## 11. Short operating principle

When a user shares a dashboard reference:

> First learn what work the reference helps users do.
> Then learn how it structures that work.
> Only then adapt the smallest useful piece that fits the current monitor.

