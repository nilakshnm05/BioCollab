# BioCollab — Day 11
## React State, Effects & Server State

---

## 1. Controlled Components

A controlled input is an input whose value is controlled by React state.

Example:

```tsx
<input
  value={value}
  onChange={(event) => {
    onChange(event.target.value);
  }}
/>
Mental model
User types
   ↓
onChange
   ↓
React state updates
   ↓
Component re-renders
   ↓
new state passed back through `value`
   ↓
input displays new value

value answers:

What should the input currently display?

onChange answers:

What should happen when the user changes the input?

2. State Ownership / Lifting State Up

SearchInput does not own searchText.

CollaborationSection owns it:

const [searchText, setSearchText] = useState("");

The data flow is:

CollaborationSection
        ↓
CollaborationControls
        ↓
SearchInput

The reason is that changing searchText affects the collaboration list.

searchText
    ↓
filteredCollabs
    ↓
sortedCollabs
    ↓
CollaborationList
    ↓
CollaborationCard
Principle

Put state in the nearest appropriate component that needs to coordinate the affected UI.

This is commonly called lifting state up.

3. Derived State / Derived Data

filteredCollabs does not need its own useState.

Instead:

const filteredCollabs = collabs.filter(...);

because it can be calculated from existing state/props.

Principle

If a value can be completely derived from existing state and props, don't create redundant state for it.

Otherwise we create multiple sources of truth that must remain synchronized.

4. Immutability

We used:

const sortedCollabs = [...filteredCollabs];

sortedCollabs.sort(...);

instead of:

filteredCollabs.sort(...);

because JavaScript's .sort() mutates the array.

The spread:

[...filteredCollabs]

creates a new array.

Mental model
Original array
     ↓
   spread
     ↓
New array
     ↓
mutate/sort the new array

The spread creates a shallow copy.

Important:

The array is new, but objects inside it are still the same object references.

5. useEffect

useEffect is used for side effects — operations that interact with something outside React's normal UI calculation.

Examples:

API requests
timers
event listeners
subscriptions
browser APIs

Basic structure:

useEffect(() => {
  // effect / setup

  return () => {
    // cleanup
  };
}, [dependencies]);
Mental model
Render
   ↓
React commits UI
   ↓
Effect runs

Do not think:

useEffect simply means "run after every render."

Its execution depends on its dependencies.

6. Dependency Array
Empty array
useEffect(() => {
  ...
}, []);

The effect has no reactive dependencies and normally runs after the initial mount.

Dependency
useEffect(() => {
  ...
}, [searchText]);

The effect depends on searchText.

When searchText changes:

searchText changes
      ↓
effect runs again

Important:

The dependency array does NOT mean "run after every render."

7. React StrictMode

Our application uses:

<React.StrictMode>
  <App />
</React.StrictMode>

We observed our effect executing twice in development.

StrictMode intentionally performs extra development behavior to help expose unsafe effects.

This does NOT mean that:

useEffect(..., [])

normally executes twice in production.

8. Cleanup

Cleanup is the teardown of something that the effect previously set up.

Mental model
Effect
  ↓
Setup / start something
  ↓
dependency changes
  ↓
Cleanup previous effect
  ↓
New effect

Cleanup also runs when the component unmounts.

Examples:

setInterval
    ↓
clearInterval
addEventListener
    ↓
removeEventListener
subscribe
    ↓
unsubscribe
fetch
    ↓
potentially abort
Important

Cleanup is NOT required simply because something is asynchronous.

The better question is:

Did the effect start/register something that needs to be stopped or undone?

9. API Requests & Race Conditions

When an effect depends on something that triggers an API request:

searchText = "ai"
       ↓
Request A

Then the user changes it:

searchText = "ai d"
       ↓
Request B

The requests may finish in a different order:

Request A ─────────────────────→ finishes later

Request B ─────────────→ finishes first

The old request could then overwrite the newer result.

This is a race condition.

Cleanup can help

Conceptually:

Request A starts
      ↓
dependency changes
      ↓
cleanup
      ↓
abort/cancel A
      ↓
Request B starts
Key idea

Cleanup can prevent obsolete asynchronous work from interfering with the newer effect.

10. Client State vs Derived Data vs Server State
Client/UI state

State owned by the React application.

Examples:

searchText
statusFilter
sortOrder
selectedId
isModalOpen

React is the source of truth.

Derived data

Calculated from existing state/props.

Examples:

filteredCollabs
sortedCollabs

No separate source of truth is needed.

Server state

Data whose source of truth exists outside the React application.

Examples:

collaborations from backend
user profile
AI conversation history

The backend/database is the source of truth.

React only holds a representation of that data.

11. Server-State Concepts
Caching

Keeping previously fetched data so it can potentially be reused.

Fetch data
   ↓
Store/cache it
   ↓
Reuse later

Mental model:

Keep a copy so I don't have to request it unnecessarily.

Refetching

Requesting the data from the server again.

Existing data
    ↓
Ask server again
    ↓
Latest data

Mental model:

Go ask the server again.

Stale Data

Data that we have but no longer consider sufficiently fresh.

Important:

stale ≠ invalid

Stale simply means:

This data may no longer represent the current server state.

Synchronization

Keeping the application's representation of server data reasonably aligned with the actual server data.

Server changes
     ↓
refetch / update
     ↓
React gets new data
     ↓
UI updates

Mental model:

Keep my local representation aligned with the source of truth.

12. Why TanStack Query Exists

React can fetch data using:

useState
+
useEffect
+
fetch

But as an application grows, we repeatedly have to manage:

loading
error
data
caching
stale data
refetching
race conditions
synchronization

Doing this separately across many components creates:

repeated code
maintainability problems
duplicated loading/error handling
duplicated server data
synchronization problems

TanStack Query is designed specifically around server-state management.

It does NOT replace React state.

useState
   ↓
UI/client state

TanStack Query
   ↓
server state
13. BioCollab Architecture — Current

Current architecture:

                    App
                     │
             mock collaborations
                     │
                     ↓
        CollaborationSection
              │       │
          UI state   derived data
              │       │
              └───┬───┘
                  ↓
       CollaborationControls
                  ↓
             SearchInput

        CollaborationList
                  ↓
        CollaborationCard

App currently owns the mock collaboration dataset.

CollaborationSection owns Discovery-specific UI state and filtering/sorting.

CollaborationList and CollaborationCard primarily render the data they receive.

14. Today's Core Mental Model

The important progression from today:

Controlled Input
       ↓
State Ownership
       ↓
Derived Data
       ↓
Immutability
       ↓
useEffect
       ↓
Dependencies
       ↓
Cleanup
       ↓
Async Work
       ↓
Race Conditions
       ↓
Server State
       ↓
TanStack Query

The important distinction:

UI state
   ≠
Derived data
   ≠
Server state
