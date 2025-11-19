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

## Related Prompt Libraries

This library is inspired by and complements these excellent prompt resources:

### Official AI Provider Libraries

- **[Anthropic Prompt Library](https://docs.anthropic.com/claude/prompt-library)** - Official collection of prompts for Claude, covering coding, analysis, and creative tasks
- **[OpenAI Cookbook](https://github.com/openai/openai-cookbook)** - Examples and guides for using OpenAI APIs effectively
- **[Google AI Prompt Gallery](https://ai.google.dev/examples)** - Prompt examples for Gemini and other Google AI models

### Community Collections

- **[Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts)** - Curated list of ChatGPT prompts for various use cases
- **[Awesome Prompts](https://github.com/ai-boost/awesome-prompts)** - Large collection of prompts for different AI models and scenarios
- **[LangChain Prompt Templates](https://python.langchain.com/docs/modules/model_io/prompts/)** - Reusable prompt templates for LangChain applications

### Developer-Focused

- **[GitHub Copilot Patterns](https://github.blog/developer-skills/github/how-to-write-better-prompts-for-github-copilot/)** - Best practices for writing Copilot prompts
- **[Cursor Rules](https://github.com/pontusab/cursor.directory)** - Community-sourced rules and prompts for Cursor IDE
- **[Prompt Engineering Guide](https://www.promptingguide.ai/)** - Comprehensive guide to prompt engineering techniques

### System Prompts & Instructions

- **[Awesome System Prompts](https://github.com/abilzerian/Awesome-System-Prompts)** - Collection of system prompts for various AI assistants
- **[ChatGPT System Prompts](https://github.com/mustvlad/ChatGPT-System-Prompts)** - System prompts for different personas and use cases

## Quick Start: Common Prompts

Ready-to-use prompts for everyday development tasks. Copy and paste these directly into your AI assistant.

### Code Review

```
Review the following code for:
- Code quality and readability
- Best practices and design patterns
- Potential bugs or edge cases
- Performance considerations
- Security vulnerabilities
- Test coverage gaps

[Paste your code here]
```

### Debugging & Bug Fixing

```
I'm encountering the following issue:

**Problem:** [Describe the bug/error]
**Expected behavior:** [What should happen]
**Actual behavior:** [What's actually happening]
**Error messages:** [Any error output]

**Code:**
[Paste relevant code]

**Context:**
[Environment, dependencies, recent changes]

Please help me:
1. Identify the root cause
2. Suggest a fix
3. Explain why this is happening
4. Recommend how to prevent similar issues
```

### Writing Tests

```
Generate comprehensive unit tests for the following code:

[Paste your code here]

Requirements:
- Test happy path scenarios
- Test edge cases and error conditions
- Test boundary values
- Include setup and teardown if needed
- Use [specify testing framework: Jest/pytest/xUnit/etc.]
- Follow [specify pattern: AAA/Given-When-Then/etc.]
- Aim for high code coverage
```

### Documentation

```
Create documentation for the following code:

[Paste your code here]

Please provide:
1. Clear description of what the code does
2. Parameter/argument descriptions
3. Return value documentation
4. Usage examples
5. Any important notes or warnings
6. Dependencies or prerequisites

Format: [Markdown/JSDoc/XML Documentation Comments/etc.]
```

### Refactoring

```
Refactor the following code to improve:
- Readability and maintainability
- Performance
- Adherence to SOLID principles
- Design patterns usage
- Code organization

[Paste your code here]

Please:
1. Explain what needs improvement
2. Provide the refactored version
3. Explain the changes and why they're better
```

### Explain Code

```
Explain the following code in detail:

[Paste your code here]

Please provide:
1. High-level overview of what it does
2. Step-by-step breakdown of the logic
3. Explanation of any complex algorithms or patterns
4. Purpose of each major component
5. How it fits into the larger system (if context provided)
```

## Contributing

Feel free to add new scenarios, prompts, or improvements. Each scenario should include:
- A descriptive README
- Tool-specific configurations
- Example use cases

## License

Personal use - feel free to adapt for your own needs.
