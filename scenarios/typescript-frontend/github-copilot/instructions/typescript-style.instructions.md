---
applyTo: '**/*.{ts,tsx}'
---

# TypeScript Style

## Compiler Settings

- Always use `"strict": true` in `tsconfig.json`. Never disable strict checks to suppress errors — fix the root cause.
- Enable `"noUncheckedIndexedAccess": true` to catch unsafe array/object access.

## Types

- Never use `any`. Use `unknown` when the type is genuinely unknown, then narrow with type guards.
- Prefer `interface` for object shapes; use `type` for unions, intersections, and aliases.
- Use explicit return types on exported functions and hooks.
- Use `readonly` for props and data that should not be mutated.

```typescript
// Good
interface UserCardProps {
  readonly user: User;
  readonly onSelect: (id: string) => void;
}

// Bad
const UserCard = (props: any) => { ... }
```

## Naming

- Use `PascalCase` for components, types, interfaces, and enums.
- Use `camelCase` for variables, functions, and hooks.
- Prefix custom hooks with `use`: `useUserData`, `useFormState`.
- Suffix event handlers with the event: `handleClick`, `handleSubmit`.

## Imports

- Use named exports for components, utilities, and hooks. Avoid default exports except for pages/routes (framework convention).
- Group imports: framework → third-party → local. Use path aliases (`@/components/`) over deep relative paths.
- Do not import types at runtime — use `import type` for type-only imports.

```typescript
import type { FC } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
```

## Null Handling

- Prefer `??` (nullish coalescing) over `||` when the falsy cases of `0` and `""` are valid values.
- Use optional chaining `?.` rather than explicit null checks for property access chains.
- Model optional values explicitly with `T | null` or `T | undefined` — do not rely on falsy checks for type narrowing.
