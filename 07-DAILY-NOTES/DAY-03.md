# Day 03

📗 DAY 3 — Component Communication & State Architecture

Status: ✅ Complete

1. Day 3 Objective

Day 2 taught us:

Component
   ↓
State
   ↓
UI

Day 3 expanded that into:

Multiple components
        ↓
Shared state
        ↓
State ownership
        ↓
Component communication

We learned:

Child → parent communication
Callback props
Lifting state up
Single source of truth
State locality
Shared state
&& vs ternary
Choosing where state should live
2. The Problem: Shared State

Initially:

App
 ↓
Hero

Hero owned:

isExploring

That was reasonable because Hero was the only component that needed it.

Then we introduced:

App
├── Hero
└── StatusPanel

Both components needed to know whether exploration was happening.

Now keeping the state inside Hero would be problematic.

3. Lifting State Up

We moved:

isExploring

from:

Hero

to:

App

because App is the common parent.

The architecture became:

        App
         │
   isExploring
      /     \
     ↓       ↓
   Hero   StatusPanel

This is called:

Lifting state up

4. The Core Rule

A very important rule:

Shared state should generally live in the lowest common ancestor of the components that need it.

Example:

        App
       /   \
    Hero   StatusPanel

Both need isExploring.

Therefore:

App → owns isExploring

But if only Hero needs a state:

App
└── Hero

keep it in Hero.

5. Don't Lift State Unnecessarily

We discussed:

App
├── Navbar
├── Hero
├── CollaborationList
└── Footer

If only CollaborationList needs:

isLoading

then it should generally own that state.

Don't automatically move everything to App.

Principle

Keep state as local as possible; lift it only when multiple components genuinely need to share it.

This is an important component-architecture principle.

6. The Child → Parent Problem

React's normal data direction is:

Parent
   ↓
Child

But what if the child needs to tell the parent:

"The user clicked this."

We don't directly mutate the parent's state from the child.

Instead, the parent gives the child a function.

7. Callback Props

App created:

function handleExplore() {
  setIsExploring(true);
}

Then passed the function to Hero:

<Hero updateState={handleExplore} />

Hero receives it:

type HeroProps = {
  title: string;
  description: string;
  updateState: () => void;
};

Then:

<button onClick={updateState}>
  Explore Collaborations
</button>

When the user clicks:

Hero
 ↓
updateState()
 ↓
App's handleExplore()
 ↓
setIsExploring(true)
8. Child Does NOT Directly Modify Parent State

This is an important distinction.

We don't have:

Hero
 ↓
directly modifies App's state

Instead:

App owns state
     ↓
App provides callback
     ↓
Hero calls callback
     ↓
App changes its own state

Therefore one-way data flow is preserved.

9. Complete Communication Architecture

Our final architecture:

                    App
                     │
              owns isExploring
                     │
          ┌──────────┴──────────┐
          ↓                     ↓
        Hero               StatusPanel
          │                     ↑
          │ callback            │ prop
          ↓                     │
     handleExplore()            │
          │                     │
          └──── setState ───────┘

More explicitly:

App → Hero
     callback prop


App → StatusPanel
     state prop


Hero → App
       invokes callback


App → state update


App → StatusPanel
     new state
10. Single Source of Truth

We avoided this:

App
 └── isExploring


Hero
 └── isExploring


StatusPanel
 └── isExploring

because we would then have multiple independent copies of the same conceptual state.

Instead:

App
└── isExploring ← single source of truth

and children consume it through props.

Principle

For shared state, maintain one authoritative source rather than duplicating the state across components.

11. Conditional Rendering: && vs Ternary

We previously used:

{exploring && <p>Status: Exploring</p>}

This means:

true  → render something
false → render nothing
Ternary

We later needed:

true  → Exploring
false → Ready

So we used:

<p>
  Status: {exploring ? "Exploring" : "Ready"}
</p>

Mental shortcut:

&&
→ show / don't show


ternary
→ A / B
12. Day 3 BioCollab Implementation

Our final mini-architecture was:

App
├── isExploring
├── handleExplore()
│
├── Hero
│    └── receives updateState callback
│
└── StatusPanel
     └── receives exploring state
Flow
1. App initializes:


isExploring = false




2. App gives Hero:


updateState={handleExplore}




3. User clicks Hero button.




4. Hero calls:


updateState()




5. App executes:


handleExplore()




6. App executes:


setIsExploring(true)




7. React re-renders.




8. App passes:


exploring={true}




9. StatusPanel evaluates:


exploring ? "Exploring" : "Ready"




10. UI becomes:


Status: Exploring
13. Day 3 Architectural Principle

The most important question isn't:

"Where can I put this state?"

It's:

"Which component should own this state?"

Use this decision process:

Does only one component need it?
        ↓
Keep it local.


Do multiple components need it?
        ↓
Find their lowest common ancestor.


Move state there.
        ↓
Pass data down through props.
        ↓
Pass callbacks down when children need
to request state changes.
14. Day 3 Mental Models
State ownership

The component that owns state is the source of truth for that state.

State locality

Keep state as close as possible to where it is used.

Lifting state

Move state upward when multiple components need to share it.

Callback props

A parent can pass a function to a child so the child can request an action from the parent.

Single source of truth

Avoid multiple independent copies of the same conceptual state.

One-way data flow
Parent
 ↓
Props
 ↓
Child

A callback doesn't violate this; it gives the child a mechanism to request a parent-side state change.

15. Day 3 Interview Questions

You should eventually be able to answer:

What is lifting state up?
When should state be lifted?
Why shouldn't every piece of state live in App?
What is a callback prop?
How can a child communicate with a parent in React?
Does a child directly modify its parent's state?
What does "single source of truth" mean?
What is one-way data flow?
When would you use && instead of a ternary?
How do you decide where state should live?
