# BioCollab --- Post Day 14 Notes

## Goal

Build the Research Discovery feature as the first substantial API-driven
React feature in BioCollab, while using it to learn real frontend
engineering concepts that will transfer to the Workspace/Dashboard and
later full-stack work.

> Build enough real functionality to learn the underlying engineering
> concepts, but stop before feature creep steals time from the larger
> BioCollab roadmap.

## 1. Research Feature Architecture

``` text
/research
    ↓
ResearchPage
    ├── ResearchSearch
    ├── ResearchCard[]
    └── OpenAlex API
```

The feature is split around meaningful responsibilities:

``` text
ResearchPage
    ↓
owns page-level state + search behavior
    ↓
ResearchSearch
    ↓
owns search UI
```

and:

``` text
ResearchPage
    ↓
ResearchCard
    ↓
renders one Research object
```

### Core lesson

A component should be extracted because it has a meaningful
responsibility, not simply because a file is getting long.

## 2. External API Integration --- OpenAlex

The API flow is:

``` text
React
  ↓
fetchResearch(query, page)
  ↓
OpenAlex
  ↓
raw API response
  ↓
JSON
  ↓
transformResearch()
  ↓
Research[]
```

The React page does not need to know the raw OpenAlex response shape.

## 3. API Types vs Application Types

We maintain two models.

### OpenAlexWork

Represents the external API structure:

``` text
id
title
publication_date
cited_by_count
authorships
primary_location
open_access
primary_topic
abstract_inverted_index
```

### Research

Represents what the application wants:

``` ts
type Research = {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  publicationDate: string;
  citedByCount: number;
  doi: string | null;
  abstract: string | null;
  researchArea: string | null;
  openAccess: boolean;
};
```

### Mental model

``` text
External API model
        ↓
transform
        ↓
Application/domain model
        ↓
React UI
```

This protects the UI from being tightly coupled to an external API.

## 4. Data Transformation

`transformResearch()` converts an `OpenAlexWork` into `Research`.

Examples:

``` text
publication_date → publicationDate
cited_by_count   → citedByCount
authorships[]    → authors[]
primary_location.source.display_name → journal
```

### Lesson

External APIs do not always provide data in the format the UI wants. The
API layer may need to normalize external data.

## 5. Reconstructing the Abstract

OpenAlex can provide an abstract as an inverted index.

We reconstruct it by:

``` text
abstract_inverted_index
        ↓
collect words + positions
        ↓
sort by position
        ↓
join words
        ↓
normal abstract string
```

### Lesson

Real APIs can provide awkward data structures that must be transformed
before UI consumption.

## 6. API Error Handling

We encountered:

``` text
HTTP 429 — Too Many Requests
```

The important debugging distinction was:

``` text
Request failed
    ↓
not necessarily a React rendering problem
```

We added a `response.ok` check so failed HTTP responses become explicit
errors.

### Mental model

``` text
fetch()
 ↓
check response.ok
 ↓
failure → throw
 ↓
success → JSON
 ↓
transform
```

## 7. API Keys and Rate Limits

The OpenAlex API key is supplied through the Vite environment variable:

``` text
VITE_OPENALEX_API_KEY
```

### Security lesson

A `VITE_*` variable is available to the browser bundle and therefore
should not be treated as a genuinely secret production credential.

For the learning-stage frontend this is acceptable as a temporary
arrangement.

A production architecture should be:

``` text
React frontend
      ↓
BioCollab backend
      ↓
OpenAlex
```

with server-side ownership of credentials that must remain secret.

## 8. Query Parameters and URL Encoding

User-provided queries are encoded before being inserted into the URL:

``` ts
const encodedQuery = encodeURIComponent(query);
```

### Mental model

``` text
User input
    ↓
encodeURIComponent()
    ↓
safe URL parameter
    ↓
API request
```

Only the query value is encoded, not the whole URL.

## 9. Controlled Input

`ResearchSearch` uses a controlled input.

``` tsx
value={query}
onChange={(e) => onQueryChange(e.target.value)}
```

### Mental model

