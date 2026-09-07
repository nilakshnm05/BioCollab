# Sep 6 — Forms + Validation with React Hook Form + Zod

## Goal

Build a real BioCollab Edit Profile form using React Hook Form and Zod, with typed form data, validation, dynamic fields, error handling, and user-facing submission feedback.

---

## 1. Why React Hook Form?

React forms can become difficult to manage when they contain many fields, validation, validation errors, dynamic fields, and submission handling.

React Hook Form (RHF) acts as the form manager.

Mental model:

```text
User input
    ↓
React Hook Form
    ↓
Validation
    ↓
Valid form data
    ↓
Submit
```

RHF manages form values, registration, submission, errors, and field state without manually creating separate React state for every input.

---

## 2. `useForm()`

We create the form manager with:

```tsx
const {
  register,
  handleSubmit,
  control,
  formState: { errors },
} = useForm<ProfileFormData>({
  resolver: zodResolver(profileSchema),
  defaultValues: {
    name: "",
    headline: "",
    institution: "",
    bio: "",
    researchAreas: [{ value: "" }],
    expertise: [{ value: "" }],
    collaborationInterests: [],
    location: "",
    profileVisibility: "public",
    website: "",
  },
});
```

Important pieces:

- `register` → connects inputs to RHF
- `handleSubmit` → handles form submission
- `control` → used by features such as `useFieldArray`
- `errors` → contains validation errors
- `resolver` → connects RHF to an external validation library
- `defaultValues` → defines the initial form state

---

## 3. `register()`

Example:

```tsx
<input {...register("name")} />
```

`register("name")` tells RHF that this input belongs to the `name` field.

The spread operator applies the registration props returned by RHF to the input.

For a dynamic field:

```tsx
<input {...register(`researchAreas.${index}.value`)} />
```

The path changes according to the current index.

---

## 4. `handleSubmit()`

Our form:

```tsx
<form onSubmit={handleSubmit(onSubmit)}>
```

Flow:

```text
Submit
   ↓
handleSubmit()
   ↓
collect form values
   ↓
run validation
   ↓
valid?
 ┌───────┴───────┐
No               Yes
↓                 ↓
errors          onSubmit(data)
```

The application receives valid data through `onSubmit`.

---

## 5. Zod

Zod defines the rules for our profile form.

Example:

```ts
name: z.string().min(2, "Name must be at least 2 characters"),
```

This means:

- value must be a string
- minimum length is 2
- custom message is shown when validation fails

Our profile schema validates:

- name
- headline
- institution
- bio
- research areas
- expertise
- location
- collaboration interests
- profile visibility
- website

---

## 6. `zodResolver()`

RHF does not automatically know how to use our Zod schema.

The resolver acts as the bridge:

```tsx
resolver: zodResolver(profileSchema)
```

Mental model:

```text
RHF
  ↓
zodResolver
  ↓
Zod schema
  ↓
validation result
  ↓
RHF errors / valid data
```

---

## 7. `z.infer`

Instead of manually writing the TypeScript form type, we derive it from the schema:

```ts
export type ProfileFormData = z.infer<typeof profileSchema>;
```

This gives us one source of truth.

```text
Zod schema
     ↓
z.infer
     ↓
ProfileFormData
```

If the schema changes, the TypeScript form type changes with it.

Then:

```tsx
useForm<ProfileFormData>()
```

makes the form strongly typed.

---

## 8. Validation errors

RHF exposes errors through:

```tsx
formState: { errors }
```

For a normal field:

```tsx
{errors.name && (
  <p>{errors.name.message}</p>
)}
```

For a nested dynamic field:

```tsx
errors.researchAreas?.[index]?.value?.message
```

Mental model:

```text
errors
  ↓
researchAreas
  ↓
[index]
  ↓
value
  ↓
message
```

Optional chaining (`?.`) prevents accessing a missing nested error object.

---

## 9. Custom validation messages

Instead of exposing technical Zod messages such as:

```text
Too small: expected string to have >=2 characters
```

we use user-friendly messages:

```ts
z.string().min(2, "Name must be at least 2 characters")
```

This is part of production-quality form UX.

---

## 10. `useFieldArray`

Some profile fields are lists:

- research areas
- expertise
- collaboration interests

RHF provides `useFieldArray` for dynamic lists.

Mental model:

```text
useForm()
   ↓
control
   ↓
useFieldArray()
   ↓
fields / append / remove
```

Example:

```tsx
const { fields, append, remove } = useFieldArray({
  control,
  name: "researchAreas",
});
```

Then:

```tsx
fields.map((field, index) => ...)
```

Each field gets an RHF-generated `field.id`.

Use:

```tsx
key={field.id}
```

for React's list key.

---

## 11. `append()` and `remove()`

Add a field:

```tsx
append({ value: "" });
```

Remove a field:

```tsx
remove(index);
```

These operations update the RHF field array.

Buttons that modify the field array must use:

```tsx
type="button"
```

rather than `type="submit"`.

---

## 12. Dynamic field paths

For this data:

```ts
researchAreas: [
  { value: "Genomics" },
  { value: "Cancer Biology" }
]
```

RHF paths are:

```text
researchAreas.0.value
researchAreas.1.value
```

Therefore:

