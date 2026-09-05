# BioCollab — Work Since Last Git Commit
## AI Assistant: Conversation History, Follow-ups, Error Handling, Presentation & Responsiveness

> This note covers the work completed **after the previous Git checkpoint** and before the next commit.

---

# 1. Starting Point

At the previous checkpoint, the BioCollab AI Assistant already had:

- AI question input
- Form submission
- Enter / Shift+Enter keyboard behavior
- Processing state
- Simulated streaming
- Structured AI response
- Key findings
- Limitations
- Evidence / citations
- DOI fallback
- Save-to-Workspace action

The next goal was to turn this into a **real conversation flow** and then make the feature presentable.

---

# 2. Conversation History

## Why conversation history was needed

The AI Assistant should not behave like a single-question form.

The intended product behavior is:

```text
User question
↓
AI response
↓
User follow-up
↓
AI response
```

Therefore, the component needs to keep multiple messages instead of only storing the latest response.

---

# 3. `AiMessage` Type

A discriminated union was introduced:

```tsx
type AiMessage =
  | {
      role: "user";
      content: string;
    }
  | {
      role: "assistant";
      content: AiResponse;
    };
```

## Important idea

The `role` tells us what kind of message we are dealing with.

```text
role === "user"
→ content is a string

role === "assistant"
→ content is an AiResponse object
```

This allows TypeScript and React to render the two message types differently.

---

# 4. Messages State

Conversation history is stored in:

```tsx
const [messages, setMessages] = useState<AiMessage[]>([]);
```

The state is an array because a conversation contains multiple messages.

Example:

```text
[
  user message,
  assistant response,
  user message,
  assistant response
]
```

---

# 5. Adding User Messages

When the user submits a question:

```tsx
setMessages((prevMessages) => [
  ...prevMessages,
  { role: "user", content: question.trim() },
]);
```

The previous messages are preserved and the new user message is appended.

The functional updater is used because the new state depends on the previous state.

The input is then cleared:

```tsx
setQuestion("");
```

---

# 6. Adding Assistant Messages

After the simulated AI response has finished:

```tsx
setMessages((prevMessages) => [
  ...prevMessages,
  { role: "assistant", content: finalResponse },
]);
```

This adds the structured AI response to the same conversation history.

---

# 7. Removing Duplicate `response` State

Originally, the latest AI response was stored separately:

```tsx
const [response, setResponse] = useState<AiResponse | null>(null);
```

Once `messages` became the conversation source of truth, this separate state was no longer necessary.

The duplicate state and its setters were removed.

The important reasoning was:

```text
Before:
response → latest AI response
messages → conversation

After:
messages → complete conversation
```

Keeping both would mean storing the same information in two places.

---

# 8. Rendering Conversation History

The conversation is rendered with:

```tsx
messages.map((message, index) => {
```

The message role determines the UI.

## User message

```tsx
if (message.role === "user") {
  return (...);
}
```

The user message is rendered as a right-aligned chat bubble.

## Assistant message

```tsx
if (message.role === "assistant") {
  return (...);
}
```

The assistant message is rendered as a structured research response card.

This is the practical use of the `role` discriminant.

---

# 9. Conversation Spacing

The messages were wrapped in:

```tsx
<div className="flex flex-col gap-4">
```

This creates consistent vertical spacing between conversation messages.

The conversation now visually behaves like:

```text
User message
      ↓
AI response
      ↓
User follow-up
      ↓
AI response
```

---

# 10. Follow-up Questions

The component checks whether there are already messages:

```tsx
const isFollowUp = messages.length > 0;
```

If previous messages exist, a different mock response is generated.

The follow-up response begins with:

```text
Building on our previous discussion...
```

This demonstrates the concept of conversational context on the frontend.

This is still simulated data; it is not yet connected to a real AI backend.

---

# 11. Error Handling

The AI status type already included:

```tsx
type AiStatus =
  | "idle"
  | "processing"
  | "streaming"
  | "complete"
  | "error";
```

An intentional test condition was added:

```tsx
const shouldFail =
  question.trim().toLowerCase().includes("error");
```

Then:

```tsx
if (shouldFail) {
  setStatus("error");
  return;
}
```

This gives us a predictable way to test the error state without randomly failing requests.

---

# 12. Error UI

The error state was rendered explicitly:

```tsx
{status === "error" && (
  <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
    Something went wrong. Please try again.
  </div>
)}
```

The important lesson:

```text
Setting state alone is not enough.

setStatus("error")
        ↓
React rerenders
        ↓
UI must have a condition for "error"
        ↓
Error message appears
```

---

# 13. AI Assistant Product Positioning

A product-specific header was added:

```text
AI Research Assistant
Your AI copilot for understanding and synthesizing scientific evidence.
```

This was chosen to match BioCollab's product vision.

