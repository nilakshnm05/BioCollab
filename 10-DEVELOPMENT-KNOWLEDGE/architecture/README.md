This should contain the deeper reasoning, not syntax.

# React Architecture — Initial Principles


## 1. State Ownership


State should live where it can be properly coordinated.


Example:


```text
             App
              │
       isExploring
         /       \
      Hero    StatusPanel

App owns the state because both children depend on it.

2. Unidirectional Data Flow

React data generally flows:

Parent
  ↓
Props
  ↓
Child

A child does not directly modify the parent's state.

Instead:

Child
  ↓ callback
Parent
  ↓ state update
New props
  ↓
Child
3. Separation of Responsibilities

App:

coordinates application state/data

Hero:

presents hero content
triggers parent callback

StatusPanel:

presents application status

CollaborationCard:

presents one collaboration
4. Data-Driven UI

Avoid designing UI around a fixed number of records.

Prefer:

Data
 ↓
Transformation
 ↓
Reusable component

This allows the UI to scale with changing API responses.

5. Identity

For dynamic lists:

position ≠ identity

Stable IDs should be used when available.

key={item.id}

This becomes increasingly important when applications support:

sorting
filtering
insertion
deletion
reordering
local component state
6. Empty State Is Part of Architecture

Data has multiple possible states:

Loading
   ↓
Success ──→ Data
   ↓
Empty
   ↓
Error

Production frontend architecture must account for these states rather
than assuming successful data.