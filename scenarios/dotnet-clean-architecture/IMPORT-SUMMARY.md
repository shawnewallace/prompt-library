# Import Summary - MyTime Project

This document tracks the prompts and instructions imported from the MyTime project's GitHub Copilot configuration.

**Import Date:** 2025-11-19
**Source:** `/Users/shawn/src/PERSONAL/MyTime/.github`
**Project Type:** Full-stack .NET API backend with React frontend
**AI Tool:** GitHub Copilot (primary)

## Files Imported

### GitHub Copilot Main Instructions (1 file)
Located in: `github-copilot/`

1. **instructions.md** - Main GitHub Copilot configuration that references contextual instruction files

### GitHub Copilot Contextual Instructions (5 files)
Located in: `github-copilot/instructions/`

These are referenced by the main instructions.md:

1. **clean-architecture.instructions.md** - Clean Architecture principles and layer separation rules
2. **coding-style-csharp.instructions.md** - C# coding style guidelines and conventions
3. **domain-driven-design.instructions.md** - DDD patterns, entities, value objects, aggregates
4. **object-calisthenics.instructions.md** - Object-oriented design rules and constraints
5. **unit-and-integration-tests.instructions.md** - Testing strategies and best practices

### GitHub Copilot Chat Modes (2 files)
Located in: `github-copilot/chatmodes/`

1. **api-architect.chatmode.md** - API design and implementation guidance with resilience patterns (circuit breaker, bulkhead, throttling, backoff)
2. **expert-dotnet-software-engineer.chatmode.md** - .NET development expertise and patterns

### Prompts (2 files)
Located in: `prompts/`

1. **architecture-modernization-checklist.md** - Checklist for modernizing architecture
2. **comprehensive-test-plan.md** - Testing strategy and plan template

## Universal Files Moved to Shared

The following files were moved to `../../shared/` because they apply across multiple scenarios:

### Instructions (2 files → shared/github-copilot/instructions/)
1. **conventional-commits.instructions.md** - Git commit message formatting (universal)
2. **follow-up-question.instructions.md** - Guidelines for asking clarifying questions (universal)

### Chat Modes (2 files → shared/github-copilot/chatmodes/)
1. **plan.chatmode.md** - Planning and task breakdown mode (universal)
2. **architect.chatmode.md** - Software architecture and design decisions (universal)

### Prompts (2 files → shared/prompts/)
1. **create-architectural-decision-record.prompt.md** - ADR creation template (universal)
2. **create-readme.prompt.md** - README generation prompt (universal)

## Classification Summary

**Total Files Imported:** 16

**Scenario-Specific (in dotnet-clean-architecture/):**
- Main Copilot Config: 1
- Contextual Instructions: 5
- Chat Modes: 2
- Prompts: 2

**Universal (moved to shared/):**
- Instructions: 2
- Chat Modes: 2
- Prompts: 2

## File Organization

```
scenarios/dotnet-clean-architecture/
├── github-copilot/
│   ├── instructions.md              # Main Copilot file
│   ├── instructions/                # Contextual instructions (5 files)
│   └── chatmodes/                   # Scenario-specific modes (2 files)
├── prompts/                         # Scenario-specific prompts (2 files)
├── README.md
└── IMPORT-SUMMARY.md

shared/
├── github-copilot/
│   ├── instructions/                # Universal instructions (2 files)
│   └── chatmodes/                   # Universal modes (2 files)
└── prompts/                         # Universal prompts (2 files)
```

## Usage Notes

All imported files are from a GitHub Copilot configuration for a full-stack project with:
- .NET backend API following Clean Architecture and DDD
- React frontend
- SOLID principles and Object Calisthenics
- Test-Driven Development (TDD)
- C# coding standards
- Comprehensive testing strategy

The main `instructions.md` file references the contextual instruction files, creating a modular and maintainable GitHub Copilot configuration.