``` text
User types
    ↓
onChange
    ↓
setQuery()
    ↓
React state
    ↓
input value
```

React owns the current value.

## 10. Lifting State

`ResearchPage` owns the query state and passes it into `ResearchSearch`
through props and callbacks.

``` text
ResearchPage
   │
   ├── query
   └── setQuery
        ↓
ResearchSearch
```

### Lesson

Keep state in the closest common component that needs to coordinate it.

## 11. Search Flow

``` text
User types
    ↓
query
    ↓
Search button / Enter
    ↓
handleSearch()
    ↓
trim query
    ↓
fetchResearch(trimmedQuery, 1)
    ↓
setResearch(data)
```

The feature supports:

-   Search button
-   Enter key
-   Suggestion buttons

Empty/whitespace-only searches are rejected.

## 12. Draft Query vs Active Query

This became an important state-modeling lesson.

### `query`

What the user is currently typing.

### `searchedQuery`

The query represented by the currently displayed results.

Example:

``` text
query         = "diabetes"
searchedQuery = "psoriasis"
research      = psoriasis results
```

This can occur when the user edits the input after a search without
submitting the new query.

### Why it matters

Pagination must use the query associated with the displayed results.

Otherwise:

``` text
Displayed results = psoriasis
Input = diabetes
Load more
    ↓
request diabetes page 2
```

would corrupt the result list.

### Lesson

State variables should represent distinct concepts.

## 13. Loading, Error, Empty and Success States

The Research page is not simply `data.map()`.

It handles:

``` text
Initial
  ↓
Loading
  ↓
Success
  ├── results
  └── empty

or

Error
```

### Lesson

API-driven UI is effectively a state machine.

A real frontend needs to represent what is happening while data is
unavailable, loading, empty, successful, or failed.

## 14. Pagination

The API function accepts:

``` ts
fetchResearch(query, page)
```

The page tracks:

``` text
page
hasMore
```

Load More works as:

``` text
current page
    ↓
nextPage = page + 1
    ↓
fetchResearch(active query, nextPage)
    ↓
new results
    ↓
append
```

The append uses the functional state-update pattern:

``` ts
setResearch(previous => [...previous, ...data]);
```

### Search vs Load More

Search replaces:

``` text
page 1 → setResearch(data)
```

Load More appends:

``` text
existing results + new page → combined array
```

## 15. `.map()` and Rendering UI

The underlying research data is an array:

``` text
[
  research1,
  research2,
  research3
]
```

Mapping it produces React elements:

``` text
[
  <ResearchCard />,
  <ResearchCard />,
  <ResearchCard />
]
```

React renders those elements.

### Lesson

`map()` is transforming a data collection into a collection of UI
elements.

## 16. Keys in Lists

Research cards use:

``` tsx
key={item.id}
```

The stable ID from OpenAlex is preserved in the application `Research`
object.

### Lesson

Use stable identifiers for real entities instead of relying on array
indexes when possible.

## 17. Author Rendering and `map()` Index

We used the second `.map()` callback argument:

``` ts
(item, index)
```

to render separators only after the first author:

``` text
index = 0 → no separator
index = 1 → separator + author
index = 2 → separator + author
```

### Lesson

Do not use `.map()` merely for abstraction. Use it when there is a
collection to iterate over.

## 18. Debouncing

We implemented a 500ms debounce:

``` text
query changes
    ↓
start 500ms timer
    ↓
query changes again?
    ↓
clear old timer
    ↓
start new timer
```

After the query remains unchanged for 500ms:

``` text
query
  ↓
500ms inactivity
  ↓
debouncedQuery
```

### Slow typing

If the user pauses longer than 500ms between changes, multiple debounced
values can appear.

### Fast typing

If the user types faster than 500ms, previous timers are repeatedly
cancelled and only the final value survives after the pause.

### Lesson

Debouncing means waiting until activity stops for a specified period
before performing a delayed action.

## 19. `useEffect` Cleanup

The debounce taught the cleanup pattern:

``` tsx
useEffect(() => {
  const timer = setTimeout(...);

  return () => {
    clearTimeout(timer);
  };
}, [query]);
```