The AI Assistant is positioned as a **research copilot**, rather than simply another research-search page.

---

# 14. AI Response Identity

Assistant responses now display:

```text
BioCollab AI    Research Copilot
```

This creates a clear distinction between user messages and AI-generated content.

The label also reinforces the product's AI-copilot identity.

---

# 15. AI Response Card

Assistant responses were styled as cards:

```tsx
className="rounded-2xl border border-border bg-card p-5 shadow-sm"
```

The goal was to make the structured response feel like a deliberate research workspace component rather than raw text.

---

# 16. AI Answer Typography

The main answer was changed to:

```tsx
<p className="text-sm leading-6 text-foreground">
  {message.content.answer}
</p>
```

This improves readability through:

- controlled font size
- better line height
- clear foreground text

---

# 17. Key Findings and Limitations

The section headings were given spacing and hierarchy.

The lists use:

```tsx
<ul className="space-y-2">
```

Each item was changed into a small bullet layout:

```tsx
<li className="flex gap-2 text-sm leading-5 text-muted-foreground">
  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
  <span>{finding}</span>
</li>
```

The same structure is used for limitations.

This makes the content visually read as actual lists instead of separate lines of text.

---

# 18. Evidence Card Presentation

Evidence items were turned into individual cards:

```tsx
<li
  className="rounded-xl border border-border bg-background p-4 transition-colors hover:bg-muted/40"
>
```

Evidence cards now have:

- individual boundaries
- internal padding
- subtle hover feedback
- separation from other evidence items

The evidence list uses:

```tsx
<ul className="space-y-3">
```

This adds visible spacing between cards.

---

# 19. Evidence Metadata Hierarchy

The paper title was changed to:

```tsx
<h3 className="text-sm font-semibold leading-5">
  {evidence.title}
</h3>
```

Authors:

```tsx
<p className="mt-1 text-xs text-muted-foreground">
  {evidence.authors.join(", ")}
</p>
```

Journal and date:

```tsx
<p className="mt-1 text-xs text-muted-foreground">
  {evidence.journal} · {evidence.publicationDate}
</p>
```

This creates a clear hierarchy:

```text
Paper title
Authors
Journal · Date
```

---

# 20. Evidence Source Type

The existing type:

```tsx
sourceType: "paper" | "study" | "guideline";
```

was surfaced in the UI as research metadata.

The final presentation uses:

```text
PAPER · Evidence source
```

This was deliberately chosen instead of a generic SaaS-style status badge because BioCollab is a scientific/research product.

---

# 21. Evidence Relevance

The relevance text was changed to:

```tsx
<p className="mt-3 text-sm leading-5 text-muted-foreground">
  {evidence.relevance}
</p>
```

This gives the explanation its own visual block and spacing.

---

# 22. Evidence Actions

The evidence actions were grouped into a row:

```tsx
<div className="mt-4 flex items-center gap-3">
```

The source link uses:

```tsx
className="text-sm font-medium text-primary hover:underline"
```

The save button uses:

```tsx
className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
```

The result is:

```text
View Source    [Save to Workspace]
```

---

# 23. Save Evidence Behavior

The save state remains:

```tsx
const [savedEvidenceIds, setSavedEvidenceIds] =
  useState<string[]>([]);
```

The toggle logic:

```tsx
setSavedEvidenceIds((prevIds) => {
  if (prevIds.includes(evidenceId)) {
    return prevIds.filter((id) => id !== evidenceId);
  }

  return [...prevIds, evidenceId];
});
```

The UI changes between:

```text
Save to Workspace
```

and:

```text
Saved ✓
```

---

# 24. DOI Fallback

Evidence source handling remains:

```tsx
const sourceUrl =
  evidence.url ??
  (evidence.doi
    ? `https://doi.org/${evidence.doi}`
    : null);
```

Meaning:

```text
URL exists
→ use URL

No URL but DOI exists
→ build DOI URL

Neither exists
→ no source link
```

This was tested during the AI Assistant work.

---

# 25. Streaming Presentation

The streaming response was given the same visual language as a completed AI response.

It uses an AI response card with:

```text
BioCollab AI    Research Copilot
```

and:

```tsx
{streamedText}
<span className="ml-1 animate-pulse">▌</span>
```

The cursor now visually blinks during streaming.

No JavaScript timer was needed for the blinking effect.

---

# 26. Processing and Streaming Status UI

Processing:

```tsx
{status === "processing" && (
  <div className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
    Analysing your question...
  </div>
)}
```

Streaming:

```tsx
{status === "streaming" && (
  <div className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
    Generating response...
  </div>
)}
```

The states now have intentional visual treatment rather than appearing as plain text.

---

# 27. Input Composer

The input form was styled as a card:

```tsx
className="rounded-2xl border border-border bg-card p-4 shadow-sm"
```

Textarea:

```tsx
className="min-h-24 w-full resize-none rounded-xl border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
```

The helper text remains:

```text
Enter to submit · Shift + Enter for a new line
```

The submit button uses:

```tsx
transition-opacity hover:opacity-90
```

and retains disabled behavior.

---

# 28. Keyboard Interaction

The existing keyboard behavior was preserved:

```text
Enter
→ submit

