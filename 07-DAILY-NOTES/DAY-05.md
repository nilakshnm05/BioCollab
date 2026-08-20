# Day 5 — Component Architecture, Callbacks & Derived UI

## Concepts
- Component responsibility
- Parent → child data flow
- Callback props
- Function reference vs function invocation
- Literal/union types
- Shared domain types
- Domain values vs presentation labels
- useState<number | null>
- Array.find()
- Conditional rendering with &&
- Shared constants
- Record<K, V>

## BioCollab Implementation
- Extracted CollaborationSection from App
- Created CollaborationDetails
- Added View interaction
- Added selected collaboration state
- Added Close interaction
- Added CollaborationStatus union type
- Created shared collaboration domain types
- Created shared status-label constants
- Implemented typed callback props

## Key Mental Models

Data:
App → CollaborationSection → CollaborationCard

Events:
CollaborationCard → callback → CollaborationSection

Selection:
View → selectedId → find() → selectedCollaboration

Closing:
Close → setSelectedId(null) → details disappear

## Important Lesson

Components receive data through props.
Child components communicate events through callback props.
State should live with the component responsible for controlling
the UI that depends on that state.

## Engineering Principle

Introduce architecture when the code gives us a reason for it.
Avoid premature abstraction and duplication.


# Detailed Notes of the day

Component responsibility

We separated responsibilities:

App
 └── owns application-level data/state


CollaborationSection
 └── manages the collaboration collection + selection


CollaborationCard
 └── renders one collaboration


CollaborationDetails
 └── renders the selected collaboration

The important principle:

A component should have a clear responsibility.

2. Parent → child data flow

Data flows downward:

App
 ↓ collaborations
CollaborationSection
 ↓ collaboration
CollaborationCard

We don't let children directly reach into their parent's data.

3. Callback props — child → parent communication

We used:

onView: (id: number) => void;

The parent passes the callback down:

onView={handleView}

The child triggers it:

onClick={() => onView(id)}

So:

Child event
   ↓
callback
   ↓
parent handler
   ↓
parent state update

This is one of the most important React patterns you've learned so far.

4. Function reference vs function invocation
Pass the function
onClick={handleView}

→ React calls it later.

Call immediately
onClick={handleView(3)}

→ function executes during render.

Pass a function that calls another function later
onClick={() => handleView(3)}

→ waits for the click.

Mental model:

handleView = give me the function
handleView() = execute the function

5. Literal / union types

We created:

type CollaborationStatus =
  | "open"
  | "looking"
  | "closed";

This means status cannot be an arbitrary string.

status: "open";      // ✅
status: "looking";   // ✅
status: "closed";    // ✅
status: "pending";   // ❌

This is an example of:

Making invalid states harder to represent.

6. Domain data vs presentation data

Our application stores:

"open"
"looking"
"closed"

But the UI displays:

"Open"
"Looking for collaborations"
"Closed"

We deliberately separated these.

Domain
"open"
   ↓
Presentation
"Open"

This prevents UI wording from becoming our underlying data model.

7. Shared types

We created:

src/
└── types/
    └── collaboration.ts

and placed the domain type there.

The principle:

Shared domain concepts should have a single source of truth.

We shouldn't duplicate CollaborationStatus in multiple components.

8. Shared constants

We then created:

src/
└── constants/
    └── collaboration.ts

for the status-label mapping.

statusLabels

is shared by the card and details components.

Again:

If multiple components need the same logic/data, don't duplicate it.

9. useState<number | null>

We encountered our first practical TypeScript generic:

useState<number | null>(null)

Meaning:

state type → number | null
initial value → null

Initially:

selectedId = null

After selecting collaboration #2:

selectedId = 2
10. find()

We used:

collabs.find((collab) => collab.id === selectedId)

Important distinction:

find()
      → gives the object


findIndex()
      → gives the object's index

We needed the object, so we used find().

11. Conditional rendering with &&

We used:

{selectedCollaboration && (
  <CollaborationDetails />
)}

Meaning:

Render the details only when a collaboration exists.

When:

selectedCollaboration = undefined

→ nothing renders.

When it contains an object:

→ details render.

12. Closing the details

We learned another state-driven UI pattern:

setSelectedId(null);

We don't manually tell React:

"Hide CollaborationDetails."

Instead:

selectedId
   ↓
selectedCollaboration
   ↓
conditional rendering

Changing the state causes the UI to change.

13. Record<>

We finished the day with:

Record<CollaborationStatus, string>

Meaning:

An object whose keys must correspond to the allowed CollaborationStatus values and whose values are strings.

So if we add:

"completed"

to CollaborationStatus, TypeScript will force us to consider adding its corresponding label.

That's a production-oriented type-safety pattern.