# BioCollab --- TanStack Query Notes

## September 7, 2026

## Goal

Integrate TanStack Query into the existing BioCollab Research flow
without replacing the existing OpenAlex API layer.

> TanStack Query manages server state; the existing API service remains
> responsible for communicating with OpenAlex and transforming the
> response into BioCollab domain data.

------------------------------------------------------------------------

## 1. Server State vs Client State

### Client state

-   `query` --- current draft in the search input
-   `hasSearched` --- whether the user has performed a search
-   `searchedQuery` --- committed search term

### Server state

-   research results
-   loading state
-   error state
-   cached server data

Mental model:

``` text
CLIENT STATE
├── query
├── hasSearched
└── searchedQuery

SERVER STATE
├── research
├── loading
└── error
```

`isLoading` and `error` are lifecycle metadata about server state;
`research` is the actual server data.

------------------------------------------------------------------------

## 2. What TanStack Query Does

TanStack Query is a **server-state management layer**.

It does not replace `fetch()` or `src/api/research.ts`.

Architecture:

``` text
ResearchPage
    ↓
TanStack Query
    ↓
fetchResearch()
    ↓
OpenAlex API
    ↓
transformResearch()
    ↓
Research[]
```

### API service

`fetchResearch()` continues to: - communicate with OpenAlex - make the
API request - transform the OpenAlex response - return BioCollab
`Research` objects

### TanStack Query

Manages: - fetching lifecycle - caching - loading/error state -
pagination - refetching/synchronization

### ResearchPage

Manages: - user interaction - search input - committed search term -
rendering/UI states

------------------------------------------------------------------------

## 3. QueryClient and Provider

Installed:

``` bash
npm install @tanstack/react-query
```

Created one QueryClient at the application root:

``` tsx
const queryClient = new QueryClient();
```

Provider structure:

``` text
React.StrictMode
└── QueryClientProvider
    └── BrowserRouter
        └── App
```

Mental model:

> `QueryClientProvider` gives components access to the application's
> QueryClient.

The QueryClient is the central manager for the TanStack Query cache and
server-state behavior.

------------------------------------------------------------------------

## 4. Query Keys

A query key identifies the server data.

Research uses:

``` tsx
["research", searchedQuery]
```

Examples:

``` tsx
["research", "cancer"]
["research", "diabetes"]
```

These represent different server data and therefore different cache
entries.

### Rule

> If changing a value can change the server response, that value belongs
> in the query key.

------------------------------------------------------------------------

## 5. `query` vs `searchedQuery`

``` text
query
    ↓
draft/current input

searchedQuery
    ↓
committed search
```

We don't want the draft input to directly control the query.

Instead:

``` text
User types
    ↓
query = "cancer"

User clicks Search
    ↓
searchedQuery = "cancer"

Query key
    ↓
["research", "cancer"]
```

This preserves explicit Search behavior.

------------------------------------------------------------------------

## 6. Why `useInfiniteQuery`

The Research page already uses a **Load More** pagination UX.

With ordinary `useQuery`, page could become part of the query identity:

``` text
["research", "cancer", 1]
["research", "cancer", 2]
["research", "cancer", 3]
```

That treats pages as separate query results.

With `useInfiniteQuery`:

``` text
["research", "cancer"]
       │
       ├── page 1
       ├── page 2
       └── page 3
```

One query represents the whole search, while pages are stored inside
that query.

------------------------------------------------------------------------

## 7. `enabled`

Implemented:

``` tsx
enabled: searchedQuery.trim() !== ""
```

`enabled` is a permission switch.

Initially:

``` text
searchedQuery = ""
        ↓
enabled = false
```

After a search:

``` text
searchedQuery = "cancer"
        ↓
enabled = true
```

Therefore the query doesn't run before the user has searched.

> `enabled` means whether the query is allowed to execute. It does not
> mean whether data exists.

------------------------------------------------------------------------

## 8. `initialPageParam`

Implemented:

``` tsx
initialPageParam: 1
```

This tells `useInfiniteQuery` that the first page parameter is `1`.

``` text
initialPageParam = 1
        ↓
pageParam = 1
        ↓
fetchResearch("cancer", 1)
```

------------------------------------------------------------------------

## 9. `pageParam`

Query function:

``` tsx
queryFn: ({ pageParam }) =>
  fetchResearch(searchedQuery, pageParam)
```

Instead of React state controlling the page, TanStack Query supplies the
current `pageParam`.

``` text
pageParam = 1
    ↓
fetchResearch("cancer", 1)

pageParam = 2
    ↓
fetchResearch("cancer", 2)

pageParam = 3
    ↓
fetchResearch("cancer", 3)
```

------------------------------------------------------------------------

## 10. `getNextPageParam`

Implemented:

``` tsx
getNextPageParam: (lastPage, _allPages, lastPageParam) => {
  if (lastPage.length < 10) {
    return undefined;
  }

  return lastPageParam + 1;
},
```

Parameters:

``` text
lastPage
    ↓
the page just received

_allPages
    ↓
all pages received so far
(not needed by our current logic)

lastPageParam
    ↓
the page number just fetched
```

The underscore in `_allPages` is an unused-parameter naming convention.
It does not change the value or behavior.

### Pagination

If the page contains 10 results:

``` text
lastPage.length = 10
        ↓
return next page number
```

