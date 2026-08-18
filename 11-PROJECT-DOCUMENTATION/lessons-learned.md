# Lessons Learned


---

# `11-PROJECT-DOCUMENTATION/lessons-learned.md`

```md
# BioCollab — Lessons Learned

## React

- State ownership matters.
- Parents coordinate shared state.
- Children communicate upward through callbacks.
- Props flow downward.
- UI should be driven by data.
- Reusable components reduce duplication.
- Dynamic lists require stable keys.
- Empty/error/loading states are part of real UI design.

---

## Engineering

The important question is not:

> "How do I make this work?"

It is:

> "Where should this responsibility live, and why?"

---

## Current Mental Model

```text
State
 ↓
UI
 ↓
User interaction
 ↓
Callback
 ↓
State update
 ↓
Re-render
 ↓
Updated UI
