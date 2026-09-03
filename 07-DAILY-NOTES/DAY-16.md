# BioCollab — AI Assistant & Workspace Checkpoint Notes

## Git Checkpoint

This checkpoint marks the completion of the first meaningful interactive AI Assistant flow in the BioCollab Workspace.

```bash
git add .
git commit -m "feat: build interactive AI assistant response flow"
git push
```

### Current AI progression

```text
User input
    ↓
Processing state
    ↓
Streaming simulation
    ↓
Structured AI response
    ↓
Key findings + limitations
```

The next AI checkpoint begins with **Evidence / Citations**.

---

## 1. Workspace as a Multi-View Feature

The Workspace is a shell containing multiple views:

```text
Workspace
├── Overview
├── Collaboration
├── Research
└── AI Assistant
```

The selected view is represented by one state variable:

```ts
const [activeView, setActiveView] =
  useState<WorkspaceView>("overview");
```

### Mental model

```text
User clicks navigation
        ↓
setActiveView(...)
        ↓
React state changes
        ↓
component re-renders
        ↓
correct view is rendered
```

This extends the system-level React model already established during Research:

```text
User interaction
      ↓
State
      ↓
Event handler
      ↓
Conditional UI
      ↓
Rendered components
```

---

## 2. State Ownership

State ownership was derived rather than chosen arbitrarily.

**What changes?**  
The selected Workspace section.

**Who needs to know?**  
The Sidebar and the Main content.

**Closest common parent?**  
`WorkspacePage`.

Therefore:

```text
WorkspacePage
     │
     ├── activeView
     ├── WorkspaceSidebar
     └── Main View
```

### Principle

> Put state in the closest common ancestor that needs to coordinate the dependent components.

---

## 3. Derived Values Are Not Separate State

The Sidebar derives whether an item is active:

```ts
const isActive = activeView === item.id;
```

`isActive` does not need its own `useState` because it can be calculated from existing state.

```text
activeView + item.id
        ↓
    isActive
```

### Principle

> Don't create state for something that can be calculated from existing state.

---

## 4. One State Variable Can Represent a State Machine

The AI Assistant could have been modeled with several booleans:

```text
isProcessing
isStreaming
isComplete
isError
```

Instead, one union models the lifecycle:

```ts
type AiStatus =
  | "idle"
  | "processing"
  | "streaming"
  | "complete"
  | "error";
```

### State flow

```text
idle
 ↓
processing
 ↓
streaming
 ↓
complete
```

Potential failures:

```text
processing ──→ error
streaming  ──→ error
```

A single state variable prevents contradictory combinations such as:

```text
isProcessing = true
isComplete = true
```

It communicates that the AI has one current lifecycle state.

---

## 5. Temporary UI State vs Final Domain State

We have:

```ts
const [streamedText, setStreamedText] = useState<string>("");
const [response, setResponse] = useState<AiResponse | null>(null);
```

They have different meanings.

### `streamedText`

Temporary representation while the AI is generating:

```text
AI can
AI can help researchers
AI can help researchers identify relevant
AI can help researchers identify relevant biomedical evidence.
```

### `response`

The final structured result:

```ts
{
  answer: string,
  keyFindings: string[],
  limitations: string[]
}
```

### Mental model

```text
Generation phase
      ↓
streamedText

Completion phase
      ↓
response
```

### Principle

> State variables should have clear, distinct meanings.

---

## 6. Local Variable vs React State During Async Work

The streaming algorithm uses:

```ts
let accumulatedText = "";

for (const chunk of chunks) {
  await ...
  accumulatedText += chunk;
  setStreamedText(accumulatedText);
}
```

`accumulatedText` is an ordinary JavaScript variable, so:

```ts
accumulatedText += chunk;
```

changes it immediately.

React state behaves differently:

```ts
setStreamedText(...)
```

schedules a React state update. It does not synchronously mutate the state variable belonging to the current render.

Therefore:

```text
Async algorithm
      ↓
local accumulatedText
      ↓
setStreamedText(...)
      ↓
React renders progress
```

The local accumulator is useful for the async algorithm, while React state exposes the current progress to the UI.

---

## 7. `await` Controls Sequential Streaming

Streaming was simulated using:

```ts
await new Promise((resolve) =>
  setTimeout(resolve, 500)
);
```

inside the loop.

Therefore:

```text
chunk 1
 ↓
wait 500ms
 ↓
render
 ↓
chunk 2
 ↓
wait 500ms
 ↓
render
 ↓
chunk 3
```

Without the `await`, the loop would not wait for each delay before continuing.

### Important distinction

`await` pauses execution of that async function. It does not freeze the browser's entire UI.

---

## 8. Structured AI Responses

