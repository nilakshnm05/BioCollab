
---

# `09-INTERVIEW-PREP/react/`

Permanent interview knowledge should be **question → short answer**, not essays.

```md
# React Interview Foundation

## What is state?

State is data owned by a component that can change over time and
cause the component to render updated UI.

---

## What is lifting state up?

Moving state from a child into their common parent when multiple
components need access to or coordination through that state.

---

## Where should state live?

At the lowest common ancestor that needs to own or coordinate it.

---

## What is a callback prop?

A function passed from parent to child through props so the child
can trigger behavior defined by the parent.

---

## Why use `.map()` in React?

To transform an array of data into an array of React elements.

---

## Why does React need keys?

Keys provide stable identity for elements in a dynamic list and help
React reconcile changes correctly.

---

## Why is index a problematic key?

Indexes represent position, not identity. Inserting, deleting or
reordering items can change positions.

---

## `&&` vs ternary?

`&&`:

    condition → UI / nothing

Ternary:

    condition → UI A / UI B