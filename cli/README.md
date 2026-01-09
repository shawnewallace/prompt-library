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

### Option 1: Global Installation (Recommended)

Install the CLI tool globally so you can use it from any project.

**You can run this from ANY directory** - it installs to your system globally:

```bash
npm install -g @shawnwallace/prompt-library
```

Verify installation:
```bash
prompt-library --version
```

**Example:**
```bash
# This works from anywhere - your home directory, desktop, etc.
cd ~
npm install -g @shawnwallace/prompt-library

# Now the 'prompt-library' command is available everywhere
```

### Option 2: Use with npx (No Installation)

Run the tool without installing it.

**You can run this from ANY directory** - npx downloads and runs it temporarily:

```bash
npx @shawnwallace/prompt-library init
```

**Note:** You'll need to prefix all commands with `npx @shawnwallace/prompt-library` instead of just `prompt-library`.

**Example:**
```bash
# This also works from anywhere
cd ~
npx @shawnwallace/prompt-library --version
```

---

**⚠️ Important:** While installation can happen from anywhere, you must **run the actual commands** (`init`, `add`, etc.) **from your project directory** where you want the agents installed. See Quick Start below.

## Quick Start

### Step 1: Navigate to Your Project

**Important:** Run the CLI from your project's root directory where you want the agents installed.

```bash
cd /path/to/your/project
```

### Step 2: Interactive Setup

Start with the interactive wizard to set up your project:

```bash
prompt-library init
```

This will:
1. Ask which AI tool you're using (Claude Code or GitHub Copilot)
2. Optionally select a scenario template
3. Choose agents and prompts to install
4. Install files to the correct directories in your project
5. Create a `.prompt-library.json` tracking file in your project root

**Example:**
```bash
# For a .NET project using Claude Code
cd ~/projects/my-dotnet-app
prompt-library init
# Select: Claude Code → dotnet-clean-architecture

# Files will be installed to:
# ~/projects/my-dotnet-app/.claude/agents/
# ~/projects/my-dotnet-app/.claude/prompts/
```

### Step 3: Browse Available Items

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

### Step 4: Add More Items Later

Install additional agents or prompts anytime:

```bash
prompt-library add hemingway           # Writing clarity editor
prompt-library add archy               # Architecture planner
prompt-library add writing-clarity     # Writing review prompt
```

The command uses fuzzy search, so you can use partial names:
```bash
prompt-library add clarity    # Finds "clarity-editor" agent
```

## Updating Agents

### Check What's Installed

First, see what you have installed:

```bash
prompt-library list --installed
```

### Reinstall/Update Individual Agents

To update an agent to the latest version from the repository:

```bash
prompt-library add <agent-name>
# When prompted, select "Reinstall (overwrite)"
```

**Example:**
```bash
prompt-library add hemingway
# Output: "Hemingway is already installed."
# Choose: "Reinstall (overwrite)"
```

### Update All Agents (Manual Process)

Currently, you need to manually reinstall each agent:

```bash
# List installed items
prompt-library list --installed

# Reinstall each one
prompt-library add hemingway    # Select: Reinstall
prompt-library add archy        # Select: Reinstall
# ... repeat for each installed item
```

**Pro Tip:** Use `--dry-run` to preview changes before reinstalling:

```bash
prompt-library add hemingway --dry-run
```

### Force Clean Reinstall

If you want to start fresh:

1. **Remove existing files:**
   ```bash
   # For Claude Code
   rm -rf .claude/agents .claude/prompts

   # For GitHub Copilot
   rm -rf .github/agents .github/prompts
   ```

2. **Remove tracking file:**
   ```bash
   rm .prompt-library.json
   ```

3. **Reinstall:**
   ```bash
   prompt-library init
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

### Example 4: Preview Before Installing

```bash
# Preview what would be installed
prompt-library add dotnet-clean-architecture --dry-run

# Preview the init wizard
prompt-library init --dry-run

