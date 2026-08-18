# Challenges


---

# `11-PROJECT-DOCUMENTATION/challenges.md`

```md
# BioCollab — Challenges

## Challenge 001 — State Ownership

### Problem

Hero initially owned `isExploring`.

Later StatusPanel also needed the same state.

### Lesson

When multiple sibling components depend on the same state,
move that state to their common parent.

---

## Challenge 002 — Passing Functions

### Problem

Understanding:

```tsx
handleExplore

vs

handleExplore()
Lesson
handleExplore
    = pass function


handleExplore()
    = execute function immediately

Event handlers usually require the function reference.

Challenge 003 — Dynamic Rendering
Problem

Manually rendering every collaboration does not scale.

Lesson

Use:

collaborations.map(...)

to generate reusable components from data.

Challenge 004 — List Keys
Problem

React needs stable identity for dynamically rendered list items.

Lesson

Use a stable unique ID instead of array position whenever possible.