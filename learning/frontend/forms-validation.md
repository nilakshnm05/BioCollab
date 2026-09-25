# Forms & Validation

## Current stack

- React Hook Form — form state and submission
- Zod — runtime validation

## Concepts

Understand:

- controlled vs uncontrolled inputs
- form state
- touched/dirty state
- submission state
- field errors
- schema validation
- cross-field validation
- server-side validation

## BioCollab

Collaboration creation and profile editing use Zod schemas.

## Validation boundary

`User input → frontend Zod → HTTP request → FastAPI/Pydantic → business validation → database`

Client validation improves UX.

It does not replace backend validation.

The backend remains authoritative for business rules and security.