Shift + Enter
→ new line
```

The implementation uses:

```tsx
e.currentTarget.form?.requestSubmit();
```

Flow:

```text
Enter
↓
requestSubmit()
↓
form onSubmit
↓
handleSubmit()
```

---

# 29. Responsive Workspace Fix

During responsive testing, the AI Assistant became too narrow on mobile.

The problem was not primarily the AI cards.

The parent Workspace layout had a fixed two-column grid:

```tsx
grid-cols-[240px_1fr]
```

This meant the sidebar continued consuming 240px even on very narrow screens.

---

# 30. Responsive Grid Solution

The Workspace grid was changed to:

```tsx
grid-cols-1 md:grid-cols-[240px_1fr]
```

Meaning:

```text
Mobile
→ one column

Medium screens and above
→ 240px sidebar + content
```

This was the important fix for the mobile layout.

The first attempted class accidentally kept the fixed grid as an unconditional class, so nothing changed. The class was then corrected to make the 240px layout conditional with `md:`.

---

# 31. AI Assistant Width

The AI Assistant outer container uses:

```tsx
mx-auto min-h-full flex w-full max-w-4xl flex-col gap-6 p-6
```

This provides:

- full available width
- maximum readable width on larger screens
- centered content
- consistent spacing
- padding around the feature

---

# 32. Responsive Testing

The interface was tested at multiple viewport widths, including approximately:

```text
352px
500px
544px
760px
desktop
```

The major mobile problem was resolved.

At very small widths the interface naturally becomes dense, but there was no obvious horizontal overflow or broken card structure.

The final result was considered acceptable for the frontend checkpoint.

---

# 33. Final Functional Check

The complete AI Assistant flow was tested.

### Normal question

```text
Question
→ processing
→ streaming
→ complete response
```

### Follow-up

```text
Question
→ response
→ follow-up question
→ follow-up response
```

### Error

```text
Question containing "error"
→ error state
→ visible error message
```

### Evidence

```text
Evidence
→ View Source
→ DOI fallback when needed
→ Save to Workspace
→ Saved ✓
```

### Responsive

```text
Desktop
→ checked

Mobile
→ checked
```

---

# 34. Final Architecture After This Work

The AI Assistant now follows this frontend model:

```text
User interaction
        ↓
Component state
        ↓
Event handler
        ↓
Processing state
        ↓
Streaming simulation
        ↓
Structured response
        ↓
messages state
        ↓
Conditional rendering
        ↓
User action / follow-up
```

Conversation state is now the central source of truth for the chat history.

---

# 35. What Was Learned

## React

- State can represent an entire conversation.
- Arrays are useful for ordered UI history.
- Discriminated unions make conditional rendering type-safe.
- Derived UI should be calculated from state rather than duplicated into more state.
- Functional state updates are important when the next state depends on the previous state.
- Conditional rendering controls which UI state is visible.

## JavaScript

- `async` / `await` can model sequential asynchronous work.
- A loop can await each simulated streaming chunk.
- Arrays can be updated immutably with spread and filtering.
- String normalization can create a simple predictable test condition.

## TypeScript

- Union types constrain valid values.
- Discriminated unions allow TypeScript to narrow `message.content` based on `message.role`.
- Nullable values such as `url: string | null` require explicit handling.

## Frontend Architecture

- The parent layout can be the cause of a responsive problem inside a child feature.
- Styling should support information hierarchy rather than add decoration.
- Error, loading, and streaming states are part of the UI architecture, not afterthoughts.
- A feature should be tested as a complete interaction flow rather than only checking the final screen.

---

# 36. Result

The BioCollab AI Assistant moved from a single-response prototype toward a **presentable conversational research-copilot frontend**.

Completed in this checkpoint:

- [x] Conversation history
- [x] User/assistant message model
- [x] Role-based rendering
- [x] Follow-up interaction
- [x] Removed duplicate response state
- [x] Error simulation
- [x] Error UI
- [x] AI response presentation
- [x] Findings/limitations presentation
- [x] Evidence-card presentation
- [x] Evidence source type
- [x] Evidence spacing
- [x] Evidence actions
- [x] Streaming presentation
- [x] Blinking streaming cursor
- [x] Composer styling
- [x] Responsive Workspace layout
- [x] Responsive testing

## Checkpoint Status

**Sep 5 — AI Interaction + Follow-up + Presentation + Responsiveness: COMPLETE**

Next planned work:

**React Hook Form + Zod**
