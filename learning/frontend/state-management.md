# State Management

## Four useful categories

### 1. Local UI state

Examples:

- modal open/closed
- search input
- selected collaboration
- mobile menu

Use component state when possible.

### 2. Shared client state

BioCollab currently uses Context for domains such as:

- authentication
- collaborations
- research
- AI

### 3. Derived state

Calculate values from existing state rather than storing duplicate state.

Examples include:

- active collaborations
- incoming requests
- recent saved research

### 4. Server state

Data owned by the backend should eventually be treated as server state.

BioCollab already uses TanStack Query for research fetching.

## Current → target architecture

Current:

`Context + in-memory data`

Target:

`FastAPI + PostgreSQL + TanStack Query`

Context should remain for genuinely client-owned shared state.

## Problems to watch

- duplicated state
- stale data
- race conditions
- unnecessary re-renders
- unclear ownership
