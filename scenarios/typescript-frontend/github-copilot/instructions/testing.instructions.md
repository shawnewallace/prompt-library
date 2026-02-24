---
applyTo: '**/*.{test,spec}.{ts,tsx}'
---

# Testing

## Framework

- Use **Jest** + **React Testing Library (RTL)**. Do not use Enzyme or direct DOM manipulation.
- Place test files alongside the component they test: `UserCard.test.tsx` next to `UserCard.tsx`.

## Core Principle: Test Behaviour, Not Implementation

- Query the DOM the way a user would: by role, label, or visible text.
- Do not test internal state, call counts on private functions, or CSS class names.
- If a refactor that doesn't change behaviour breaks a test, the test is testing implementation.

## Queries

- Prefer queries in this order: `getByRole` → `getByLabelText` → `getByPlaceholderText` → `getByText` → `getByTestId`.
- Use `getByTestId` only as a last resort; it couples tests to markup structure.

```typescript
// Good
const button = screen.getByRole('button', { name: /submit/i });

// Avoid
const button = container.querySelector('.submit-btn');
```

## User Interactions

- Use `@testing-library/user-event` (`userEvent`) instead of `fireEvent` for realistic interaction simulation.
- Wrap async interactions and assertions in `await` with `waitFor` or `findBy*` queries.

```typescript
await userEvent.click(screen.getByRole('button', { name: /save/i }));
await screen.findByText('Saved successfully');
```

## Async

- Use `findBy*` queries for elements that appear asynchronously instead of `getBy*` + `waitFor`.
- Mock network requests at the handler level with `msw` (Mock Service Worker) rather than mocking `fetch` or `axios` directly.

## Structure

- Follow Arrange → Act → Assert.
- One logical assertion per test; multiple `expect` calls are fine when checking related properties.
- Use `describe` blocks to group tests for the same component or behaviour.
- Name tests as sentences: `it('shows an error message when the form is submitted empty')`.

## Coverage

- Target ≥ 80% branch coverage for `src/` components and hooks.
- Always test: happy path, empty/null state, loading state, and error state.
