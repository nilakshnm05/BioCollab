# Day 7 — Component Extraction & State Ownership

## Built
- Extracted CollaborationFilters
- SearchInput integrated through props
- Status select integrated through props
- Clear Filters action
- Conditional Clear Filters UI
- Shared StatusFilter type

## Key Architecture

CollaborationSection owns:
- searchText
- statusFilter
- filteredCollabs
- filter actions

CollaborationFilters owns the filter UI,
but does NOT own the filter state.

## Data Flow

Parent state
→ child props
→ child event
→ callback
→ parent state update

## Derived Values

filteredCollabs is derived from:
collabs + searchText + statusFilter

hasActiveFilters is derived from:
searchText + statusFilter

Neither should be stored as independent state.

## Important TypeScript Pattern

Use literal unions when the set of valid
values is finite.

Example:
StatusFilter = "all" | "open" | "looking" | "closed"

## Architecture Lesson

Extract components based on coherent responsibility,
not merely file size.


# Detailed notes

✅ What we accomplished today
1. Extracted CollaborationFilters

We moved the filter UI out of CollaborationSection:

CollaborationSection
        │
        ▼
CollaborationFilters
   ├── SearchInput
   ├── StatusSelect
   └── Clear Filters

The parent still owns the state.

2. Strengthened the TypeScript architecture

We moved StatusFilter into the shared collaboration types because both components need it.

We also created a proper prop contract:

searchText: string;
onSearchChange: (value: string) => void;


statusFilter: StatusFilter;
onStatusChange: (value: StatusFilter) => void;


onClearFilters: () => void;
hasActiveFilters: boolean;

This gave us practice with:

Value props vs callback props.

3. Parent → child → parent data flow

You now have this pattern down:

Parent state
    ↓
props
    ↓
Child UI
    ↓
callback
    ↓
Parent state update

For example:

searchText
   ↓
SearchInput
   ↓
onChange
   ↓
setSearchText

And:

statusFilter
   ↓
select
   ↓
onStatusChange
   ↓
setStatusFilter
4. Clear Filters

We implemented:

setSearchText("");
setStatusFilter("all");

and exposed it through:

onClearFilters={handleClearFilters}

5. Derived hasActiveFilters

We didn't create another state variable.

Instead:

const hasActiveFilters =
  searchText !== "" || statusFilter !== "all";

Then passed that boolean to the child.

This reinforces our important rule:

If something can be derived from existing state, don't create another source of truth.

6. Conditional Clear Filters UI

The child now decides whether the actual button should render:

{hasActiveFilters && (
  <button onClick={onClearFilters}>
    Clear Filters
  </button>
)}

So the button:

No active filters → hidden
Active filter     → visible
Clear             → hidden again
🧠 Day 7 Core Lessons

These are the concepts I want you to retain:

State ownership

The component that controls the resulting UI should generally own the relevant state.

Props

There are two major categories we've practiced:

Data → value props
Events → callback props
Callback signatures
(value: string) => void

means:

"Give me a function that accepts a string."

Whereas:

() => void

means:

"Give me a function that accepts nothing."

Derived data
searchText
+
statusFilter
        ↓
filteredCollabs

and:

searchText
+
statusFilter
        ↓
hasActiveFilters

Neither needs to be state.

Component boundaries

We didn't extract CollaborationFilters simply because the parent became long.

We extracted it because:

Search + status + clear controls form a coherent UI responsibility.

That's the kind of architectural judgment I want you developing.