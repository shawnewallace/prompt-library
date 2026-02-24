const path = require('path');
const { getTargetPath, getTargetFilename } = require('../../src/core/installer.js');

const CWD = '/test/project';

beforeEach(() => {
  jest.spyOn(process, 'cwd').mockReturnValue(CWD);
});

afterEach(() => {
  jest.restoreAllMocks();
});

// ─── getTargetFilename ───────────────────────────────────────────────────────

describe('getTargetFilename()', () => {
  it('returns {id}.md for an agent', () => {
    expect(getTargetFilename({ id: 'hemingway', type: 'agent' })).toBe('hemingway.md');
  });

  it('returns {id}.md for a prompt', () => {
    expect(getTargetFilename({ id: 'adr', type: 'prompt' })).toBe('adr.md');
  });

  it('returns {id}.md for a template', () => {
    expect(getTargetFilename({ id: 'pr-template-feature', type: 'template' })).toBe('pr-template-feature.md');
  });
});

// ─── getTargetPath (claude-code) ─────────────────────────────────────────────

describe('getTargetPath() — claude-code', () => {
  it('resolves agent path to .claude/agents/', () => {
    const result = getTargetPath('claude-code', 'agent', 'hemingway.md');
    expect(result).toBe(path.join(CWD, '.claude/agents', 'hemingway.md'));
  });

  it('resolves prompt path to .claude/commands/', () => {
    const result = getTargetPath('claude-code', 'prompt', 'adr.md');
    expect(result).toBe(path.join(CWD, '.claude/commands', 'adr.md'));
  });

  it('throws when attempting to install a template for claude-code', () => {
    expect(() => getTargetPath('claude-code', 'template', 'pr-template-feature.md'))
      .toThrow('Templates are not supported for this tool');
  });

  it('throws for an unknown item type', () => {
    expect(() => getTargetPath('claude-code', 'unknown', 'foo.md'))
      .toThrow('Unknown item type: unknown');
  });
});

// ─── getTargetPath (github-copilot) ──────────────────────────────────────────

describe('getTargetPath() — github-copilot', () => {
  it('resolves agent path to .github/agents/', () => {
    const result = getTargetPath('github-copilot', 'agent', 'hemingway.md');
    expect(result).toBe(path.join(CWD, '.github/agents', 'hemingway.md'));
  });

  it('resolves prompt path to .github/prompts/', () => {
    const result = getTargetPath('github-copilot', 'prompt', 'adr.md');
    expect(result).toBe(path.join(CWD, '.github/prompts', 'adr.md'));
  });

  it('resolves template path to .github/PULL_REQUEST_TEMPLATE/', () => {
    const result = getTargetPath('github-copilot', 'template', 'pr-template-feature.md');
    expect(result).toBe(path.join(CWD, '.github/PULL_REQUEST_TEMPLATE', 'pr-template-feature.md'));
  });

  it('throws for an unknown item type', () => {
    expect(() => getTargetPath('github-copilot', 'unknown', 'foo.md'))
      .toThrow('Unknown item type: unknown');
  });
});
