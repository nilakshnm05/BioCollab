# Day 02

📘 DAY 2 — React Components, Props, Events & State

Project: BioCollab
Phase: React Foundations
Daily workload: ~3–4 hours
Status: ✅ Complete

1. Day 2 Objective

Move from understanding why React exists to actually building with React.

By the end of Day 2, we wanted to understand:

React application entry point
Component tree
Component composition
Application components vs UI primitives
Props
TypeScript props
One-way data flow
Event handling
useState
State updates
Conditional rendering
React's interaction loop
2. React Application Entry Point

The basic architecture we examined:

index.html
    ↓
<div id="root">
    ↓
main.tsx
    ↓
<App />
    ↓
React component tree
index.html

The browser's initial HTML document.

It provides the DOM container where React will mount the application.

Conceptually:

<div id="root"></div>

The browser parses this HTML and creates the initial DOM.

main.tsx

The application's React entry point.

Its job is to connect the React application to the browser's DOM.

Conceptually:

Find #root
    ↓
Create React root
    ↓
Render <App />

Important distinction:

main.tsx connects our application to the DOM; it is not where React's internal rendering machinery is implemented.

App.tsx

Usually the root component of our React component tree.

Example:

<App />
   │
   ├── Navbar
   ├── Hero
   ├── ResearchSection
   └── Footer
3. Component Composition

We started with everything inside App:

function App() {
  return (
    <>
      <h1>BioCollab</h1>
      <p>Healthcare & Biotech Collaboration Platform</p>
    </>
  );
}

We then extracted the UI into:

App
 ↓
Hero

Hero.tsx became responsible for the Hero UI.

This demonstrates:

Component composition — building a larger UI by combining smaller components.

4. Application Components vs UI Primitives

We identified an important folder-architecture distinction.

Application-specific components
src/
└── components/
    ├── Hero.tsx
    ├── Navbar.tsx
    └── ResearchCard.tsx

These represent BioCollab-specific UI/features.

Generic UI primitives
src/
└── components/
    └── ui/
        ├── Button.tsx
        ├── Card.tsx
        ├── Input.tsx
        └── Dialog.tsx

These are reusable building blocks, particularly shadcn-style components.

Therefore:

Hero.tsx belongs in components/, not components/ui/.

Development principle

Not every reusable component belongs in the same abstraction layer.

This is an early example of architecture and separation of responsibility.

5. Props

We converted the hard-coded Hero into a reusable component.

Instead of:

<h1>BioCollab</h1>

we made the component receive:

<Hero
  title="BioCollab"
  description="Healthcare & Biotech Collaboration Platform."
/>

The child receives:

function Hero({ title, description }: HeroProps) {

and uses:

<h1>{title}</h1>
<p>{description}</p>
5.1 Props Mental Model

Think of props similarly to function arguments.

JavaScript:

function greet(name: string) {
  console.log(name);
}


greet("Nilaksh");

React:

<Hero title="BioCollab" />

Conceptually:

Component
    ↓
receives input
    ↓
renders output

Therefore:

Props are inputs passed from a parent component to a child component.

6. TypeScript Props

We used:

type HeroProps = {
  title: string;
  description: string;
};

and:

function Hero({ title, description }: HeroProps) {
Naming convention

Prefer:

HeroProps

rather than:

HERO

because the name immediately communicates:

This type describes the props accepted by Hero.

7. One-Way Data Flow

React encourages:

Parent
   ↓
props
   ↓
Child

For example:

App
 ↓
Hero

The parent supplies the data.

The child consumes it.

This becomes extremely important when applications grow.

8. React Event Handling

We compared Vanilla JS:

button.addEventListener("click", handleClick);

with React:

<button onClick={handleClick}>
  Explore Collaborations
</button>

React event names use camelCase:

onClick
onChange
onSubmit
onMouseEnter
onKeyDown
9. Function Reference vs Function Invocation

This was an important point.

Function reference
onClick={handleClick}

Means:

Give React the function.

React invokes it when the event occurs.

Function invocation
onClick={handleClick()}

Means:

Execute the function immediately during rendering and use its return value.

This distinction comes directly from JavaScript.

Similarly:

updateState={handleExplore}

passes the function.

Whereas:

updateState={handleExplore()}

calls it immediately.

10. Event Handler Location

We initially got stuck on where handleClick should be declared.

A component can contain its JavaScript logic before its JSX return:

function Hero() {


  function handleClick() {
    console.log("Exploring collaborations...");
  }


  return (
    <button onClick={handleClick}>
      Explore
    </button>
  );
}

Mental model:

Component
├── JavaScript logic
│   └── event handlers
│
└── JSX
11. Why Ordinary Variables Aren't Enough

Suppose:

let isExploring = false;

and then:

isExploring = true;

The JavaScript variable changes.

But React isn't automatically notified that the UI needs to be updated.

We therefore need a mechanism that:

stores state
updates state
tells React that the component needs to render again

This is what useState provides.

12. useState

We learned:

const [isExploring, setIsExploring] = useState(false);

Meaning:

Part	Meaning
false	Initial state
isExploring	Current state value
setIsExploring	State updater function

Conceptually:

useState(false)
      ↓
current value → false
updater       → setIsExploring
13. State Update

We used:

function handleClick() {
  setIsExploring(true);
}

The important difference from:

isExploring = true;

is that the React state updater tells React that the state has changed and the UI may need to be rendered again.

14. Conditional Rendering

We reused the JavaScript knowledge from Day 1.

{isExploring && (
  <p>Exploring Collaborations...</p>
)}

If:

isExploring = true

the paragraph is rendered.

If:

isExploring = false

the paragraph isn't rendered.

This works because of JavaScript's logical AND short-circuiting.

15. The Complete React Interaction Loop

This became the most important concept of Day 2:

USER ACTION
    ↓
EVENT HANDLER
    ↓
STATE UPDATE
    ↓
REACT RE-RENDERS
    ↓
JSX EVALUATES NEW STATE
    ↓
UI REFLECTS STATE

Our BioCollab implementation:

Click Explore
     ↓
handleClick()
     ↓
setIsExploring(true)
     ↓
React re-renders
     ↓
isExploring === true
     ↓
conditional JSX renders
     ↓
"Exploring Collaborations..."

This is the practical realization of the Day 1 mental model.

16. Day 2 Important Mental Models
Component

A meaningful, reusable unit of UI and behavior.

Props

Inputs provided by a parent to a child.

State

Data whose changes can cause a component's UI to update.

Event

A user/browser interaction that can trigger application logic.

State-driven UI

The UI should represent the current application state.

17. Day 2 Mistakes We Corrected
void vs function returning void

Incorrect:

updateState: void;

Correct:

updateState: () => void;

Because:

()     → accepts no arguments
=> void → returns nothing
handleExplore vs handleExplore()

Correct:

updateState={handleExplore}

Incorrect for this purpose:

updateState={handleExplore()}
useState doesn't just mean "initial state"
useState(false)

provides both:

current state
state updater

The initial value is only the starting point.

18. Day 2 Interview Questions

You should eventually be able to answer:

What is a React component?
What are props?
What is state?
What is the difference between props and state?
What does useState return?
Why can't we just change a normal JavaScript variable?
Why is onClick={handleClick} different from onClick={handleClick()}?
What is conditional rendering?
How does && work in JSX?
What happens after a state update?
