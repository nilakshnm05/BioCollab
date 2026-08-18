# 📘 Day 1 — From Vanilla JavaScript to React

**Project:** BioCollab — Healthcare B2B Collaboration Portal
**Phase:** React Foundations
**Day objective:** Build the mental bridge from Vanilla JavaScript to React and understand why React's programming model exists.

---

## 1. Today's Core Goal

The goal of Day 1 was **not to learn a large number of React APIs**.

It was to understand the fundamental shift:

> **Vanilla JavaScript → manually coordinating DOM changes**
>
> **React → describing UI based on application state and allowing React to handle the necessary DOM updates**

This mental model will form the foundation for everything we learn later.

---

# 2. Vanilla JavaScript → React

## 2.1 The Vanilla JavaScript approach

In the Weather Dashboard, when weather data changes, we may need to manually update:

- city name
- temperature
- weather icon
- condition
- loading spinner
- AQI
- weekly forecast cards
- week details
- etc.

Conceptually:

```text
Weather data changes
        ↓
Find city element → update
        ↓
Find temperature element → update
        ↓
Find icon → update
        ↓
Update AQI
        ↓
Show/hide loading spinner
        ↓
Rebuild forecast
        ↓
...
```

The developer is responsible for keeping the **DOM synchronized with the application's state**.

This works, but as an application becomes larger and more complex, coordinating many DOM updates can become cumbersome and difficult to maintain.

---

# 3. React's State-Driven Mental Model

React encourages a different way of thinking:

```text
Application State
       ↓
     React
       ↓
       UI
```

Instead of thinking:

> "Which DOM elements do I need to modify?"

we think:

> **"What should the UI look like for the current state?"**

When the state changes:

```text
New State
   ↓
React renders/reconciles
   ↓
Updated UI
```

React handles the necessary DOM synchronization.

### Core principle

> **We determine what the UI should represent; React manages much of the process of synchronizing that representation with the DOM.**

### Important nuance

React does **not** mean developers stop caring about the DOM, UI, accessibility, rendering behavior or performance.

It means React provides an abstraction that reduces the need for developers to manually coordinate every DOM update.

---

# 4. Imperative vs Declarative Thinking

## Imperative UI

Vanilla JavaScript often involves telling the browser **how to change the UI**:

```text
Find element
      ↓
Change text
      ↓
Change class
      ↓
Show element
      ↓
Hide element
      ↓
Create elements
      ↓
Append elements
```

You explicitly coordinate the operations.

## Declarative UI

React encourages us to describe **what the UI should look like given the current state**.

```text
State
 ↓
Describe desired UI
 ↓
React
 ↓
DOM
```

You focus more on the desired result rather than manually coordinating every DOM operation.

### Mental model

> **Imperative:** How do I change the UI?

> **Declarative:** What should the UI look like in this state?

---

# 5. Why Components?

A large UI should not become one giant component.

For example, our Weather Dashboard could conceptually become:

```text
WeatherDashboard
│
├── Navbar
├── SearchBar
├── CurrentWeather
│   ├── Temperature
│   ├── Condition
│   └── WeatherIcon
│
├── AirQuality
│
├── WeeklyForecast
│   └── ForecastCard
│
└── WeekDetails
```

This follows a broader software-development principle:

> **Division of responsibility / separation of concerns**

Each meaningful part has a clearly defined responsibility.

---

## 5.1 Why this helps

Instead of one enormous unit containing everything:

```text
Everything
└── Everything else
```

we have:

```text
Dashboard
├── Navigation responsibility
├── Search responsibility
├── Current-weather responsibility
├── AQI responsibility
└── Forecast responsibility
```

Benefits include:

- easier reasoning
- easier maintenance
- easier debugging
- easier reuse
- reduced complexity
- clearer responsibilities

### Important nuance

"One responsibility" does **not** mean:

> One component = one HTML element.

A component should represent a **meaningful unit of UI or behavior**.

For example, `CurrentWeather` can contain temperature, condition and icon because those collectively represent one feature.

---

# 6. Separation of Concerns

This principle extends far beyond React.

Different parts of a software system should have clearly defined responsibilities rather than mixing everything together.

We'll encounter this repeatedly:

```text
Component
→ UI responsibility

Validation schema
→ validation responsibility

API layer
→ communication responsibility

State
→ application data

Tests
→ verification
```

This is one of the principles behind maintainable software.

### Development insight

> **Good abstraction reduces coordination cost.**