### Mental model

``` text
Effect runs
    ↓
timer created
    ↓
dependency changes
    ↓
cleanup runs
    ↓
old timer cleared
    ↓
new effect runs
```

## 20. `query` vs `debouncedQuery`

A precise distinction:

``` text
query
    ↓
live input value
```

versus:

``` text
debouncedQuery
    ↓
latest query value that remained unchanged for 500ms
```

`debouncedQuery` is normally not a modified/refined value. It is the
same value, just delayed.

## 21. Why Debounce Was Not Connected to OpenAlex Search

We deliberately did not turn the main search into:

``` text
query
 ↓
debouncedQuery
 ↓
OpenAlex
```

The current product model is:

``` text
User types
    ↓
query
    ↓
Search button / Enter
    ↓
API request
```

This already prevents an API request for every keystroke.

Therefore forcing debounce into the main search would add complexity
without enough product value.

Potential future uses include autocomplete, collaborator lookup, or
AI-related suggestions.

## 22. Derived UI State

We avoided unnecessary state when a UI decision can be derived from
existing state.

For example:

``` ts
query.trim() === ""
```

can determine whether Search should be disabled.

### Lesson

``` text
existing state
    ↓
derived condition
    ↓
UI behavior
```

No extra boolean state is needed.

## 23. Research Card Design

The ResearchCard displays:

``` text
Research Area
Title
Authors
Journal
Publication Date
Citation Count

Abstract

View Paper
Open Access
```

The abstract is clamped to three lines so a single result does not
dominate the page.

### UI lesson

Result lists should remain scannable rather than dumping unlimited API
content into every card.

## 24. Design Tokens

We corrected styling to use BioCollab's existing semantic design tokens
rather than arbitrary Tailwind colors.

Examples:

``` text
bg-background
text-foreground
text-muted-foreground
border-border
bg-primary
text-primary-foreground
bg-accent
```

### Lesson

Before introducing an arbitrary visual value, check whether the design
system already provides a semantic token.

## 25. Responsive Design

We tested the Research page at approximately:

``` text
376px
320px
```

The layout remained usable without unnecessary mobile-specific CSS.

Important techniques included:

``` text
max-w-7xl
px-6
flex-wrap
gap-x
gap-y
line-clamp
```

### Lesson

Good responsive behavior often comes from flexible layout primitives
rather than many media queries.

## 26. Research Page State Model

``` text
query
    ↓
current input

searchedQuery
    ↓
active search represented by results

debouncedQuery
    ↓
latest input after 500ms inactivity

research
    ↓
displayed research results

page
    ↓
current pagination page

hasMore
    ↓
whether another page should be offered

isLoading
    ↓
whether a request is active

error
    ↓
current request error

hasSearched
    ↓
whether the user has performed a search
```

This is one of the most important lessons:

> State variables should have clear, distinct meanings.

## 27. Mistakes and Debugging Lessons

### Mistake 1 --- Calling `.json()` twice

We initially treated `fetchResearch(query)` as if it returned a browser
`Response`.

But `fetchResearch()` already parses JSON and transforms the data.

Therefore it returns:

``` ts
Promise<Research[]>
```

not:

``` ts
Promise<Response>
```

### Lesson

Know what abstraction a function returns before applying another
transformation.

### Mistake 2 --- Misunderstanding the 429

Cards were not rendering because the API request had failed.

The problem was:

``` text
429 Too Many Requests
```

not React's `.map()` or card rendering.

### Lesson

Trace API-driven UI systematically:

``` text
Request
 ↓
Response
 ↓
Data
 ↓
State
 ↓
Render
```

Find the first point where reality differs from expectation.

### Mistake 3 --- Confusing `query` and active search

Using the current input value for pagination could load page 2 for a
different query than the results currently displayed.

### Lesson

A draft value and active value can represent different concepts.

### Mistake 4 --- Overusing `.map()`

We considered mapping simple metadata only to create separators and
rejected unnecessary abstraction.

### Lesson

Use iteration when you have a collection to iterate over, not simply
because `.map()` is available.

## 28. What We Deliberately Did NOT Build

