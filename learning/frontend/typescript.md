# TypeScript

## Why BioCollab uses TypeScript

TypeScript makes the frontend domain model explicit and catches many mistakes before runtime.

Current domain concepts include:

- `Collaboration`
- `CollaborationRequest`
- `Member`
- `Research`
- `SavedResearch`
- `WorkspaceView`

## Core concepts

- primitive types
- arrays
- object types
- type aliases
- interfaces
- union types
- optional properties
- nullable values
- function parameter/return types
- generics
- type narrowing
- utility types
- type inference

## Union types

Use unions when a value has a finite set of valid states.

Example:

`"pending" | "accepted" | "rejected"`

## TypeScript vs runtime validation

TypeScript provides compile-time safety.

Zod provides runtime validation.

Both are useful.

## Backend transition

When FastAPI becomes the source of truth, frontend types should represent API contracts rather than independently inventing incompatible models.
