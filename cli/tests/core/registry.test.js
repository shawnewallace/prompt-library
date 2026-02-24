const registry = require('../../src/core/registry.js');

describe('registry', () => {
  // ─── getAgents ────────────────────────────────────────────────────────────

  describe('getAgents()', () => {
    it('returns an array', () => {
      expect(Array.isArray(registry.getAgents())).toBe(true);
    });

    it('returns all 7 registered agents', () => {
      expect(registry.getAgents()).toHaveLength(7);
    });

    it('every agent has required fields', () => {
      registry.getAgents().forEach((agent) => {
        expect(agent).toHaveProperty('id');
        expect(agent).toHaveProperty('name');
        expect(agent).toHaveProperty('description');
        expect(agent).toHaveProperty('sourcePath');
        expect(agent).toHaveProperty('tags');
        expect(agent).toHaveProperty('tools');
      });
    });

    it('includes the ellie agent', () => {
      const ids = registry.getAgents().map((a) => a.id);
      expect(ids).toContain('ellie');
    });
  });

  // ─── getPrompts ───────────────────────────────────────────────────────────

  describe('getPrompts()', () => {
    it('returns an array', () => {
      expect(Array.isArray(registry.getPrompts())).toBe(true);
    });

    it('returns all 4 registered prompts', () => {
      expect(registry.getPrompts()).toHaveLength(4);
    });

    it('every prompt has required fields', () => {
      registry.getPrompts().forEach((prompt) => {
        expect(prompt).toHaveProperty('id');
        expect(prompt).toHaveProperty('name');
        expect(prompt).toHaveProperty('description');
        expect(prompt).toHaveProperty('sourcePath');
      });
    });
  });

  // ─── getTemplates ─────────────────────────────────────────────────────────

  describe('getTemplates()', () => {
    it('returns an array', () => {
      expect(Array.isArray(registry.getTemplates())).toBe(true);
    });

    it('returns all 3 registered templates', () => {
      expect(registry.getTemplates()).toHaveLength(3);
    });

    it('includes feature, fix, and chore PR templates', () => {
      const ids = registry.getTemplates().map((t) => t.id);
      expect(ids).toContain('pr-template-feature');
      expect(ids).toContain('pr-template-fix');
      expect(ids).toContain('pr-template-chore');
    });

    it('all templates are github-copilot only', () => {
      registry.getTemplates().forEach((template) => {
        expect(template.tools).toEqual(['github-copilot']);
      });
    });
  });

  // ─── getScenarios ─────────────────────────────────────────────────────────

  describe('getScenarios()', () => {
    it('returns an array', () => {
      expect(Array.isArray(registry.getScenarios())).toBe(true);
    });

    it('returns all 4 registered scenarios', () => {
      expect(registry.getScenarios()).toHaveLength(4);
    });

    it('every scenario has an includes object', () => {
      registry.getScenarios().forEach((scenario) => {
        expect(scenario).toHaveProperty('includes');
        expect(scenario.includes).toHaveProperty('agents');
        expect(scenario.includes).toHaveProperty('prompts');
      });
    });
  });

  // ─── getAllItems ──────────────────────────────────────────────────────────

  describe('getAllItems()', () => {
    it('returns agents, prompts, templates, and scenarios combined', () => {
      const items = registry.getAllItems();
      const agents = registry.getAgents();
      const prompts = registry.getPrompts();
      const templates = registry.getTemplates();
      const scenarios = registry.getScenarios();
      expect(items).toHaveLength(agents.length + prompts.length + templates.length + scenarios.length);
    });

    it('assigns type: "agent" to all agents', () => {
      const items = registry.getAllItems().filter((i) => i.type === 'agent');
      expect(items).toHaveLength(registry.getAgents().length);
    });

    it('assigns type: "prompt" to all prompts', () => {
      const items = registry.getAllItems().filter((i) => i.type === 'prompt');
      expect(items).toHaveLength(registry.getPrompts().length);
    });

    it('assigns type: "template" to all templates', () => {
      const items = registry.getAllItems().filter((i) => i.type === 'template');
      expect(items).toHaveLength(registry.getTemplates().length);
    });

    it('assigns type: "scenario" to all scenarios', () => {
      const items = registry.getAllItems().filter((i) => i.type === 'scenario');
      expect(items).toHaveLength(registry.getScenarios().length);
    });
  });

  // ─── findById ─────────────────────────────────────────────────────────────

  describe('findById()', () => {
    it('finds an agent by ID', () => {
      const item = registry.findById('hemingway');
      expect(item).not.toBeNull();
      expect(item.type).toBe('agent');
      expect(item.id).toBe('hemingway');
    });

    it('finds a prompt by ID', () => {
      const item = registry.findById('adr');
      expect(item).not.toBeNull();
      expect(item.type).toBe('prompt');
    });

    it('finds a template by ID', () => {
      const item = registry.findById('pr-template-feature');
      expect(item).not.toBeNull();
      expect(item.type).toBe('template');
    });

    it('finds a scenario by ID', () => {
      const item = registry.findById('dotnet-clean-architecture');
      expect(item).not.toBeNull();
      expect(item.type).toBe('scenario');
    });

    it('is case-insensitive', () => {
      expect(registry.findById('HEMINGWAY')).not.toBeNull();
      expect(registry.findById('Hemingway')).not.toBeNull();
    });

    it('returns null for unknown IDs', () => {
      expect(registry.findById('does-not-exist')).toBeNull();
    });
  });

  // ─── findByName ───────────────────────────────────────────────────────────

  describe('findByName()', () => {
    it('finds an item by exact name', () => {
      const item = registry.findByName('Hemingway');
      expect(item).not.toBeNull();
      expect(item.id).toBe('hemingway');
    });

    it('is case-insensitive for exact match', () => {
      expect(registry.findByName('hemingway')).not.toBeNull();
      expect(registry.findByName('HEMINGWAY')).not.toBeNull();
    });

    it('finds an item by partial name (fuzzy)', () => {
      const item = registry.findByName('Clarity');
      expect(item).not.toBeNull();
    });

    it('finds an item by partial ID (fuzzy)', () => {
      const item = registry.findByName('pr-template');
      expect(item).not.toBeNull();
      expect(item.type).toBe('template');
    });

    it('returns null for an unrecognised name', () => {
      expect(registry.findByName('xyzzy-unknown')).toBeNull();
    });
  });

  // ─── findByTag ────────────────────────────────────────────────────────────

  describe('findByTag()', () => {
    it('returns items matching a tag', () => {
      const items = registry.findByTag('architecture');
      expect(items.length).toBeGreaterThan(0);
      items.forEach((item) => {
        expect(item.tags.some((t) => t.includes('architecture'))).toBe(true);
      });
    });

    it('is case-insensitive', () => {
      const lower = registry.findByTag('architecture');
      const upper = registry.findByTag('ARCHITECTURE');
      expect(lower.length).toBe(upper.length);
    });

    it('returns an empty array for an unrecognised tag', () => {
      expect(registry.findByTag('zzz-no-such-tag')).toEqual([]);
    });
  });

  // ─── findByTool ───────────────────────────────────────────────────────────

  describe('findByTool()', () => {
    it('returns items for claude-code', () => {
      const items = registry.findByTool('claude-code');
      expect(items.length).toBeGreaterThan(0);
    });

    it('returns items for github-copilot', () => {
      const items = registry.findByTool('github-copilot');
      expect(items.length).toBeGreaterThan(0);
    });

    it('github-copilot results include templates', () => {
      const items = registry.findByTool('github-copilot');
      const templates = items.filter((i) => i.type === 'template');
      expect(templates.length).toBeGreaterThan(0);
    });

    it('claude-code results do not include templates', () => {
      const items = registry.findByTool('claude-code');
      const templates = items.filter((i) => i.type === 'template');
      expect(templates).toHaveLength(0);
    });

    it('returns an empty array for an unknown tool', () => {
      expect(registry.findByTool('unknown-tool')).toEqual([]);
    });
  });

  // ─── getMetadata ──────────────────────────────────────────────────────────

  describe('getMetadata()', () => {
    it('returns version and lastUpdated', () => {
      const meta = registry.getMetadata();
      expect(meta).toHaveProperty('version');
      expect(meta).toHaveProperty('lastUpdated');
    });

    it('version is a semver-like string', () => {
      const { version } = registry.getMetadata();
      expect(typeof version).toBe('string');
      expect(version).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });
});
