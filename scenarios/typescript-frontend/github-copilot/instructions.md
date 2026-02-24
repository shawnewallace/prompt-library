# Copilot Instructions — TypeScript Frontend

## Language Policy

All instructions, prompts, and code comments intended for contributors must be written in English.

## Development Workflow

**IMPORTANT:** Always follow these steps when implementing new features or components:

1. Consult the relevant instructions files below and state which ones guided your implementation (e.g., `Instructions used: [typescript-style.instructions.md, react-patterns.instructions.md]`).

2. Follow TDD. Write tests before implementing components or hooks. Consult [Testing](./instructions/testing.instructions.md) for patterns.

3. Always run `npm test` (or `pnpm test` / `yarn test`) to verify tests pass before committing. Fix all TypeScript errors and ESLint warnings first.

4. Ensure components are accessible: use semantic HTML, proper ARIA attributes, and keyboard navigation.

## Instructions Files

| File | Purpose |
|------|---------|
| [typescript-style.instructions.md](./instructions/typescript-style.instructions.md) | Strict TypeScript, no `any`, explicit types |
| [react-patterns.instructions.md](./instructions/react-patterns.instructions.md) | Functional components, hooks, composition |
| [testing.instructions.md](./instructions/testing.instructions.md) | Jest + React Testing Library patterns |