Instead of storing only:

```ts
string
```

the AI response is modeled as:

```ts
type AiResponse = {
  answer: string;
  keyFindings: string[];
  limitations: string[];
};
```

This models one logical AI response as one structured domain object.

```text
AI Response
├── answer
├── keyFindings[]
└── limitations[]
```

The UI can therefore render each part independently.

---

## 9. Conditional Rendering Based on State

During streaming:

```text
status === "streaming"
        ↓
streamedText + cursor
```

After completion:

```text
status === "complete"
        ↓
response
        ↓
answer
key findings
limitations
```

The UI is therefore a direct representation of application state.

```text
State
 ↓
Conditional JSX
 ↓
UI
```

---

## 10. Rendering Arrays with `.map()`

`keyFindings` and `limitations` are arrays:

```ts
string[]
```

Therefore `.map()` transforms each item into JSX:

```tsx
response.keyFindings.map((finding) => (
  <li key={finding}>{finding}</li>
))
```

### Mental model

```text
array
 ↓
.map()
 ↓
React elements
```

Important: `.map()` should be used because there is a collection to iterate over, not simply because `.map()` exists.

---

## 11. Forms Are an Event Pipeline

The AI input uses a proper form:

```text
Button click
      ↓
form submit
      ↓
onSubmit
      ↓
handleSubmit()
```

The Enter key uses:

```text
Enter
 ↓
requestSubmit()
 ↓
onSubmit
 ↓
handleSubmit()
```

This creates one submission pipeline instead of separate submission logic.

We also learned why:

```ts
e.currentTarget.form
```

is preferable to:

```ts
e.target.form
```

for TypeScript typing.

`currentTarget` is known to be the element whose event handler is executing, while `target` is broadly typed as an `EventTarget`.

---

## 12. Keyboard UX

The textarea supports:

```text
Enter
→ submit

Shift + Enter
→ new line
```

The UI communicates this behavior:

```text
Enter to submit · Shift + Enter for a new line
```

This is an example of designing the interaction around the actual behavior of the product.

---

## 13. Current AI Architecture Checkpoint

```text
                 AI ASSISTANT
                      │
                User question
                      │
                controlled state
                      │
                 submit event
                      │
                 processing
                      │
                streaming state
                      │
              streamedText updates
                      │
                 completion
                      │
              structured response
                 /          \
          key findings    limitations
```

The intended AI product progression is:

```text
User input
    ↓
AI processing state
    ↓
progressive / streaming response
    ↓
structured AI output
    ↓
sources / citations
    ↓
user actions
    ↓
refinement / follow-up
```

### Current position

```text
✓ User input
✓ Processing state
✓ Progressive streaming
✓ Structured AI output
✓ Key findings
✓ Limitations

→ Evidence / citations
→ AI actions
→ Follow-up conversation
→ Error state + retry
→ Cancellation
→ Accessibility / polish
→ Real AI / backend integration
```

---

## 14. What Is Deliberately NOT Finished

The following are intentionally left for later:

- Evidence / citations
- AI actions
- Follow-up conversation
- Error state and retry
- Cancellation
- Accessibility and responsive polish
- Real AI/backend integration

This is deliberate scope control.

The goal is to extract maximum learning value from each feature before moving to the next engineering problem.

---

## 15. Important Product Architecture Principle

BioCollab should not treat every surface as a duplicate version of another surface.

For example:

```text
Research Discovery
    ↓
Find / explore research

Workspace Research
    ↓
Manage / revisit research relevant to ongoing work
```

Likewise:

```text
Collaboration Discovery
    ↓
Find researchers / opportunities

Workspace Collaboration
    ↓
Manage active collaboration work
```

The same domain entities can be reused while the UI representation remains appropriate to the user's task.

---

## 16. Strategic Learning Progression

Research established the foundation:

```text
React
 ↓
state
 ↓
effects
 ↓
async data
 ↓
API integration
 ↓
TypeScript
 ↓
component architecture
 ↓
UX states
 ↓
pagination
 ↓
debouncing
```

The Workspace extends that into:

```text
component composition
 ↓
shared state
 ↓
view switching
 ↓
derived state
 ↓
forms
 ↓
async interaction
 ↓
state machines
 ↓
streaming UI
 ↓
structured AI output
```

This is the progression from building screens toward reasoning about application behavior as a system.

---

## 17. Final Engineering Checkpoint

### Key takeaway

> React state can model an AI interaction lifecycle, while separate temporary and final state representations allow progressive streaming followed by structured output.

This is a meaningful Git checkpoint because the AI Assistant now demonstrates an actual interaction lifecycle rather than being a static dashboard placeholder.

**Next session starts at: Evidence / Citations.**
