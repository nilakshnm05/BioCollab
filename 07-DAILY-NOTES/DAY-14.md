# BioCollab — Day 14 Notes

## Goal

Introduce client-side routing and convert the existing Collaboration Discovery feature into a proper application page.

The important principle was:

> Do not build duplicate or placeholder features when the project already contains the relevant implementation.

## 1. React Router

Installed:

```bash
npm install react-router-dom
```

React Router allows the React application to render different components based on the browser URL.

Mental model:

```text
Browser URL
    ↓
React Router
    ↓
Matching route
    ↓
Page component
```

## 2. BrowserRouter

`BrowserRouter` was added at the application entry point in `main.tsx`.

Conceptually:

```text
main.tsx
   ↓
BrowserRouter
   ↓
App
```

This gives the components inside the application access to React Router.

## 3. Routes and Route

`App.tsx` now uses:

```tsx
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/discover" element={<DiscoverPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

Mental model:

```text
Routes
│
├── "/"          → LandingPage
├── "/discover"  → DiscoverPage
└── "*"          → NotFoundPage
```

`Routes` acts as the route switchboard.

A `Route` defines a URL-to-component rule.

## 4. Page vs Feature Component

We already had a real Collaboration Discovery feature.

Instead of rebuilding it, we moved it behind a page boundary:

```text
/discover
    ↓
DiscoverPage
    ↓
CollaborationSection
    ├── CollaborationControls
    ├── CollaborationList
    ├── CollaborationCard
    └── CollaborationDetails
```

This creates a useful distinction:

- **Page component** — represents an application route/page.
- **Feature component** — implements a substantial product capability inside that page.

The existing Collaboration Discovery implementation already owns its discovery-specific UI state, filtering, sorting, selection, and related behavior.

## 5. Existing Collaboration Architecture

The earlier project architecture established:

```text
collaborations[]
      ↓
CollaborationSection
      ├── state
      ├── derived data
      ├── CollaborationControls
      ├── CollaborationList
      └── CollaborationDetails
```

The project notes emphasize:

- UI state belongs with the component controlling the resulting UI.
- Derived data should not become unnecessary independent state.
- Shared domain types should have a single source of truth.
- Components should be extracted around meaningful responsibilities.

These principles were preserved when introducing `DiscoverPage`.

## 6. SPA Navigation

We learned the difference between:

```tsx
<a href="/discover">
```

and:

```tsx
<Link to="/discover">
```

### Anchor

A normal internal anchor asks the browser to perform normal document navigation.

Conceptually:

```text
click
 ↓
browser navigation
 ↓
document loads again
 ↓
React application starts again
```

### Link

React Router's `Link` performs client-side navigation.

Conceptually:

```text
click
 ↓
React Router intercepts navigation
 ↓
URL changes
 ↓
matching route changes
 ↓
React renders the new page
```

No full document reload is needed for the route transition.

## 7. Internal Navigation Migration

We converted internal navigation to `Link` in:

- Navbar
- Hero
- Footer
- Final CTA

Examples:

```tsx
<Link to="/discover">Discover</Link>
```

and:

```tsx
<Link to="/research">Explore Research</Link>
```

External URLs should remain normal anchors.

Mental rule:

```text
Internal React route
        ↓
      <Link>

External destination
        ↓
      <a>
```

## 8. Wildcard / Not Found Route

When `/research` was visited before a Research route existed, the application rendered a blank page because no route matched.

We introduced:

```tsx
<Route path="*" element={<NotFoundPage />} />
```

The `*` route acts as a fallback when none of the defined routes match.

Mental model:

```text
Unknown URL
    ↓
No specific route matches
    ↓
"*"
    ↓
NotFoundPage
```

This is better than allowing an unexplained blank screen.

## 9. Current Route Architecture

```text
BrowserRouter
      │
      ▼
     App
      │
      ▼
    Routes
      │
      ├── "/" ───────────────→ LandingPage
      │
      ├── "/discover" ───────→ DiscoverPage
      │                              │
      │                              ▼
      │                     CollaborationSection
      │
      └── "*" ───────────────→ NotFoundPage
```

## 10. Research Route Decision

We deliberately did **not** create a fake Research feature.

The project already contains product-level references to research evidence, but we did not have an implemented Research feature comparable to Collaboration Discovery.

Therefore:

```text
/research
```

remains unimplemented for now and is handled by the fallback route.

This follows the project principle of introducing architecture and abstractions when the code gives us a real reason to do so, rather than creating unnecessary placeholders.

## Day 14 Core Lessons

You should now understand:

- What client-side routing is
- Why `BrowserRouter` exists
- What `Routes` does
- What a `Route` does
- How URL paths map to components
- What a wildcard `*` route does
- Why a SPA uses `Link` for internal navigation
- The difference between a page component and a feature component
- How an existing feature can be moved behind a route
- Why internal navigation should be consistent across Navbar, Hero, Footer, and CTAs

## Day 14 Architectural Progression

Before:

```text
App
└── LandingPage
```

After:

```text
App
└── Routes
    ├── "/" → LandingPage
    ├── "/discover" → DiscoverPage
    │                    └── CollaborationSection
    └── "*" → NotFoundPage
```

This is the first step toward turning BioCollab from a single landing page into a multi-page application.
