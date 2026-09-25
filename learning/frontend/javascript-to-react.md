# JavaScript → React Foundations

## JavaScript concepts used by BioCollab

- variables and scope
- functions and callbacks
- objects and arrays
- destructuring
- spread/rest syntax
- modules and imports/exports
- `map`, `filter`, `find`, `some`, `sort`
- optional chaining and nullish coalescing
- promises
- `async/await`
- `try/catch`
- immutable state updates
- event handling

## Async mental model

Frontend asynchronous flow:

`UI event → request → waiting → success/error → state update → render`

Understand:

- Promise
- `async/await`
- loading state
- error state
- cancellation
- stale results

## JavaScript → React

JavaScript provides the language.

React provides the UI model:

`state/props → render → user event → state change → render`

React does not replace JavaScript.

## Interview essentials

Be able to explain:

- reference vs value
- mutation vs immutable update
- synchronous vs asynchronous code
- Promise vs `async/await`
- `map` vs `filter` vs `find`
- why React lists need stable keys
