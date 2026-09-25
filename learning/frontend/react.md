# React

## Mental model

React is a declarative UI library.

`state + props → UI`

A component should have a clear responsibility and predictable inputs/outputs.

## Core concepts

- components
- props
- state
- conditional rendering
- lists and keys
- controlled inputs
- derived state

## Hooks

Know the purpose and trade-offs of:

- `useState`
- `useEffect`
- `useMemo`
- `useCallback`
- `useContext`

### `useEffect`

Use effects to synchronize React with external systems.

Examples:

- subscriptions
- browser APIs
- network-side effects
- cleanup

Do not use an effect merely because some code needs to run.

## Context

BioCollab currently uses Context for domains including:

- authentication
- collaborations
- research
- AI

Use Context for shared client/domain state when appropriate. Do not automatically put all server data into Context.

## React principles

- keep components focused
- keep state local when possible
- lift state only when necessary
- avoid duplicated state
- separate UI from data access where useful
- keep data flow predictable

## Later

- error boundaries
- measured memoization
- streaming UI
- stronger server-state architecture
