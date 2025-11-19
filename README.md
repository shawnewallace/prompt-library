# Prompt Library

A personal collection of prompts, agent definitions, and instructions for AI development tools, organized by scenario and context.

## Overview

This library contains curated prompts and configurations for various AI coding assistants:
- **Claude Code** - Custom instructions, agents, and slash commands
- **GitHub Copilot** - Context-specific instructions
- **General Prompts** - Reusable prompts for various tasks

## Structure

```
prompt-library/
├── scenarios/          # Scenario-specific resources
├── shared/            # Cross-scenario resources
└── examples/          # Real-world usage examples
```

## Scenarios

### [.NET Clean Architecture](scenarios/dotnet-clean-architecture/)
Prompts and tools for building .NET applications with Clean Architecture, Domain-Driven Design, and SOLID principles.

**Use when:**
- Building enterprise .NET applications
- Implementing DDD patterns
- Following Clean Architecture principles
- Writing unit tests with TDD

### [Python Data Science](scenarios/python-data-science/)
Resources for data analysis, machine learning, and scientific computing projects.

**Use when:**
- Working with pandas, numpy, scikit-learn
- Building ML models and pipelines
- Data exploration and visualization
- Jupyter notebook development

### [TypeScript Frontend](scenarios/typescript-frontend/)
Tools for modern frontend development with TypeScript/JavaScript frameworks.

**Use when:**
- Building React, Vue, or Angular applications
- Working with TypeScript
- Frontend testing and component development
- State management and API integration

### [DevOps Infrastructure](scenarios/devops-infrastructure/)
Prompts for infrastructure as code, CI/CD, and deployment automation.

**Use when:**
- Writing Terraform, CloudFormation, or other IaC
- Setting up CI/CD pipelines
- Container and Kubernetes configuration
- Deployment and monitoring scripts

## Shared Resources

The [`shared/`](shared/) directory contains resources used across multiple scenarios:
- **prompts/** - General-purpose prompts (code review, documentation, debugging)
- **templates/** - Reusable prompt templates
- **snippets/** - Common prompt fragments

## Usage

1. **Select a scenario** based on your current project context
2. **Configure your tools** with the scenario-specific instructions
3. **Use the prompts** as needed for specific tasks
4. **Refer to examples** to see real-world applications

### For Claude Code
Copy instructions from `scenarios/{scenario}/claude-code/instructions.md` to your Claude Code configuration or use slash commands from the `commands/` folder.

### For GitHub Copilot
Copy content from `scenarios/{scenario}/github-copilot/instructions.md` to `.github/copilot-instructions.md` in your project.

## Contributing

Feel free to add new scenarios, prompts, or improvements. Each scenario should include:
- A descriptive README
- Tool-specific configurations
- Example use cases

## License

Personal use - feel free to adapt for your own needs.
