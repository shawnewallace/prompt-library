---
applyTo: '**/.github/workflows/*.yml,**/pipelines/*.yml,**/pipelines/*.yaml'
---

# CI/CD Pipelines

## Pipeline Structure

Every pipeline must have clearly separated stages that run in order:

1. **Lint & validate** — static analysis, format checks, IaC validation
2. **Test** — unit and integration tests with coverage reporting
3. **Build** — compile, package, or containerize the artifact
4. **Security scan** — dependency audit, container scanning, SAST
5. **Deploy (per environment)** — gated deployments with environment approvals for staging and prod

## Secrets Management

- Never hardcode secrets, tokens, or passwords in pipeline files.
- Use the platform's native secrets store (GitHub Secrets, Azure Key Vault, AWS Secrets Manager).
- Rotate secrets regularly and audit access logs.
- Mask secret values in logs; treat any log output containing credentials as a security incident.

## Caching

- Cache dependency installs (node_modules, pip packages, Maven/Gradle cache) keyed on the lockfile hash.
- Cache build outputs where safe to do so — invalidate when source changes.
- Do not cache artifacts that contain secrets or environment-specific configuration.

## Job Design

- Keep jobs focused: one job = one concern.
- Use explicit `needs:` dependencies between jobs rather than relying on sequential ordering.
- Set timeouts on all jobs to prevent hung runners from consuming quota.
- Always clean up temporary credentials and ephemeral resources in `finally`/`always` steps.

## Environment Gates

- Production deployments must require a manual approval step.
- Use environment protection rules to restrict who can approve deployments.
- Tag every production deployment with the commit SHA and a timestamp for traceability.

## Notifications

- Notify on failure for all branches; notify on success only for main/release branches.
- Include the failing step, branch name, and a direct link to the run in notifications.
