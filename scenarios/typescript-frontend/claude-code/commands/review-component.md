# Review Component

Review the component at `$ARGUMENTS` against the project's frontend standards.

Check for:

**TypeScript**
- [ ] No `any` types — all props, state, and return types are explicit
- [ ] Props interface uses `readonly` and is clearly defined
- [ ] Imports use `import type` for type-only imports

**React Patterns**
- [ ] Functional component with destructured props
- [ ] No class components or legacy lifecycle methods
- [ ] Custom hook used for any non-trivial state or effect logic
- [ ] `useEffect` dependency arrays are complete and correct
- [ ] No premature `memo`/`useMemo`/`useCallback` without profiling evidence

**Accessibility**
- [ ] Interactive elements use semantic HTML (`<button>`, not `<div onClick>`)
- [ ] Images have `alt` text
- [ ] Form inputs are associated with labels
- [ ] Keyboard navigation is possible for all interactive elements

**Test Coverage**
- [ ] Test file exists alongside the component
- [ ] Tests use RTL `getByRole` / `getByLabelText` queries (not class selectors)
- [ ] Happy path, empty state, and error state are covered

**General**
- [ ] Component is under ~150 lines; suggest splits if larger
- [ ] No hardcoded strings that should be constants or i18n keys
- [ ] No direct DOM manipulation outside of refs

For each failing check, provide a specific code example showing the issue and the corrected version.
