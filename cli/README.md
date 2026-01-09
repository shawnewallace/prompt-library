# prompt-library CLI

> CLI tool to quickly install AI assistant agents and prompts from the [prompt-library](https://github.com/shawnewallace/prompt-library) repository.

Install agents like Hemingway (writing clarity), Archy (architecture), and Chester (code review) directly into your project with a simple command.

## Features

- 🚀 **Quick Setup** - Interactive wizard for easy installation
- 🎯 **Fuzzy Search** - Find items by name or partial match
- 📦 **Scenario Bundles** - Install pre-configured sets for specific workflows
- 🔄 **Multi-Tool Support** - Works with Claude Code and GitHub Copilot
- 📊 **Installation Tracking** - Keeps track of installed items
- ✨ **Smart Defaults** - Auto-detects your setup

## Requirements

- Node.js 18.0.0 or higher
- npm or npx

## Installation

```bash
# Install globally (recommended)
npm install -g @shawnwallace/prompt-library

# Or use with npx (no installation required)
npx @shawnwallace/prompt-library init
```

## Quick Start

### Interactive Setup

Start with the interactive wizard to set up your project:

```bash
prompt-library init
```

This will:
1. Ask which AI tool you're using (Claude Code or GitHub Copilot)
2. Optionally select a scenario template
3. Choose agents and prompts to install
4. Install files to the correct directories
5. Create a tracking file for your installation

### Browse Available Items

See all available agents, prompts, and scenarios:

```bash
prompt-library list
```

Filter by type:
```bash
prompt-library list --agents      # Show only agents
prompt-library list --prompts     # Show only prompts
prompt-library list --scenarios   # Show only scenarios
prompt-library list --installed   # Show only installed items
```

### Add Individual Items

Install a specific agent or prompt:

```bash
prompt-library add hemingway           # Writing clarity editor
prompt-library add archy               # Architecture planner
prompt-library add writing-clarity     # Writing review prompt
```

The command uses fuzzy search, so you can use partial names:
```bash
prompt-library add clarity    # Finds "clarity-editor" agent
```

## Available Items

### Agents

| Agent | Name | Description |
|-------|------|-------------|
| `hemingway` | Hemingway | Review and improve writing clarity using Orwell principles |
| `archy` | Archy | Architect and technical leader for strategic planning |
| `chester` | Chester | Code reviewer focusing on standards and best practices |
| `sharp` | Sharp | Expert .NET software engineer |
| `percy` | Percy | Strategic planning and architecture assistant |
| `apex` | Apex | API architect specialized in resilience patterns |

### Prompts

| Prompt | Name | Description |
|--------|------|-------------|
| `writing-clarity` | Writing Clarity Review | Review text using Orwell's six rules |
| `adr` | Architectural Decision Record | Create structured ADR documents |
| `readme` | README Generator | Create comprehensive README files |
| `client-discovery` | Client Discovery | Extract meeting details |

### Scenarios

Scenario bundles include multiple agents and prompts for specific workflows:

| Scenario | Description | Includes |
|----------|-------------|----------|
| `dotnet-clean-architecture` | .NET with Clean Architecture & DDD | Sharp, Archy, ADR prompt |
| `python-data-science` | Data science and ML projects | Percy, README prompt |
| `typescript-frontend` | React/Vue/Angular TypeScript apps | Archy, Chester, README |
| `devops-infrastructure` | IaC and CI/CD | Archy |

## Usage Examples

### Example 1: .NET Developer

```bash
# Install .NET scenario bundle
prompt-library add dotnet-clean-architecture

# Or manually select items
prompt-library init
# Select: Claude Code → None → Sharp, Archy → ADR
```

### Example 2: Content Creator

```bash
# Add writing tools
prompt-library add hemingway
prompt-library add writing-clarity

# Use in Claude Code
# "Use Hemingway to review this blog post"
```

### Example 3: Team Setup

```bash
# Initialize for the whole team
prompt-library init
# Select: GitHub Copilot → typescript-frontend

# Team members get: Archy, Chester, and README generator
```

## Commands

### `init`

Interactive setup wizard.

```bash
prompt-library init
```

Walks you through:
- AI tool selection
- Scenario or custom selection
- Agent and prompt selection
- Installation and tracking setup

### `list [options]`

List available items with installation status.

```bash
prompt-library list              # Show all items
prompt-library list --agents     # Agents only
prompt-library list --prompts    # Prompts only
prompt-library list --scenarios  # Scenarios only
prompt-library list --installed  # Installed items only
```

### `add <name>`

Add a specific agent, prompt, or scenario.

```bash
prompt-library add <name>
```

Supports fuzzy matching for item names.

### Options

```bash
-V, --version   # Show version number
-h, --help      # Show help for command
```

## How It Works

### Installation Locations

**Claude Code:**
```
.claude/
├── agents/
│   ├── hemingway.md
│   └── archy.md
└── prompts/
    └── writing-clarity.md
```

**GitHub Copilot:**
```
.github/
├── agents/
│   ├── hemingway.md
│   └── archy.md
└── prompts/
    └── writing-clarity.md
```

### Tracking File

The CLI creates `.prompt-library.json` to track installed items:

```json
{
  "version": "1.0.0",
  "tool": "claude-code",
  "installedAt": "2025-12-08T12:00:00Z",
  "items": {
    "agents": {
      "hemingway": {
        "name": "Hemingway",
        "version": "1.0.0",
        "installedAt": "2025-12-08T12:00:00Z",
        "sourcePath": "shared/agents/clarity-editor.agent.md",
        "targetPath": ".claude/agents/hemingway.md",
        "sha": "abc123..."
      }
    },
    "prompts": {}
  }
}
```

## Troubleshooting

### Command Not Found

If `prompt-library` command is not found after global installation:

```bash
# Check if npm global bin is in PATH
npm config get prefix

# Add to PATH (example for macOS/Linux)
export PATH="$(npm config get prefix)/bin:$PATH"

# Or use npx instead
npx @shawnwallace/prompt-library init
```

### Permission Errors

If you get permission errors during installation:

```bash
# Use npx (recommended)
npx @shawnwallace/prompt-library init

# Or fix npm permissions
sudo chown -R $USER $(npm config get prefix)
```

### Items Not Loading

After installation, restart your AI tool:
- **Claude Code**: Restart the CLI
- **GitHub Copilot**: Reload VS Code window

### Network Errors

The CLI fetches files from GitHub. If you have network issues:
- Check your internet connection
- Try again (the CLI has automatic retry logic)
- Files are fetched from: `https://raw.githubusercontent.com/shawnewallace/prompt-library/main/`

## Development

### Project Structure

```
cli/
├── bin/
│   └── prompt-library.js      # Executable entry point
├── src/
│   ├── commands/              # Command implementations
│   │   ├── init.js           # Interactive setup
│   │   ├── list.js           # List items
│   │   └── add.js            # Add items
│   ├── core/                  # Core utilities
│   │   ├── fetcher.js        # GitHub file fetching
│   │   ├── file-system.js    # File operations
│   │   ├── installer.js      # Installation logic
│   │   └── registry.js       # Item registry
│   ├── utils/                 # Helper utilities
│   │   └── logger.js         # Colored output
│   └── constants.js           # Configuration
├── .prompt-library/
│   └── registry.json          # Item catalog
└── package.json
```

### Local Development

```bash
# Clone the repository
git clone https://github.com/shawnewallace/prompt-library.git
cd prompt-library/cli

# Install dependencies
npm install

# Link for local testing
npm link

# Run commands
prompt-library --help
```

### Running Tests

```bash
npm test
```

## Contributing

Contributions are welcome! Please see the main [prompt-library repository](https://github.com/shawnewallace/prompt-library) for contribution guidelines.

## License

MIT

## Related

- [prompt-library](https://github.com/shawnewallace/prompt-library) - Main repository with all agents and prompts
- [Claude Code](https://claude.com/claude-code) - Official CLI for Claude
- [GitHub Copilot](https://github.com/features/copilot) - AI pair programmer

---

**Made with [Claude Code](https://claude.com/claude-code)**
