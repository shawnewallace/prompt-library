# .NET Clean Architecture Scenario

Resources for building .NET applications following Clean Architecture, Domain-Driven Design, and SOLID principles.

**Source:** MyTime project - A full-stack application with .NET API backend and React frontend, configured for GitHub Copilot.

## When to Use This Scenario

- Building enterprise .NET applications with React frontends
- Implementing Domain-Driven Design patterns
- Following Clean Architecture principles (Entities, Use Cases, Interface Adapters, Frameworks)
- Applying SOLID principles and Object Calisthenics
- Writing comprehensive unit tests with TDD
- Working with C# 12+ features
- Using GitHub Copilot as your primary AI assistant

## Contents

### GitHub Copilot Main Instructions
Located in: `github-copilot/`

- **instructions.md** - Main GitHub Copilot instructions file that references the contextual instructions below

### GitHub Copilot Contextual Instructions
Located in: `github-copilot/instructions/`

These are referenced by the main `instructions.md` file:

- **clean-architecture.instructions.md** - Clean Architecture principles and layer separation
- **coding-style-csharp.instructions.md** - C# coding standards and conventions
- **domain-driven-design.instructions.md** - DDD patterns and tactical design
- **object-calisthenics.instructions.md** - Object-oriented design constraints
- **unit-and-integration-tests.instructions.md** - Testing strategies and TDD practices

### GitHub Copilot Agents
Located in: `github-copilot/agents/`

- **api-architect.agent.md** - API design with resilience patterns (circuit breaker, bulkhead, throttling)
- **expert-dotnet-software-engineer.agent.md** - .NET development expertise and best practices

### Prompts
Located in: `prompts/`

- **architecture-modernization-checklist.md** - Checklist for modernizing architecture
- **comprehensive-test-plan.md** - Testing strategy and plan template

### Universal Resources (in shared/)

See [../../shared/](../../shared/) for universal resources that work across scenarios:

- **Prompts:** ADR creation, README generation
- **Instructions:** Conventional commits, follow-up questions
- **Agents:** Planning, general architecture

## Key Concepts Covered

- Clean Architecture layers and dependencies
- Domain-Driven Design (Entities, Value Objects, Aggregates, Domain Events)
- CQRS and Repository patterns
- Unit of Work pattern
- Dependency Injection and Inversion of Control
- Object Calisthenics rules
- xUnit/NUnit testing patterns
- API resilience patterns (circuit breaker, bulkhead, backoff)

## Usage with GitHub Copilot

1. Copy `github-copilot/instructions.md` to your project's `.github/copilot-instructions.md`
2. Copy the `instructions/` folder to `.github/instructions/` in your project
3. Copy relevant agents to `.github/agents/` if supported by your Copilot setup
4. GitHub Copilot will automatically use these instructions for context

## Project Context

This scenario was extracted from the **MyTime** project, a full-stack application featuring:
- .NET backend API with Clean Architecture
- React frontend
- Domain-Driven Design implementation
- Comprehensive testing strategy
- GitHub Copilot integration

## Related Scenarios

- [DevOps Infrastructure](../devops-infrastructure/) - For deployment pipelines
- [TypeScript Frontend](../typescript-frontend/) - For React/frontend development
