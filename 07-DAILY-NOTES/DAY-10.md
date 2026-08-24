# BioCollab — Day Notes
## Collaboration Discovery Page Styling

### 1. Tailwind spacing

Learned that Tailwind uses spacing utilities such as:

- `gap-3` → adds consistent spacing between flex/grid children
- `p-6` → padding on all sides
- `px-3` → horizontal padding
- `py-1` → vertical padding

Important distinction:

- `gap-*` → space **between children**
- `p-*` → space **inside the container**
- `m-*` → space **outside the element**

Example:

```tsx
<div className="flex flex-wrap gap-3">

This is useful for things like expertise/research-area pills.

2. Typography

Used Tailwind typography utilities to establish hierarchy.

Examples:

text-lg
text-sm
font-semibold
font-medium
font-normal
text-gray-600
text-gray-700

Mental model:

text-* → controls size
font-* → controls weight
text-gray-* → controls visual intensity/color

For the collaboration cards:

Title → larger + font-semibold
Description → smaller + normal weight + muted color
Labels → small + semibold
Pills → small + readable muted/darker text
Actions → small + medium weight
3. Flexbox + justify-between

Used:

flex justify-between

to place two elements at opposite ends of a row.

Example:

Title                         Status

justify-between distributes the available horizontal space between flex children.

4. Responsive Flexbox

Learned how Tailwind responsive prefixes work.

Example:

flex flex-col gap-2 md:flex-row md:justify-between

Mental model:

Mobile:
flex-col
↓
Title
Status


Desktop:
md:flex-row
↓
Title                    Status

Important principle:

When two elements compete for horizontal space on a small screen, change the layout instead of endlessly shrinking the content.

5. self-* utilities

Learned that self-* allows one flex child to override the parent's alignment.

Example:

self-start

The parent may be:

flex flex-col

but instead of allowing the child to stretch across the available width, self-start keeps it at its content width.

For the status badge we used the responsive idea:

self-start md:self-auto

Meaning:

Mobile → start alignment
Desktop → normal alignment

This was particularly useful for the status badge on narrow screens.

6. Responsive card design

Tested the Collaboration Discovery page at multiple viewport widths:

768px
580px
420px
372px
324px

Checked for:

horizontal overflow
wrapping
card width
title/status collision
expertise pill wrapping
research-area pill wrapping
filter responsiveness

The page successfully adapts to narrow screens.

7. Search input UX

The search input initially had almost no visual affordance.

Added styling so it looks like an actual interactive control.

Learned:

focus:outline-none

Removes the browser's default focus outline.

focus:ring-2

Adds a Tailwind focus ring with 2px width.

focus:ring-gray-200

Sets the focus ring color.

Mental model:

focus:
    what happens when the user clicks/tabs into the element

Important:

Focus styling is part of UX, not just decoration. Users need to know which control currently has focus.

8. Reusing control styling

The same visual language was applied to:

search input
status <select>
sort <select>

Common properties included:

bg-white
border
border-gray-*
rounded-lg
px-*
py-*
text-sm
text-gray-*

This creates visual consistency across the page.

9. Status badges / pills

Created pill-like UI using:

rounded-full
px-2
py-1

Combined with subtle backgrounds and appropriate text colors.

Concept:

rounded-full

is useful for tags, badges and status indicators.

10. Modal / Collaboration Details

Built the basic Collaboration Details overlay.

Concepts used:

positioned overlay
background dimming
centered white modal
rounded corners
shadow
close action

The modal displays:

collaboration title
status
description
expertise
research areas
close button
11. Modal layering / positioning

Learned the importance of positioning context.

The modal system uses the idea of:

parent positioning context
        ↓
overlay
        ↓
modal

A semi-transparent overlay creates the dimmed background while the white modal remains visually prominent.

12. Close button styling

Changed the plain Close text into a proper secondary button.

Used concepts such as:

px-4
py-2
rounded-lg
text-sm
font-medium
text-gray-700
bg-gray-200
hover:bg-gray-300

The goal was to make the action clearly clickable without making it visually dominant.

13. View button

The card's View action was also styled as an intentional interactive element rather than plain text.

Current design direction:

px-3
py-1.5
rounded-md
border
border-gray-300
text-sm
font-medium
text-gray-700
hover:bg-gray-50
hover:border-gray-400
transition-colors

Mental model:

Primary information should dominate visually; secondary actions should remain noticeable without competing with the title/status.

14. transition-colors

Learned that:

transition-colors

makes color changes such as:

text-gray-700
        ↓ hover
text-gray-900

or:

bg-gray-50

feel smoother rather than changing instantly.

Key Tailwind concepts learned today
gap-*                 → spacing between children
p-*                   → internal spacing
px-* / py-*           → horizontal / vertical padding

text-*                → font size
font-*                → font weight
text-gray-*           → text color/intensity

flex                  → enable flexbox
flex-col              → vertical layout
flex-row              → horizontal layout
justify-between       → distribute children across main axis

md:*                  → apply utility at medium breakpoint and above

self-start            → override individual child's alignment
self-end              → align individual child to the end

rounded-md            → medium corner radius
rounded-lg            → larger corner radius
rounded-full          → pill/circle shape

border                → element border
shadow-*              → elevation/depth

hover:*               → hover state
focus:*               → keyboard/input focus state
transition-colors     → animate color transitions

outline-none          → remove default outline
ring-2                → create focus ring
ring-*                → ring color
Most important lesson
Don't memorize Tailwind classes individually.

Think in terms of CSS concepts:

Layout
  ↓
Flexbox / Grid

Spacing
  ↓
Padding / Margin / Gap

Typography
  ↓
Size / Weight / Color

Responsive design
  ↓
Breakpoints

Interaction
  ↓
Hover / Focus / Active

Alignment
  ↓
justify-* / items-* / self-*

Visual hierarchy
  ↓
Size + weight + color + spacing

Tailwind is essentially giving us a convenient vocabulary for these CSS concepts.