As an application grows, the challenge isn't only writing more code.

The challenge is keeping many interconnected pieces understandable and consistent.

---

# 7. JSX

## 7.1 What is JSX?

JSX allows us to write **HTML-like UI syntax inside JavaScript/TypeScript**.

Example:

```jsx
function ResearchCard() {
  return (
    <div>
      <h2>Oncology Research Program</h2>
      <p>Phase II</p>
    </div>
  );
}
```

JSX looks like HTML, but **it is not HTML**.

It is syntax that React tooling transforms into JavaScript representations of the UI.

---

# 8. Why JSX?

Without JSX, creating complex UI with JavaScript can involve manually creating and coordinating DOM elements.

JSX allows the structure of a component and its associated logic to be expressed together.

Conceptually:

```text
Component
├── JavaScript / TypeScript logic
└── JSX describing UI
```

This makes the component more cohesive and reduces the need to maintain a separate layer of manual DOM manipulation for that component.

### Important developer principle

> **Good abstraction reduces coordination and maintenance cost.**

---

# 9. JSX and JavaScript Expressions

One of the most important JSX concepts from Day 1:

```jsx
<h2>{product.name}</h2>
```

The `{}` tells JSX:

> **Evaluate this as a JavaScript expression.**

For example:

```jsx
{
  name;
}
```

```jsx
{
  user.name;
}
```

```jsx
{
  user.name.toUpperCase();
}
```

```jsx
{
  product.price * 2;
}
```

```jsx
{
  user.age > 18 ? "Adult" : "Minor";
}
```

So don't memorize:

> `{}` = variables

Instead remember:

> **`{}` allows JavaScript expressions to be evaluated inside JSX.**

---

# 10. JavaScript → JSX → React → UI

A useful mental model:

```text
JavaScript / TypeScript data
          ↓
        { ... }
          ↓
         JSX
          ↓
        React
          ↓
          UI
```

This is the bridge between your existing JavaScript knowledge and React.

---

# 11. Expressions vs Statements

JSX `{}` expects a **JavaScript expression**.

### Expression

An expression produces a value.

Examples:

```js
product.name;
```

```js
user.age > 18;
```

```js
user.name.toUpperCase();
```

```js
product.price * 2;
```

### Statement

A statement controls program flow or performs an action.

For example:

```js
if (user.age > 18) {
  ...
}
```

`if` is a statement.

Therefore, this doesn't work:

```jsx
<h2>{if (user.age > 18)}</h2>
```

because `if` cannot be directly used as an expression inside JSX.

---

# 12. Conditional Rendering

Since JSX works with expressions, JavaScript expressions can be used to determine what gets rendered.

## Ternary

```jsx
<h2>{user.age > 18 ? "Adult" : "Minor"}</h2>
```

The ternary produces a value, so it can be used inside JSX.

---

## Logical AND

```jsx
{
  product.status === "Active" && <span>Currently Active</span>;
}
```

If:

```text
product.status === "Active"
```

is `true`:

```text
true && <span>...</span>
        ↓
<span>...</span>
```

The element is rendered.

If it's `false`:

```text
false && <span>...</span>
         ↓
false
```

The `<span>` isn't rendered.

### Why?

Because of JavaScript's **short-circuit evaluation**.

This is an example of using existing JavaScript knowledge to express UI behavior in React.

---

# 13. Important correction: Boolean expressions

This is valid JSX:

```jsx
<h2>{user.age > 18}</h2>
```

because:

```js
user.age > 18;
```

is an expression.

However, it evaluates to:

```text
true
```

or:

```text
false
```

React does not render those boolean values as visible text in normal JSX output.

If we want visible conditional text:

```jsx
<h2>{user.age > 18 ? "Adult" : "Minor"}</h2>
```

### Important rule

> **An expression can be syntactically valid JSX without necessarily producing the UI output you intended.**

---

# 14. JSX Syntax Rules

## `class` → `className`

HTML:

```html
<div class="card"></div>
```

JSX:

```jsx
<div className="card">
```

JSX uses JavaScript-compatible property naming.

We'll encounter other examples such as:

```jsx
htmlFor;
```

instead of HTML's:

```html
for
```

---

# 15. JSX Must Have One Root

This isn't valid:

```jsx
return (
  <h2>Research</h2>
  <p>Phase II</p>
);
```

The returned JSX needs a common parent.

One solution:

```jsx
return (
  <div>
    <h2>Research</h2>
    <p>Phase II</p>
  </div>
);
```

