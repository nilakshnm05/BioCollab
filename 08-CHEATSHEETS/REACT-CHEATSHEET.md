# React Cheatsheet

## Component

```tsx
function Card() {
  return <div>...</div>;
}

Props

Parent → Child

<Card title="Cancer Research" />
State
const [value, setValue] = useState(initialValue);
State Update
setValue(newValue);

State update → re-render.

Callback Prop
<Child onAction={handleAction} />
Conditional
condition && <Component />
condition ? <A /> : <B />
List
items.map(item => (
  <Card key={item.id} />
))
Key

Stable + unique among siblings.

Prefer:

key={item.id}
State Ownership

Ask:

Who needs this state?

Put it at the lowest common parent that needs to coordinate it.

Data Flow
Parent
  ↓ props
Child

Callbacks allow:

Child
  ↓ callback
Parent state update
  ↓
new props
  ↓
Child
