---
applyTo: '**/*.tsx'
---

# React Patterns

## Components

- Use functional components exclusively. No class components.
- Keep components small and focused on a single responsibility. If a component exceeds ~150 lines, consider splitting it.
- Extract complex JSX into named sub-components or helper functions rather than inline expressions.
- Co-locate a component's styles, tests, and types in the same directory.

```
components/
  UserCard/
    UserCard.tsx
    UserCard.test.tsx
    UserCard.module.css   (or styles.ts)
    index.ts              (re-export)
```

## Props

- Define props as an `interface` in the same file as the component.
- Destructure props at the function signature level for clarity.
- Use `children: React.ReactNode` (not `JSX.Element`) for slot-style composition.
- Avoid boolean prop names that duplicate `is`/`has` unnecessarily — prefer `disabled` over `isDisabled`.

## Hooks

- Extract state and side-effect logic into custom hooks when used in more than one component, or when a single component's logic becomes hard to follow.
- Keep each hook focused: one concern per hook.
- Declare all hook dependencies accurately in `useEffect` and `useCallback` dep arrays — do not suppress the exhaustive-deps lint rule.
- Prefer `useReducer` over multiple `useState` calls when state transitions are interdependent.

## State Management

- Keep state as local as possible. Lift only when two or more siblings need it.
- Use React Context for cross-cutting concerns (theme, auth, locale) — not for frequently-updated state.
- For server state (fetching, caching, mutations), use a dedicated library (React Query, SWR) rather than manual `useEffect` + `useState`.

## Performance

- Do not add `memo`, `useMemo`, or `useCallback` prematurely — profile first.
- Use `key` props correctly on lists: stable, unique IDs, never array indices for dynamic lists.
- Lazy-load routes and heavy components with `React.lazy` + `Suspense`.

## Accessibility

- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`) rather than `<div>` with click handlers.
- Every interactive element must be keyboard-reachable and have a visible focus state.
- Images must have descriptive `alt` text. Decorative images use `alt=""`.
- Use `aria-label` or `aria-labelledby` when a label is not visually rendered.
