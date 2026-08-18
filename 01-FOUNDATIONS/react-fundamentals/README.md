This is where our Days 1–4 learning starts becoming permanent knowledge.

# React Fundamentals


## Components


A React component is a reusable unit of UI.


Example:


```tsx
function Hero() {
  return <h1>BioCollab</h1>;
}
Props

Props allow a parent to pass data to a child.

<Hero
  title="BioCollab"
  description="Healthcare & Biotech Collaboration Platform"
/>

The child receives the values as props.

State

State represents data that can change and cause UI updates.

const [isExploring, setIsExploring] = useState(false);

Mental model:

false
 ↓
state
 ↓
setIsExploring(true)
 ↓
React re-renders
 ↓
UI changes
State Ownership

State should live in the lowest common parent that needs to
coordinate that state.

If only Hero needs the state:

Hero owns it

If Hero and StatusPanel both depend on it:

App owns it
   ↓
Hero + StatusPanel


This directly reflects what you reasoned through on Day 3.


---


## Callback Props


A parent can pass a function to a child.


```tsx
<Hero updateState={handleExplore} />

The child can invoke the function when an event occurs.

This allows:

Child event
    ↓
callback
    ↓
Parent state update
    ↓
new props
    ↓
child re-renders
Conditional Rendering
&&

Use when the alternatives are:

render something
OR
render nothing
{isExploring && <p>Exploring...</p>}
Ternary

Use when there are two UI outcomes:

{isExploring
  ? <p>Exploring</p>
  : <p>Ready</p>}
Lists

Use .map() to transform data into components.

{collaborations.map((collab) => (
  <CollaborationCard
    key={collab.id}
    id={collab.id}
    title={collab.title}
    description={collab.description}
  />
))}
Keys

A key gives React stable identity for list items.

Prefer:

key={item.id}

Avoid using array indexes for dynamic lists when a stable ID exists.

Empty State

Never assume API data exists.

items.length > 0
    ? render items
    : render empty state

Important:

Boolean([]) // true

So items ? ... : ... does not detect an empty array.