Or use a React Fragment:

```jsx
return (
  <>
    <h2>Research</h2>
    <p>Phase II</p>
  </>
);
```

The Fragment avoids adding an unnecessary DOM element.

---

# 16. JavaScript Expressions in Attributes

JSX expressions can also be used inside attributes.

Example:

```jsx
<img src={product.image} alt={product.name} />
```

Compare:

```jsx
alt = "Research product";
```

with:

```jsx
alt={product.name}
```

The first is a literal string.

The second evaluates JavaScript.

This becomes particularly important when UI is generated from API data.

---

# 17. Self-Closing JSX Elements

JSX requires elements without children to be explicitly closed.

For example:

```jsx
<img src="image.jpg" />
```

```jsx
<input />
```

```jsx
<Component />
```

This is different from how some HTML syntax may be written.

---

# 18. `return (...)` vs JSX

One correction from today's exercise:

This:

```jsx
return <div>...</div>;
```

does **not** mean `return` itself needs to be closed with `< />`.

`return (...)` is JavaScript syntax.

The JSX elements inside it are what need to be properly closed.

Think:

```text
return (...)        ← JavaScript

<div>...</div>      ← JSX

<img />             ← self-closing JSX
```

---

# 19. Component + JavaScript + JSX

A React component can combine JavaScript logic with JSX:

```jsx
function Greeting() {
  const name = "Nilaksh";

  return <h1>Hello, {name}!</h1>;
}
```

The result is:

```text
Hello, Nilaksh!
```

because:

```jsx
{
  name;
}
```

evaluates the JavaScript variable.

---

# 20. Example: Dynamic Conditional UI

```jsx
function ResearchCard({ product }) {
  return (
    <div className="card">
      <h2>{product.name}</h2>

      {product.status === "Active" && <span>Currently Active</span>}

      <p>{product.stage}</p>
    </div>
  );
}
```

If:

```js
product.status === "Active";
```

the `<span>` renders.

Otherwise, it doesn't.

This combines:

- component thinking
- JSX
- JavaScript expressions
- conditional rendering
- short-circuit evaluation
- dynamic data

---

# 21. Day 1 Mental Models

These are the concepts I want you to retain rather than memorize isolated syntax.

### Mental Model 1

> **Application state is the source of truth for what the UI represents.**

### Mental Model 2

> **React reduces the need for manually synchronizing every DOM change with application state.**

### Mental Model 3

> **Components divide a complex UI into meaningful units with clear responsibilities.**

### Mental Model 4

> **JSX is HTML-like syntax for describing UI inside JavaScript/TypeScript.**

### Mental Model 5

> **`{}` in JSX means: evaluate this JavaScript expression.**

### Mental Model 6

> **Good software architecture reduces coordination cost.**

---

# 22. Mistakes We Corrected Today

### Mistake 1

> "React directly changes the UI."

More precise:

> We update state; React uses that state to determine the UI and handles the necessary DOM updates.

---

### Mistake 2

> "`return` needs `< />`."

Incorrect.

`return (...)` is JavaScript.

JSX elements are what need to be properly closed.

---

### Mistake 3

> "HTML only changes after page reload."

Not true.

Vanilla JavaScript can dynamically manipulate the DOM without reloading.

The distinction is **who coordinates those updates and how**.

---

### Mistake 4

> "`{}` in JSX means variables."

More accurate:

> `{}` allows JavaScript **expressions** inside JSX.

---

### Mistake 5

> "`if` cannot be used in JSX because conditions aren't allowed."

Not quite.

Conditions are absolutely possible. The issue is that `if` is a **statement**, while JSX expressions require expressions.

We use things such as:

- ternaries
- `&&`
- other expression-based techniques

for conditional rendering.

---

# 23. Interview Questions From Day 1

You should eventually be able to answer these naturally:

### Q1

Why would React become useful as an application grows?

### Q2

What is the difference between imperative and declarative UI?

### Q3

What problem does React's component model solve?

### Q4

What is JSX?

### Q5

Is JSX HTML?

### Q6

What can be placed inside `{}` in JSX?

### Q7

What's the difference between a JavaScript expression and statement?

### Q8

Why can't you directly put an `if` statement inside JSX?

### Q9

How does conditional rendering with `&&` work?

### Q10

Why is `className` used instead of `class` in JSX?

### Q11

Why does JSX need a single root element?

### Q12

How is React different from manually manipulating the DOM?

---
