. What we built today
React state

We added:

const [searchText, setSearchText] = useState<string>("");

and:

const [statusFilter, setStatusFilter] =
  useState<StatusFilter>("all");
Controlled component

SearchInput now receives:

value: string;
onChange: (value: string) => void;

and translates the browser event:

event
 ↓
event.target.value
 ↓
parent callback
 ↓
setSearchText()
Derived data

We deliberately didn't create state for filtered collaborations.

Instead:

collabs + searchText + statusFilter
             ↓
       filteredCollabs

This reinforced:

Don't store data that can be reliably derived from existing state/props.

Search

We implemented:

case-insensitive matching
user-input trimming
filter()
includes()
Status filtering

We introduced:

type StatusFilter = "all" | CollaborationStatus;

giving us:

all
open
looking
closed

Then combined the filters:

title matches search
        AND
(
  statusFilter === "all"
  OR
  collab.status === statusFilter
)
UI states

We separated:

No collaborations exist
        ≠
No collaborations match filters
        ≠
Matching collaborations exist

That is an important production-UX principle.

2. Day 6 mental models

These are the things I want you to actually remember:

State ownership

Put state in the component that needs to control the UI affected by that state.

Controlled inputs

Parent owns the value; input reports changes through a callback.

Derived data

Source state/props → calculation → derived value → UI.

Filtering

Filtering changes the view, not the underlying source data.

Componentization

Don't extract components simply because a file is getting long. Extract when there is a coherent responsibility worth separating.

3. Permanent project notes

These belong in your BioCollab engineering notes, not just today's diary:

## State & Derived Data


Store the minimum state required to represent the UI.


If a value can be deterministically calculated from existing
state/props, derive it instead of storing another source of truth.


Example:
collabs + selectedId → selectedCollaboration
collabs + searchText + statusFilter → filteredCollabs


## Filtering


Filtering produces a new view of source data.
It should not mutate or replace the original API data.


## Controlled Inputs


The parent owns the state.


The child receives:
- value
- callback for changes


The child handles browser events and communicates meaningful
values back to the parent.


## UI States


Different application states should communicate different meanings:
- no data
- no search/filter matches
- successful results


## Component Architecture


Do not split components merely because a file is becoming large.
Extract when a distinct responsibility forms a meaningful boundary.
4. 07 Daily Notes — Day 6

Keep today's diary shorter:

# Day 6 — Search, Filtering & Derived Data


## Built
- Controlled SearchInput
- Search state
- Case-insensitive search
- Search empty state
- Status filter
- Combined search + status filtering
- Filter empty state


## Concepts
- Controlled components
- Browser input events
- event.target.value
- filter()
- includes()
- Derived data
- Multiple filter criteria
- Literal union types
- Type assertion
- UI state ownership
- Component responsibility


## Key Lesson


collabs = source data


searchText + statusFilter = UI state


filteredCollabs = derived data


Do not create state for filteredCollabs.


## Architecture Decision


Keep filtering logic inside CollaborationSection for now.
Extract a CollaborationFilters component only when the filter
UI becomes substantial enough to justify the boundary.
5. Day 6 testing checklist

Before we commit, test these:

□ Empty search → all collaborations
□ Search "drug" → Drug Discovery
□ Search "cancer" → Cancer Research
□ Search nonsense → no-match message
□ Status All → all matching search results
□ Status Open → only open collaborations
□ Status Looking → only looking collaborations
□ Status Closed → only closed collaborations
□ Search + status combination works
□ Clearing search restores results
□ Changing status updates results
□ View still works
□ Close still works
□ No TypeScript errors