# Create Component

Scaffold a new React component named `$ARGUMENTS`.

Create the following files:

1. **`src/components/<ComponentName>/index.ts`** — re-export the component
2. **`src/components/<ComponentName>/<ComponentName>.tsx`** — the component implementation:
   - Functional component with a typed `Props` interface
   - `readonly` props
   - Semantic HTML structure
   - Proper accessibility attributes
3. **`src/components/<ComponentName>/<ComponentName>.test.tsx`** — test file with:
   - A render test (component renders without crashing)
   - A test for the primary interactive behaviour (if any)
   - A test for the empty/null/loading state (if applicable)

Follow the conventions in:
- `typescript-style.instructions.md` — strict types, named exports, no `any`
- `react-patterns.instructions.md` — functional components, prop interfaces, accessibility
- `testing.instructions.md` — RTL with `getByRole`, `userEvent`, behaviour-focused

After creating the files, summarize what was created and suggest 2–3 additional tests worth writing.
