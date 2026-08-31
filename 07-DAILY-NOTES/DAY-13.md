# BioCollab — Day 13 Notes

## Goal

Finish the BioCollab landing page and establish a polished, responsive marketing-page structure.

## What We Built

- Navbar
- Hero section
- Core Capabilities section
- How It Works section
- Final CTA
- Footer
- Responsive layouts across desktop and mobile
- Consistent Tailwind styling and design tokens
- Lucide icons
- Semantic HTML structure
- Reusable React components

## Component Structure

```text
LandingPage
├── Header
│   └── Navbar
├── Main
│   ├── Hero
│   ├── CoreCapabilities
│   ├── HowItWorks
│   └── FinalCTA
└── Footer
```

## React / Component Lessons

### Component boundaries

Create a separate component when a meaningful responsibility or reusable UI boundary exists. Do not extract components merely because a file becomes long.

### Semantic HTML

Use elements according to their meaning and purpose rather than using generic containers everywhere.

Examples:

- `nav` for navigation
- `main` for the primary page content
- `section` for thematic sections
- `footer` for footer content
- headings (`h1`, `h2`, etc.) for document structure

### Data-driven rendering

Use `.map()` when repeated UI is driven by an array of data.

```tsx
items.map((item) => (
  <Component key={item.id} {...item} />
))
```

The callback returns the React element for each item.

### `return` inside `.map()`

When using a block-bodied callback:

```tsx
items.map((item) => {
  return <Component />;
})
```

the `return` is required.

With an implicit-return expression:

```tsx
items.map((item) => (
  <Component />
))
```

an explicit `return` is not needed.

## Tailwind Lessons

We practiced utility classes such as:

- `w-full`
- `border`
- `border-border`
- `text-base`
- responsive prefixes such as `md:` and `lg:`
- flex and grid utilities
- spacing utilities
- typography utilities

Important observation:

A CTA can already occupy the available width because of its parent layout or its display/layout context. `w-full` is therefore not automatically necessary just because an element visually spans the width.

## Responsive Design

We checked the landing page at desktop and narrow mobile widths and adjusted layouts where necessary.

The goal was not pixel perfection at every possible width, but a layout that remains usable and coherent across responsive breakpoints.

## Engineering Checkpoint

Before committing:

```bash
npm run build
```

The production build succeeded.

Then we checked Git status, staged the intended changes, committed them, and pushed the commit.

## Day 13 Takeaway

The landing page is now a real React component hierarchy rather than one large component. The page is responsive, structured, and ready to become the entry point of the larger BioCollab application.
