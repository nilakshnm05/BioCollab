# Day 04 — Dynamic Rendering, Lists & React Reconciliation


## 1. Day Objective


Today we moved from rendering individual React components to rendering
dynamic collections of reusable components.


The major goal was to understand how React handles:


- Arrays of data
- `.map()`
- Reusable components
- Props from data
- List keys
- React reconciliation
- Conditional rendering
- Empty states


The focus was not merely learning syntax, but understanding how these
concepts contribute to scalable frontend development.


---


# 2. Rendering Data Dynamically


In a real application, UI data often comes from an API.


For example:


```tsx
const collaborations = [
  {
    id: 1,
    title: "Cancer Research",
    description: "PhD in oncology required",
  },
  {
    id: 2,
    title: "Drug Discovery",
    description: "Clinical trial expert needed",
  },
  {
    id: 3,
    title: "AI Diagnostics",
    description: "AI engineer needed",
  },
];

Instead of manually writing:

<CollaborationCard />
<CollaborationCard />
<CollaborationCard />

we can transform the data into reusable React components.

3. .map() for Rendering Lists

JavaScript's .map() creates a new array by transforming every element
of an existing array.

In React, this allows us to transform:

Array of data
      ↓
Array of React elements

Example:

{collaborations.map((collab) => (
  <CollaborationCard
    id={collab.id}
    title={collab.title}
    description={collab.description}
  />
))}

If the API returns 3 objects, React receives 3 components.

If it returns 100 objects, the same rendering logic can render 100
components.

This is much more scalable than manually creating components.

4. Reusable Component Architecture

We created:

Collaboration data
       ↓
App
       ↓
CollaborationCard

App owns the data and decides how many cards need to be rendered.

CollaborationCard is responsible for presenting one collaboration.

This follows separation of responsibilities.

The parent does not need to know how the individual card is internally
structured.

The card does not need to know where its data came from.

5. Props from Mapped Data

The data from each object can be passed to the reusable component through
props.

Example:

<CollaborationCard
  id={collab.id}
  title={collab.title}
  description={collab.description}
/>

The component receives:

type CollaborationCardProps = {
  id: number;
  title: string;
  description: string;
};

Then:

function CollaborationCard({
  id,
  title,
  description,
}: CollaborationCardProps) {
  return (
    <>
      <p>{id}</p>
      <p>{title}</p>
      <p>{description}</p>
    </>
  );
}

The component is therefore reusable with any collaboration object having
the required data.

6. Why React Needs key

When React renders a list, each item needs a stable identity.

Example:

key={collab.id}

The key tells React which list item is which across renders.

Think of it as:

collaboration object
       ↓
unique stable ID
       ↓
React key
       ↓
item identity across renders

A good key is:

Unique among siblings
Stable
Associated with the actual item

An API/database ID is usually an excellent key.

7. key vs id

These are NOT the same concept.

<CollaborationCard
  key={collab.id}
  id={collab.id}
/>
key
key={collab.id}

is special React information used when React handles the list.

It is not passed to the component as an ordinary prop.

id
id={collab.id}

is a normal prop.

The component can receive and use it:

function CollaborationCard({ id }: CollaborationCardProps) {

Therefore both may contain the same value while serving different
purposes.

8. React Reconciliation

When state or data changes, a React component can render again.

React compares the new React element structure with the previous one and
determines what needs to change.

This process is called reconciliation.

Conceptually:

Previous render
      ↓
New render
      ↓
React compares them
      ↓
Uses identity information
      ↓
Determines what changed
      ↓
Updates the required UI

Keys provide identity information for items in lists.

9. Why Stable Keys Matter

Suppose the initial data is:

id=101 → Cancer
id=102 → Drugs
id=103 → AI

Later the order changes:

id=103 → AI
id=101 → Cancer
id=102 → Drugs

The items moved, but their identities did not change.

With:

key={collab.id}

React can associate each rendered item with its stable identity.

The important idea:

position ≠ identity

The array position can change.

The item's unique ID can remain stable.

10. Why Array Index Is Often a Bad Key

This is possible:

key={index}

but can cause problems when the list can be:

Reordered
Inserted into
Deleted from
Dynamically modified

Example:

Before:

index 0 → Cancer
index 1 → Drugs
index 2 → AI

After inserting Genomics at the beginning:

index 0 → Genomics
index 1 → Cancer
index 2 → Drugs
index 3 → AI

The index now represents a different item.

Therefore index is describing:

position

rather than:

item identity

For dynamic application data, prefer a stable unique identifier.

11. Never Generate Random Keys

Avoid:

key={Math.random()}

A random value can change on every render.

That destroys the stability of the item's identity.

A stable ID from the actual data is much better.

12. Conditional Rendering of Lists

We also learned that an application should handle the empty-data case.

If:

const collaborations = [];

simply calling:

collaborations.map(...)

produces no cards.

The UI can therefore become blank.

A better application explicitly handles the empty state.

13. Ternary Rendering for Empty State

We used:

{collaborations.length > 0
  ? collaborations.map((collab) => (
      <CollaborationCard
        key={collab.id}
        id={collab.id}
        title={collab.title}
        description={collab.description}
      />
    ))
  : "No Collaborations Found"}

The logic is:

Does collaborations.length > 0?
          ↓
       YES
          ↓
     render cards


       NO
        ↓
"No Collaborations Found"
14. Important JavaScript Detail — Empty Arrays Are Truthy

This is an important distinction:

Boolean([]) // true

Therefore this is NOT sufficient:

collaborations ? ... : ...

because even an empty array is truthy.

Instead we check the actual number of items:

collaborations.length > 0
15. && vs Ternary
Use &&

When something should either:

render
OR
render nothing

Example:

{isExploring && <p>Exploring collaborations...</p>}
Use a ternary

When there are two possible UI outcomes:

A OR B

Example:

{collaborations.length > 0
  ? <CollaborationList />
  : <EmptyState />}

Mental model:

&&
condition → render something OR nothing


ternary
condition → render A OR B

16. Development Philosophy Applied

Today's implementation demonstrates an important development principle:

We are separating:

Data responsibility
App

from:

Presentation responsibility
CollaborationCard

and allowing:

React

to handle:

component rendering
re-rendering
reconciliation
DOM updates

The developer describes the desired UI and state.

React handles the DOM-level work.

17. Current BioCollab Architecture

At the end of Day 4:

App
│
├── Hero
│
├── StatusPanel
│
└── CollaborationCard × N
        ↑
        │
   collaborations[]

Data flow:

collaborations[]
       ↓
      App
       ↓
     .map()
       ↓
CollaborationCard
       ↓
      props

State flow:

App owns state
       ↓
passes state / callbacks
       ↓
child components
18. Key Mental Models
.map()

Transform data into repeated UI.

Props

Pass data/configuration from parent to child.

key

Give React a stable identity for each list item.

Reconciliation

React compares renders and determines what needs to change.

Ternary

Choose between two UI outcomes.

&&

Render something only when a condition is truthy.

Empty state

Never assume that data will always exist.

19. Day 4 Interview Concepts

You should now be able to explain:

Why .map() is commonly used for rendering lists in React
What the key prop does
Why keys should be stable
Why database/API IDs are usually good keys
Why array indexes can be problematic
Why key is different from a normal prop
What React reconciliation means
Why empty arrays need explicit empty-state handling
Why an empty array cannot be checked using simple truthiness
When to use &&
When to use a ternary
How reusable components improve maintainability
20. Day 4 Implementation Checkpoint

BioCollab now demonstrates:

Component composition
Props
State ownership
Callback props
State lifting
Conditional rendering
Dynamic list rendering
.map()
Reusable components
TypeScript props
Stable list keys
Empty-state handling
Basic reconciliation mental model