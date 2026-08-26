1. Component architecture

We established a cleaner page architecture:

App
└── LandingPage
    ├── Header
    │   └── Navbar
    │
    └── Main
        ├── Hero
        │   └── ProductPreview
        │
        └── CoreCapabilities
Principle

A component should have a clear responsibility.

For example:

LandingPage → page composition
Header → header region
Navbar → navigation
Main → primary page content
Hero → hero section
ProductPreview → product demonstration
CoreCapabilities → capabilities section

We deliberately didn't extract every small piece into its own component.

Don't create components merely to make files smaller. Extract when there is a meaningful responsibility, reuse, complexity, or independent behavior.

2. Semantic HTML

We used:

<header>
<nav>
<main>
<section>

instead of making everything a <div>.

Important distinction

<div>:

Generic container.

<section>:

Meaningful section of related content.

<nav>:

Navigation links.

<main>:

Primary content of the page.

Semantic HTML improves accessibility, document structure and maintainability.

3. Layout responsibilities

We separated layout responsibilities.

For example:

<nav className="flex items-center justify-between">

The <nav> controls the overall positioning.

Inside:

Navbar
├── Brand group
├── Navigation group
└── CTA group

The middle group has:

flex items-center gap-6

So:

Parent controls positioning of groups.
Child containers control positioning of their own contents.

4. Tailwind responsive design

We used the mobile-first approach.

For example:

hidden md:flex

means:

mobile → display: none
md+    → display: flex

And:

md:hidden

means:

mobile → visible
md+    → hidden
Important lesson

Breakpoints shouldn't be chosen mechanically.

We originally had:

md:flex-row

for the Hero, but at 768px the two-column layout was too cramped.

We changed it to:

lg:flex-row

because the design itself determined the appropriate breakpoint.

5. Flexbox

We used:

flex
items-center
justify-between
gap-6
flex-col

Remember:

flex

Creates a flex container.

items-center

Controls alignment on the cross axis.

justify-between

Distributes children along the main axis with space between them.

flex-col

Changes the main axis from horizontal to vertical.

gap-6

Creates consistent spacing between flex/grid children.

6. CSS positioning: relative + absolute

Our mobile menu uses:

<nav class="relative">

and:

<div class="absolute top-full left-0 ...">

Mental model:

relative
   ↓
creates the reference frame

absolute
   ↓
positions an element inside that frame
top-full

Equivalent to:

top: 100%;

So the menu begins at the bottom of the navbar.

left-0
left: 0;

Aligns its left edge with the containing block.

w-full
width: 100%;

Makes it occupy the available width.

7. React useState

Our mobile menu introduced actual React state:

const [isMenuOpen, setIsMenuOpen] = useState(false);

Mental model:

isMenuOpen
     ↓
false ─────→ menu closed
true  ─────→ menu open

Clicking:

setIsMenuOpen(!isMenuOpen)

toggles the state.

8. Conditional rendering

We used:

{isMenuOpen && (
  <div>
    ...
  </div>
)}

Meaning:

isMenuOpen === true
       ↓
render JSX

isMenuOpen === false
       ↓
render nothing

This is conditional rendering with &&.

9. Ternary operator

We also used:

{isMenuOpen ? "×" : "☰"}

Mental model:

condition ? trueValue : falseValue

Therefore:

open  → ×
closed → ☰

We also used it for accessibility:

aria-label={isMenuOpen ? "Close menu" : "Open menu"}

So the visual state and accessible state remain synchronized.

10. .map() and data-driven UI

This was one of today's most important React concepts.

We created:

const capabilities = [
  {
    title: "Find collaborators",
    description: "...",
  },
  {
    title: "Explore research",
    description: "...",
  },
  {
    title: "Use AI tools",
    description: "...",
  },
];

Then:

capabilities.map((capability) => {
  return (
    <div>
      ...
    </div>
  );
})
Mental model
Array
  ↓
.map()
  ↓
JSX for each item
  ↓
React renders the list

This separates:

data

from:

UI structure

11. Explicit vs implicit return

We specifically discussed this:

Explicit return
items.map((item) => {
  return (
    <div>
      ...
    </div>
  );
});
Implicit return
items.map((item) => (
  <div>
    ...
  </div>
));

These are equivalent.

Important rule:

(item) => {
  return ...
}

requires return.

Whereas:

(item) => (
  ...
)

implicitly returns the expression.

12. React key

When we first mapped the capabilities, React warned:

Each child in a list should have a unique key prop.

We fixed it with:

<div key={capability.title}>
Why?

React needs a stable identity for each list item.

Think:

Before:
A  B  C

After:
X  A  B  C

Keys help React understand:

A is still A
B is still B
C is still C
X is new
Important

key is special to React.

It isn't an ordinary prop passed into the component.

For our current static data, using the unique title is reasonable.

13. Design tokens

We spent significant time establishing this.

Instead of:

text-gray-700
bg-teal-700
border-gray-300

we use semantic tokens:

text-foreground
text-muted-foreground
bg-primary
text-primary-foreground
border-border
bg-background
bg-accent

The idea:

Component
    ↓
semantic token
    ↓
actual color

This gives us:

consistency
maintainability
easier redesign
future theming/dark mode
fewer hardcoded colors

We also added:

muted-foreground

because we needed a semantic token for secondary text.

14. Implicit vs explicit layout behavior

We discovered an interesting example with the mobile CTA.

The CTA became full-width even before we added:

w-full

because its parent was:

flex flex-col

and flex items stretch across the cross-axis by default.

So:

Something can look correct because of implicit CSS behavior.

Adding:

w-full

makes our intention explicit.

This is a useful debugging mindset:

Don't just add a class because it fixes something. Understand why the current layout behaves that way first.

15. Reusability vs over-componentization

We discussed extracting:

CapabilityCard.tsx

but decided not to.

Why?

Because currently the card is tiny, used in only one place, and has no independent behavior.

So:

CoreCapabilities
└── mapped capability UI

is perfectly reasonable.

Reusable data doesn't necessarily mean reusable component.

We'll extract it later if its complexity or reuse justifies it.

16. Production UI thinking

We also practiced something beyond React syntax:

Don't blindly add UI.

We repeatedly followed:

Build
 ↓
Observe
 ↓
Identify actual problem
 ↓
Fix
 ↓
Observe again

Examples:

Hero md:flex-row → looked cramped at 768px → changed to lg:flex-row.
Eyebrow → looked too small → changed to text-base.
Border → looked too light → adjusted the design token.
Product preview → stopped adding cards once it communicated enough.

That's real frontend development, not just Tailwind class memorization.

🎯 The most important things to remember from today

If I had to reduce tonight to 8 interview-worthy concepts, they're:

1. Component responsibility
2. Semantic HTML
3. Flexbox + responsive design
4. useState
5. Conditional rendering
6. Ternary operator
7. .map() + data-driven UI
8. React keys

And alongside those:

Design tokens + accessibility + responsive thinking + avoiding over-engineering.