If it contains fewer than 10:

``` text
lastPage.length < 10
        ↓
return undefined
```

`undefined` means there is no next page.

------------------------------------------------------------------------

## 11. `data.pages` and `.flat()`

`useInfiniteQuery` stores pages like:

``` text
data.pages
    ↓
[
  Research[],   ← page 1
  Research[],   ← page 2
  Research[]    ← page 3
]
```

The UI needs one `Research[]`.

Implemented:

``` tsx
const research = data?.pages.flat() ?? [];
```

So:

``` text
data.pages
    ↓
.flat()
    ↓
Research[]
    ↓
research.map(...)
```

`?? []` makes the result safely become an empty array before data
exists.

------------------------------------------------------------------------

## 12. `fetchNextPage`

The old manual Load More logic calculated the page, fetched it, appended
results, updated state, and checked for more data.

Now:

``` tsx
async function handleLoadMore() {
  await fetchNextPage();
}
```

Flow:

``` text
Load More
    ↓
fetchNextPage()
    ↓
getNextPageParam()
    ↓
next pageParam
    ↓
fetchResearch()
    ↓
new page added to data.pages
    ↓
data.pages.flat()
    ↓
all results displayed
```

No manual append is required.

------------------------------------------------------------------------

## 13. `hasNextPage`

TanStack Query provides:

``` tsx
hasNextPage
```

It is derived from `getNextPageParam`.

If a next page parameter exists:

``` text
hasNextPage = true
```

If `getNextPageParam` returns `undefined`:

``` text
hasNextPage = false
```

The button uses:

``` tsx
{hasNextPage && (
  <button>Load more</button>
)}
```

This replaces the old manual `hasMore` state.

------------------------------------------------------------------------

## 14. Two Loading States

### Initial search

``` tsx
isLoading
```

Represents the initial query loading.

### Loading another page

``` tsx
isFetchingNextPage
```

Represents an additional page loading.

The Load More button uses:

``` tsx
disabled={isFetchingNextPage}
```

and:

``` tsx
{isFetchingNextPage ? "Loading..." : "Load more"}
```

This keeps existing results visible while another page loads.

------------------------------------------------------------------------

## 15. Manual Server-State Management Removed

Before:

``` text
research
isLoading
error
page
hasMore
```

The page manually performed: - fetch - loading state - error state -
append - pagination - next-page detection

After:

``` text
TanStack Query
├── research data
├── loading state
├── error state
├── cached pages
├── page progression
└── next-page availability
```

Remaining client state:

``` text
query
hasSearched
searchedQuery
```

------------------------------------------------------------------------

## 16. Error Handling

TanStack Query provides:

``` tsx
error
```

The UI uses:

``` tsx
{error && (
  <p className="text-sm text-destructive">
    {error.message}
  </p>
)}
```

Flow:

``` text
fetchResearch()
      ↓
throws Error
      ↓
TanStack Query catches it
      ↓
error
      ↓
error.message
      ↓
UI
```

------------------------------------------------------------------------

## 17. Final Research Architecture

``` text
ResearchPage
│
├── Client State
│   ├── query
│   ├── hasSearched
│   └── searchedQuery
│
└── useInfiniteQuery
    │
    ├── queryKey
    │     └── ["research", searchedQuery]
    │
    ├── queryFn
    │     └── fetchResearch(searchedQuery, pageParam)
    │
    ├── initialPageParam
    │     └── 1
    │
    ├── getNextPageParam
    │
    ├── fetchNextPage
    │
    ├── hasNextPage
    │
    ├── isLoading
    │
    ├── isFetchingNextPage
    │
    └── data.pages
          ↓
        .flat()
          ↓
      Research[]
          ↓
      ResearchCard
```

------------------------------------------------------------------------

## 18. What We Deliberately Did NOT Change

Preserved: - OpenAlex API integration - `fetchResearch()` - OpenAlex
response types - response transformation - BioCollab `Research` domain
type - `ResearchCard` - `ResearchSearch` - existing Search → Results →
Load More UX

We did not: - rebuild the Research feature - create a fake backend - add
Redux just to check a box - add Zustand without a real shared-state
problem - replace the API service with TanStack Query - make debounce
trigger automatic searches - add unnecessary abstractions

------------------------------------------------------------------------

## 19. Cache Mental Model

For Cancer:

``` tsx
["research", "cancer"]
```

This is one query/cache identity.

It can contain:

``` text
["research", "cancer"]
       │
       ├── page 1
       └── page 2
```

When returning to Cancer, TanStack Query recognizes the same query key.

### Core distinction

``` text
queryKey
    ↓
"What data is this?"

queryFn
    ↓
"How do I get it?"

pageParam
    ↓
"Which page am I getting?"

getNextPageParam
    ↓
"What's the next page?"
```

For infinite queries:

> One query key → multiple pages → `data.pages` → `.flat()` → data for
> the UI.

------------------------------------------------------------------------

## 20. Practical Tests Passed

1.  Initial Research page loads without an API request.
2.  Search returns research results.
3.  Load More loads another page while preserving previous results.
4.  Returning to a previous search uses the same query identity/cache.

------------------------------------------------------------------------

## Final takeaway

> TanStack Query did not replace the Research architecture. It took over
> the server-state lifecycle inside the architecture we already built.
