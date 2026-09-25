# Routing & Frontend Workflows

## React Router

Know:

- routes
- navigation
- route parameters
- query parameters
- redirects
- protected routes

## Protected routes

Basic flow:

`route request → authentication check → render or redirect`

## Query parameters

BioCollab uses a collaboration ID in the login/get-started workflow so an unauthenticated user can continue an action after authentication.

## Workflow thinking

A feature is not complete when one button works.

Trace:

`entry point → action → authentication requirement → redirect → state change → destination → feedback`

BioCollab workflows include:

- collaboration discovery
- express interest
- login/register
- workspace
- research saving
- AI assistant

## Rule

When backend integration changes, test the complete user workflow rather than only the changed component.
