Frontend Performance & Security

Performance

Major sources of cost:

unnecessary renders

large bundles

excessive network requests

expensive computations

large lists

excessive Context updates

Know:

code splitting

lazy loading

memoization

pagination

caching

debouncing

virtualization when needed

Measure before optimizing.

BioCollab performance targets

Later measure:

initial load

research search

workspace rendering

AI streaming responsiveness

large research/collaboration lists

Security

Understand:

XSS

CSRF

CORS

authentication

token-storage trade-offs

input validation

secret exposure

dependency risks

Critical rule

Frontend validation is not security.

Anything sent by the browser can be modified by the user.

Backend authorization and business rules are authoritative.