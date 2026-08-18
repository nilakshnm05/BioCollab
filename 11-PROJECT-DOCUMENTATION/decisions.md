# BioCollab — Architecture Decisions

## ADR-001 — App Owns Exploration State

### Decision

`isExploring` is owned by `App`.

### Why?

Both `Hero` and `StatusPanel` participate in behavior driven by the
same state.

Therefore the state belongs in their common parent.

### Result

```text
App
├── Hero
└── StatusPanel

ADR-002 — CollaborationCard Is Reusable
Decision

Create a dedicated CollaborationCard component.

Why?

The number of collaborations is dynamic.

One component can represent every collaboration.

ADR-003 — Render Lists Using .map()
Decision

Transform collaboration data into components using .map().

Why?

The number of records may change based on API/database data.

We should not manually create a fixed number of cards.

ADR-004 — Use Database/API ID as React Key
Decision
key={collab.id}
Why?

The ID represents item identity and remains stable even if the item's
position changes.

ADR-005 — Handle Empty Collaboration Lists
Decision

Show an explicit empty state when no collaborations exist.

Why?

A production UI should communicate what happened instead of silently
rendering nothing.