# Copilot Instructions — Python Data Science

## Language Policy

All instructions, prompts, and code comments intended for contributors must be written in English.

## Development Workflow

**IMPORTANT:** Always follow these steps when implementing new features or analyses:

1. Consult the relevant instructions files below and state which ones guided your implementation (e.g., `Instructions used: [python-style.instructions.md, data-analysis.instructions.md]`).

2. Follow TDD where applicable. Write tests before implementing functions. Consult [Testing](./instructions/testing.instructions.md) for patterns.

3. Always run `pytest` to verify tests pass before committing. Fix all warnings and errors first.

4. Ensure notebooks are deterministic: set random seeds, avoid side effects between cells, and keep data paths relative.

## Instructions Files

| File | Purpose |
|------|---------|
| [python-style.instructions.md](./instructions/python-style.instructions.md) | PEP 8, type hints, docstrings, formatting |
| [data-analysis.instructions.md](./instructions/data-analysis.instructions.md) | pandas, numpy, visualization, reproducibility |
| [testing.instructions.md](./instructions/testing.instructions.md) | pytest patterns, fixtures, parametrize |