# After reviewing, install without --dry-run
prompt-library add dotnet-clean-architecture
```

## Commands

### `init [options]`

Interactive setup wizard.

```bash
prompt-library init
prompt-library init --dry-run    # Preview without installing
```

Walks you through:
- AI tool selection
- Scenario or custom selection
- Agent and prompt selection
- Installation and tracking setup

**Options:**
- `--dry-run` - Preview what would be installed without actually installing files

### `list [options]`

List available items with installation status.

```bash
prompt-library list              # Show all items
prompt-library list --agents     # Agents only
prompt-library list --prompts    # Prompts only
prompt-library list --scenarios  # Scenarios only
prompt-library list --installed  # Installed items only
```

### `add <name> [options]`

Add a specific agent, prompt, or scenario.

```bash
prompt-library add <name>
prompt-library add <name> --dry-run    # Preview without installing
```

Supports fuzzy matching for item names.

**Options:**
- `--dry-run` - Preview what would be installed without actually installing files

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

**Problem:** `prompt-library: command not found` after global installation

**Solution:**

```bash
# Check if npm global bin is in PATH
npm config get prefix

# Add to PATH permanently (macOS/Linux - add to ~/.bashrc or ~/.zshrc)
export PATH="$(npm config get prefix)/bin:$PATH"

# For Windows, add to System Environment Variables:
# Control Panel → System → Advanced → Environment Variables
# Add npm global bin path to PATH

# Alternative: Use npx instead
npx @shawnwallace/prompt-library init
```

### Wrong Directory

**Problem:** Files installed in the wrong location

**Common Mistake:**
```bash
# ❌ Running from CLI package directory
cd /usr/local/lib/node_modules/@shawnwallace/prompt-library
prompt-library init  # Files go to wrong place!
```

**Solution:**
```bash
# ✅ Run from YOUR project directory
cd ~/projects/my-app
prompt-library init  # Files go to ~/projects/my-app/.claude/
```

### Permission Errors

**Problem:** `EACCES: permission denied` during npm install

**Solution 1 (Recommended):** Use npx without installation
```bash
npx @shawnwallace/prompt-library init
```

**Solution 2:** Fix npm permissions
```bash
# Create a directory for global packages
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# Add to PATH (add this to ~/.bashrc or ~/.zshrc)
export PATH=~/.npm-global/bin:$PATH

# Now install globally
npm install -g @shawnwallace/prompt-library
```

**Solution 3 (Not Recommended):** Use sudo
```bash
sudo npm install -g @shawnwallace/prompt-library
```

### Agents Not Appearing

**Problem:** Installed agents don't show up in Claude Code or GitHub Copilot

**Solutions:**

1. **Restart your AI tool:**
   - **Claude Code**: Restart the CLI completely
   - **GitHub Copilot**: Reload VS Code window (`Cmd/Ctrl + Shift + P` → "Reload Window")

2. **Verify files are in the correct location:**
   ```bash
   # For Claude Code
   ls -la .claude/agents/

   # For GitHub Copilot
   ls -la .github/agents/
   ```

3. **Check file permissions:**
   ```bash
   # Files should be readable
   chmod 644 .claude/agents/*.md
   ```

4. **Verify you're in the right project directory:**
   ```bash
   pwd  # Should show your project root
   ls .prompt-library.json  # Tracking file should exist
   ```

### Network Errors

**Problem:** `Error fetching file` or timeout errors

**Solutions:**

1. **Check internet connection:**
   ```bash
   # Test if you can reach GitHub
   ping github.com
   ```

2. **Retry the command:** The CLI has automatic retry logic, just run it again

3. **Check firewall/proxy settings:** Ensure GitHub is accessible
   ```bash
   curl https://raw.githubusercontent.com/shawnewallace/prompt-library/main/README.md
   ```

4. **Source URL:** Files are fetched from:
   ```
   https://raw.githubusercontent.com/shawnewallace/prompt-library/main/
   ```

### Already Installed Conflicts

**Problem:** "Item is already installed" but you want to update it

**Solution:**
```bash
prompt-library add <item-name>
# When prompted, select: "Reinstall (overwrite)"
```

Or force reinstall by removing and re-adding:
```bash
rm .claude/agents/hemingway.md
prompt-library add hemingway
```

### Getting Help

Still stuck? Check these resources:

- **View all commands:** `prompt-library --help`
- **Command-specific help:** `prompt-library <command> --help`
- **View installed items:** `prompt-library list --installed`
- **Preview before installing:** `prompt-library add <name> --dry-run`
- **Report issues:** https://github.com/shawnewallace/prompt-library/issues

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