```tsx
register(`researchAreas.${index}.value`)
```

automatically creates the correct path for each item.

Important distinction:

```text
field.id
    ↓
React identity / reconciliation

register("researchAreas.0.value")
    ↓
RHF data path
```

They solve different problems.

---

## 13. Form representation vs domain representation

For RHF field arrays, we used:

```ts
researchAreas: [
  { value: "Genomics" },
  { value: "Cancer Biology" }
]
```

A backend/domain model might instead prefer:

```ts
researchAreas: [
  "Genomics",
  "Cancer Biology"
]
```

The representation used by a form does not have to be identical to the representation used by the domain or API.

Transformation can happen at the submission boundary when necessary.

---

## 14. Optional fields

A field being optional means it can be omitted/empty according to the schema.

For the website field, the browser sends an empty string when the user leaves an HTML input blank.

Therefore this:

```ts
website: z.url().optional()
```

does not fully match the HTML form behavior.

We changed it to:

```ts
website: z.union([z.url(), z.literal("")])
```

Now:

```text
"https://example.com" → valid
""                   → valid
"hello"              → invalid
```

This is a useful lesson about the difference between:

- `undefined`
- `""`
- valid values

---

## 15. `defaultValues`

We use `defaultValues` to initialize the form.

For dynamic required lists:

```ts
researchAreas: [{ value: "" }],
expertise: [{ value: "" }],
```

This means the user sees an initial field immediately instead of having to click "Add" before they can enter a required value.

Conceptually:

```text
defaultValues
     ↓
initial RHF state
     ↓
useFieldArray
     ↓
fields
     ↓
rendered inputs
```

---

## 16. Accessibility

Labels should be associated with their inputs.

Example:

```tsx
<label htmlFor="name">Name</label>

<input
  id="name"
  {...register("name")}
/>
```

For dynamic fields:

```tsx
<label htmlFor={`researchAreas-${index}`}>
  Research Area
</label>

<input
  id={`researchAreas-${index}`}
  {...register(`researchAreas.${index}.value`)}
/>
```

This improves usability and accessibility.

---

## 17. Submission feedback

Initially our submit handler only did:

```tsx
function onSubmit(data: ProfileFormData) {
  console.log(data);
}
```

That proves submission during development but gives the actual user no feedback.

We added a React state flag:

```tsx
const [isSaved, setIsSaved] = useState(false);
```

and:

```tsx
function onSubmit(data: ProfileFormData) {
  console.log(data);
  setIsSaved(true);
}
```

Then the UI displays:

```text
Profile saved successfully.
```

Final interaction:

```text
User submits
     ↓
validation
     ↓
valid
     ↓
onSubmit()
     ↓
setIsSaved(true)
     ↓
success feedback
```

---

## 18. Debugging lesson — circular JSON

During development, we tried to inspect RHF errors using:

```tsx
JSON.stringify(errors, null, 2)
```

This caused a runtime error because RHF error objects can contain a `ref` pointing to a DOM element, producing a circular structure.

Lesson:

> Not every JavaScript object can safely be passed to `JSON.stringify()`.

For debugging complex library objects, inspect them directly in DevTools rather than assuming they are JSON-serializable.

---

## 19. BioCollab architecture

The feature is not a generic demo form.

The product relationship is:

```text
User
 ├── Profile
 │     └── identity / research context
 │
 └── Workspace
       ├── Overview
       ├── Collaboration
       ├── Research
       └── AI Assistant
```

The Edit Profile form belongs to:

```text
App
 ↓
/profile
 ↓
ProfilePage
 ↓
EditProfileForm
 ↓
profileSchema
```

This keeps page routing, UI, and validation responsibilities separated.

---

## 20. What we implemented

BioCollab Edit Profile now supports:

- Name
- Headline
- Institution
- Bio
- Research Areas
- Expertise
- Location
- Collaboration Interests
- Profile Visibility
- Website

It also supports:

- typed form data
- Zod validation
- custom validation messages
- dynamic list fields
- adding/removing list items
- accessible labels
- placeholders
- default values
- validation error display
- successful submission feedback

---

## 21. Final mental model

```text
                PROFILE FORM
                     │
                     ▼
               React Hook Form
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
     register     fieldArray    errors
        │            │
        │       append/remove
        │            │
        └────────────┼────────────┘
                     ▼
                handleSubmit
                     │
                     ▼
               zodResolver
                     │
                     ▼
                Zod schema
                     │
              ┌──────┴──────┐
              ▼             ▼
           invalid         valid
              │             │
              ▼             ▼
            errors       onSubmit
                            │
                            ▼
                    success feedback
```

---

## Sep 6 Completion

### Concepts learned

- React Hook Form
- `useForm`
- `register`
- `handleSubmit`
- `control`
- `formState.errors`
- `defaultValues`
- `useFieldArray`
- `fields`
- `append`
- `remove`
- dynamic field paths
- Zod
- `zodResolver`
- `z.infer`
- nested validation errors
- optional chaining
- form vs domain representation
- optional HTML fields
- accessible labels
- submission feedback
- debugging circular objects

### Feature status

**BioCollab Edit Profile Form — COMPLETE ✅**

The feature demonstrates a realistic production-oriented React form rather than a tutorial-only example.
