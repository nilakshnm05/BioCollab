# BioCollab --- Shared Collaboration State with React Context

## September 9, 2026

## Goal

Connect the BioCollab collaboration-request flow across the
`/discover` and `/workspace` routes.

The immediate product requirement was:

> A Member can express interest in a collaboration on Discover, and the
> resulting request must also be visible from the Workspace.

This introduced our first genuine cross-route shared-state problem.

---

## 1. The Product Problem

Initially, collaboration requests were stored inside `CollaborationSection`:

```text
/discover
    ↓
CollaborationSection
    ↓
requests
```

That worked for the Discover page because the component owned the state.

But `CollaborationView` lives on a different route:

```text
/discover                  /workspace
    ↓                          ↓
CollaborationSection    CollaborationView
    ↓                          ↓
requests                    ???
```

`CollaborationView` could not directly access the `requests` state owned by
`CollaborationSection`.

### Core lesson

> React state belongs to the component that declares it. That component can
> pass the state to its children, but unrelated/distant components do not
> automatically have access to it.

---

## 2. Local State vs Shared State

### Local state

The following state remains inside `CollaborationSection` because it is only
relevant to that part of the UI:

```text
selectedId
searchText
statusFilter
sortOrder
```

### Shared state

`requests` needs to be available to both:

```text
CollaborationSection
CollaborationView
```

Therefore it became shared application state.

### Important architecture rule

> Do not put all React state into Context.

Use local state when one component owns the concern.

Use shared state when multiple distant parts of the application genuinely need
the same state.

---

## 3. Why React Context

We introduced React Context because the request state needs to cross the
normal parent → child component boundary.

Mental model:

```text
                  App
                   │
       CollaborationProvider
                   │
          ┌────────┴────────┐
          ↓                 ↓
      /discover         /workspace
          ↓                 ↓
 CollaborationSection  CollaborationView
```

Think of the Provider as a **shared room**.

Components inside that room can access the shared information.

---

## 4. Context Type

Created:

```tsx
type CollaborationContextType = {
  requests: CollaborationRequest[];
  addRequest: (request: CollaborationRequest) => void;
};
```

This describes what the shared Context provides.

It contains two things:

```text
requests
    ↓
the current array of collaboration requests

addRequest()
    ↓
the function used to add a new request
```

The TypeScript type does not create the state.

It only describes the shape of the shared value.

---

## 5. `createContext`

Created:

```tsx
const CollaborationContext = createContext<
  CollaborationContextType | undefined
>(undefined);
```

Mental model:

```text
createContext()
      ↓
creates the shared container
```

The Context is initially allowed to be `undefined`.

The actual values are supplied later by the Provider.

### Important distinction

> Context is the mechanism/container for sharing the value.
> The Provider is the component that supplies the actual value.

---

## 6. CollaborationProvider

Created:

```tsx
type CollaborationProviderProps = {
  children: ReactNode;
};

export function CollaborationProvider({
  children,
}: CollaborationProviderProps) {
  const [requests, setRequests] = useState<CollaborationRequest[]>([]);

  function addRequest(request: CollaborationRequest) {
    setRequests((prevRequests) => [...prevRequests, request]);
  }

  return (
    <CollaborationContext.Provider value={{ requests, addRequest }}>
      {children}
    </CollaborationContext.Provider>
  );
}
```

### What the Provider does

The Provider:

1. Owns the `requests` state.
2. Owns the function that updates that state.
3. Places both into the Context.
4. Makes them available to its children.

Mental model:

```text
CollaborationProvider
        │
        ├── owns requests
        │
        ├── owns addRequest()
        │
        └── provides both through Context
```

---

## 7. `children`

The Provider receives:

```tsx
children
```

`children` means:

> Whatever React elements are placed inside the Provider.

For example:

```tsx
<CollaborationProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</CollaborationProvider>
```

Here, the entire application is inside the Provider.

Therefore both `/discover` and `/workspace` can consume the shared state.

---

## 8. Context Provider Value

The key line is:

```tsx
<CollaborationContext.Provider value={{ requests, addRequest }}>
```

Read it as:

> "Make `requests` and `addRequest` available to everything inside me."

Conceptually:

```text
CollaborationProvider
        │
        │ provides
        ↓
┌───────────────────────┐
│ requests              │
│ addRequest()          │
└───────────────────────┘
        │
        ↓
     children
```

---

## 9. Custom Hook: `useCollaboration`

Created:

```tsx
export function useCollaboration() {
  const context = useContext(CollaborationContext);

  if (!context) {
    throw new Error(
      "useCollaboration must be used within CollaborationProvider"
    );
  }

  return context;
}
```

The custom hook hides the Context implementation from consuming components.

Instead of writing:

```tsx
const context = useContext(CollaborationContext);
```

everywhere, components can write:

```tsx
const { requests, addRequest } = useCollaboration();
```

Mental model:

```text
useCollaboration()
       ↓
access CollaborationContext
       ↓
retrieve shared value
       ↓
return
requests
addRequest
```

---

## 10. Why the Error Check Exists

The hook contains:

```tsx
if (!context) {
  throw new Error(
    "useCollaboration must be used within CollaborationProvider"
  );
}
```

This protects against using the hook outside the Provider.

Without the Provider:

```text
useCollaboration()
       ↓
no Context value
       ↓
undefined
```

The explicit error makes the problem obvious during development.

---

## 11. Provider Placement

The application root was changed to:

```text
React.StrictMode
└── QueryClientProvider
    └── CollaborationProvider
        └── BrowserRouter
            └── App
```

The important relationship is:

```text
CollaborationProvider
        │
        └── BrowserRouter
                │
                └── App
                    │
             ┌──────┴──────┐
             ↓             ↓
        /discover      /workspace
```

