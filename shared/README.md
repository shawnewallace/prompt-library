# Shared Resources

Cross-scenario resources that can be used across different project contexts.

## Structure

### agents/
Reusable agent definitions for AI coding assistants:
- **clarity-editor** - Review and improve writing clarity using Orwell principles
- **check** - Code review focusing on standards and best practices
- **architect** - Software architecture guidance and design decisions
- **api-architect** - API design and architecture recommendations
- **plan** - Project planning and task breakdown
- **expert-dotnet-software-engineer** - Expert .NET development guidance

### prompts/
General-purpose prompts applicable to multiple scenarios:
- Code review guidelines
- Documentation generation
- Debugging strategies
- Refactoring patterns
- Writing clarity review (Orwell principles)
- General best practices

### templates/
Reusable prompt templates that can be customized for specific needs:
- System prompt templates
- Task-specific prompt structures
- Agent definition templates

### snippets/
Common prompt fragments that can be composed into larger prompts:
- Code style requirements
- Testing expectations
- Documentation standards
- Security considerations

## Usage

These resources are designed to be combined with scenario-specific prompts or used standalone for general tasks.

### Example
You might combine a shared code review prompt with scenario-specific architectural guidelines from `scenarios/dotnet-clean-architecture/`.
