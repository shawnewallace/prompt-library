# Copilot Instructions — DevOps & Infrastructure

## Language Policy

All instructions, prompts, and code comments intended for contributors must be written in English.

## Development Workflow

**IMPORTANT:** Always follow these steps when implementing infrastructure changes:

1. Consult the relevant instructions files below and state which ones guided your implementation (e.g., `Instructions used: [terraform.instructions.md, security.instructions.md]`).

2. Run `terraform validate` and `terraform plan` (or equivalent) before committing infrastructure changes. Review the plan output carefully — never apply without reviewing the diff.

3. Run security scanning tools (`tfsec`, `checkov`, `trivy`) and resolve all HIGH and CRITICAL findings before committing.

4. Never hardcode credentials, secrets, or environment-specific values. All sensitive values must come from a secrets manager or environment variables.

## Instructions Files

| File | Purpose |
|------|---------|
| [terraform.instructions.md](./instructions/terraform.instructions.md) | Module structure, remote state, variable conventions |
| [ci-cd.instructions.md](./instructions/ci-cd.instructions.md) | Pipeline stages, secrets, caching, environment gates |
| [security.instructions.md](./instructions/security.instructions.md) | Least-privilege IAM, scanning, secrets management |
