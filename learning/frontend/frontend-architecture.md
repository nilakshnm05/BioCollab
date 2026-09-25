Frontend Architecture

Current organization

The frontend already separates:

api/

components/

context/

data/

pages/

schemas/

types/

utils/

tests/

Preserve this separation unless a real problem justifies changing it.

Responsibility boundaries

Components

UI and UI-level interaction.

Pages

Feature/screen composition.

API

Network communication and response transformation where appropriate.

Context

Shared client/domain state.

Schemas

Runtime validation.

Types

Compile-time domain contracts.

Utils/selectors

Pure transformations and derived-state logic.

Domain thinking

As BioCollab grows, think in domains:

authentication

collaborations

research

workspace

AI

notifications

Avoid giant components and giant contexts.

Backend boundary

Target:

React → API contract → FastAPI → business logic → database

The frontend should not know database implementation details.

Maintainability questions

Before adding code ask:

Which layer owns this responsibility?

Is this state local, shared, or server-owned?

Is this logic reusable?

Can it be tested independently?

Does it duplicate existing state or logic?