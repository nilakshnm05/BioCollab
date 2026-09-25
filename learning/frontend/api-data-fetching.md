# API Integration & Data Fetching

## Current research flow

The research feature:

1. accepts a search query
2. calls the external research API
3. handles pagination
4. transforms external data into the BioCollab `Research` model
5. displays results
6. supports saving research

## Important concepts

- request construction
- query parameters
- response parsing
- data transformation
- loading states
- error states
- cancellation
- pagination

## TanStack Query

Know:

- query keys
- query functions
- caching
- stale data
- loading/error states
- infinite queries
- pagination
- invalidation
- refetching

## Backend transition

Current:

`React → external API`

Target:

`React → BioCollab FastAPI → database/external services`

The frontend should not own business rules that belong on the backend.

## API contract

For each endpoint know:

- HTTP method
- URL
- parameters/body
- response shape
- status codes
- error shape
- authentication requirements

## Security

Never place private backend credentials or secret API keys in frontend code.