The Provider is above both routes.

Therefore both routes can access the same request state.

---

## 12. Moving Request Ownership

Before Context:

```tsx
const [requests, setRequests] =
  useState<CollaborationRequest[]>([]);
```

inside `CollaborationSection`.

After Context:

```tsx
const { requests, addRequest } = useCollaboration();
```

inside `CollaborationSection`.

The local request state was removed.

The Provider now owns it.

### Before

```text
CollaborationSection
        │
        ├── requests
        └── setRequests()
```

### After

```text
CollaborationSection
        │
        └── useCollaboration()
                │
                ↓
       CollaborationProvider
                │
                ├── requests
                └── addRequest()
```

---

## 13. Updating the Request

Previously:

```tsx
setRequests((prevRequests) => [...prevRequests, newRequest]);
```

After Context:

```tsx
addRequest(newRequest);
```

The request creation logic remains inside `CollaborationSection`.

The state ownership moved to the Provider.

Flow:

```text
User clicks Express Interest
          ↓
handleExpressInterest()
          ↓
create newRequest
          ↓
addRequest(newRequest)
          ↓
Provider updates requests
          ↓
Context value changes
          ↓
consuming components re-render
```

---

## 14. Consuming the Shared State in Workspace

`CollaborationView` now uses:

```tsx
const { requests } = useCollaboration();
```

The pending request count is derived from:

```tsx
pendingRequests: requests.length
```

Therefore the Workspace is no longer using a hard-coded request count.

Architecture:

```text
/discover
    ↓
addRequest()
    ↓
CollaborationProvider
    ↓
requests
    ↓
/workspace
    ↓
requests.length
```

---

## 15. Practical Proof

Test performed:

```text
1. Open Discover
2. Open a collaboration
3. Click Express Interest
4. UI changes to Interest Sent - Pending
5. Navigate to Workspace
6. Open Collaboration
7. Pending Requests changes to 1
```

Result:

> The request created on `/discover` was successfully visible on
> `/workspace`.

This proved that both routes were consuming the same shared state.

---

## 16. Cross-Route Data Flow

Final request flow:

```text
                         CollaborationProvider
                                  │
                                  │
                              requests
                                  │
                    ┌─────────────┴─────────────┐
                    ↓                           ↓
               /discover                   /workspace
                    ↓                           ↓
        CollaborationSection           CollaborationView
                    │                           │
                    │                           │
             addRequest()                  requests.length
                    │
                    ↓
              request added
```

---

## 17. State Ownership Mental Model

The important question is not:

> "Should I use Context?"

The better question is:

> "Who actually needs this state?"

For BioCollab:

```text
selectedId
    ↓
CollaborationSection only
    ↓
local state

searchText
    ↓
CollaborationSection only
    ↓
local state

statusFilter
    ↓
CollaborationSection only
    ↓
local state

sortOrder
    ↓
CollaborationSection only
    ↓
local state

requests
    ↓
Discover + Workspace
    ↓
shared state
```

---

## 18. Context vs TanStack Query

We now have two different state-management concepts in BioCollab.

### TanStack Query

Used for **server state**.

Example:

```text
OpenAlex research
    ↓
API
    ↓
TanStack Query
    ↓
cached Research[]
```

TanStack Query manages:

```text
fetching
loading
errors
caching
pagination
refetching
synchronization
```

### React Context

Currently used for **shared client-side state**.

Example:

```text
Collaboration requests
    ↓
CollaborationProvider
    ↓
shared across Discover + Workspace
```

### Core distinction

```text
Server state
    ↓
TanStack Query

Shared client state
    ↓
React Context

Component-local UI state
    ↓
useState
```

This is a temporary frontend architecture for the mock collaboration flow.

Once a real backend exists, collaboration requests will become server data
and the architecture can evolve accordingly.

---

## 19. What We Deliberately Did NOT Do

We did not:

- add Zustand just because it was on the roadmap
- add Redux
- move every piece of UI state into Context
- persist requests in localStorage
- create a fake backend
- introduce unnecessary abstractions
- redesign the Collaboration UI
- build notifications
- build saved Members
- add elaborate animations

### Why?

The goal is to solve the actual product requirement with the smallest
appropriate architecture.

> Introduce technology because the product requires it, not because the
> technology exists on a checklist.

---

## 20. Current Product State

The collaboration flow currently supports:

```text
Member
  ↓
Discover opportunity
  ↓
View details
  ↓
Express Interest
  ↓
Pending Request
  ↓
Shared across routes
  ↓
Workspace shows pending request count
```

The request model is:

```ts
CollaborationRequest {
  id
  collaborationId
  memberId
  status
  createdAt
}
```

Current request statuses:

```text
pending
accepted
rejected
```

The next product requirement is to make the Workspace creator actually see
incoming requests and accept or reject them.

---

## 21. Next Step

Next we need to complete the other half of the collaboration lifecycle:

```text
Member expresses interest
        ↓
PENDING
        ↓
Creator sees incoming request
        ↓
┌───────┴────────┐
↓                ↓
ACCEPT          REJECT
↓
ACTIVE
COLLABORATION
```

This will extend the Context with request-status updates and turn the current
request counter into a real interaction.

---

## Final Takeaway

> React Context is not a replacement for `useState`.

> It is a mechanism for making state and actions available to multiple
> components that need to share them.

For BioCollab:

```text
Provider
    ↓
owns shared state

Context
    ↓
makes the value available

useCollaboration()
    ↓
lets components consume it
```

The key architecture decision was:

```text
Local concern
    → local state

Shared client concern
    → Context

Server concern
    → TanStack Query
```

And the Context implementation was introduced because the product flow
created a real cross-route shared-state requirement.
