# JavaScript → React


## The Important Transition


Vanilla JS:


    Find DOM
       ↓
    Modify DOM


React:


    State / Data
       ↓
    Describe UI
       ↓
    React manages DOM updates


---


## JavaScript Knowledge React Builds Upon


Important prerequisites:


- functions
- objects
- arrays
- destructuring
- array methods
- callbacks
- modules
- async concepts


---


## `.map()` → React UI


JavaScript:


```js
items.map(item => ...)

React:

items.map(item => (
  <Card key={item.id} />
))

Mental model:

Array of data
     ↓
map()
     ↓
Array of UI elements