Research was intentionally bounded.

We did not add:

-   advanced filtering
-   sorting
-   favorites
-   saved papers
-   autocomplete API
-   infinite scroll
-   complex modals
-   unnecessary global state
-   Redux/Zustand
-   TanStack Query
-   elaborate animations

### Why?

The objective was to extract maximum learning value from a real feature
and then move to the next major BioCollab area.

## 29. Research Feature Completion Criteria

``` text
✓ OpenAlex integration
✓ API → application data transformation
✓ TypeScript API/domain types
✓ Research cards
✓ Controlled search input
✓ Search button
✓ Enter-to-search
✓ Suggestion searches
✓ Loading state
✓ Error state
✓ Empty state
✓ Pagination / Load More
✓ Active query handling
✓ Debounce mechanism
✓ Result count
✓ Empty-query protection
✓ URL encoding
✓ Responsive layout
✓ Design tokens
```

At this point, further Research work has diminishing learning value
compared with Workspace/Dashboard.

## 30. Why Research Matters for the Next Four Months

Research establishes the frontend foundation needed for later work:

``` text
React
 ↓
state
 ↓
effects
 ↓
async data
 ↓
API integration
 ↓
TypeScript
 ↓
component architecture
 ↓
UX states
 ↓
pagination
 ↓
debouncing
```

These concepts transfer into:

``` text
Workspace
Dashboard
AI UI
Backend integration
Full-stack application
```

## 31. Next BioCollab Direction

Research should now be sealed.

The next major frontend area is:

``` text
Workspace / Dashboard
```

This should deliberately introduce new concepts instead of repeating
Research.

Potential learning areas:

``` text
Nested component composition
Reusable UI primitives
Tabs / views
Richer local state
Forms
Modals / drawers
Derived state
Reusable hooks
Context where justified
Responsive dashboard layouts
AI interaction UI/UX
```

The AI-specific UI should eventually introduce patterns such as:

``` text
User input
    ↓
AI processing state
    ↓
progressive / streaming response
    ↓
structured AI output
    ↓
sources / citations
    ↓
user actions
    ↓
refinement / follow-up
```

## 32. Day 14 → Research Architectural Progression

Before Day 14:

``` text
App
└── LandingPage
```

Day 14:

``` text
App
└── Routes
    ├── "/" → LandingPage
    ├── "/discover" → DiscoverPage
    │                    └── CollaborationSection
    └── "*" → NotFoundPage
```

After Research:

``` text
App
└── Routes
    ├── "/" → LandingPage
    ├── "/discover" → DiscoverPage
    │                    └── CollaborationSection
    ├── "/research" → ResearchPage
    │                    ├── ResearchSearch
    │                    ├── ResearchCard[]
    │                    └── OpenAlex API
    └── "*" → NotFoundPage
```

This represents a major progression:

``` text
Static UI
    ↓
Multi-page SPA
    ↓
Feature components
    ↓
External API integration
    ↓
Typed asynchronous data
    ↓
Interactive data-driven UI
```

# Post Day 14 Core Lessons

You should now understand:

-   External API integration in React
-   API types vs application/domain types
-   Data transformation and normalization
-   Controlled inputs
-   Lifting state
-   Props and callbacks
-   Async operations and React state
-   Loading/error/empty/success states
-   Pagination and functional state updates
-   Draft query vs active query
-   `useEffect` cleanup
-   Debouncing
-   URL encoding
-   HTTP errors and rate limiting
-   Systematic API debugging
-   `.map()` for rendering collections
-   Stable React keys
-   Design tokens
-   Responsive layout
-   State modeling
-   Deliberate feature scoping

# Strategic Lesson

The biggest lesson from Research is not any single React hook.

It is learning to reason about a feature as a system:

``` text
User interaction
      ↓
State
      ↓
Event handler
      ↓
API request
      ↓
External data
      ↓
Transformation
      ↓
Application state
      ↓
Conditional UI
      ↓
Rendered components
```

That mental model will become increasingly important as BioCollab moves
from frontend-only development toward backend integration and AI-powered
functionality.
