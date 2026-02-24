# Scaffold Pipeline

Scaffold a CI/CD pipeline for `$ARGUMENTS`.

Ask clarifying questions if needed:
- What platform? (GitHub Actions, Azure Pipelines, GitLab CI)
- What stack? (Node.js, Python, .NET, container, Terraform, etc.)
- What environments? (e.g., dev → staging → prod)
- Any existing conventions to follow?

Then generate the pipeline with these stages:

1. **Lint & validate** — language-appropriate linting and IaC validation if applicable
2. **Test** — run the test suite with coverage output
3. **Build** — compile or containerize the artifact
4. **Security scan** — dependency audit + container or SAST scan appropriate for the stack
5. **Deploy: staging** — deploy to staging (automatic on main branch)
6. **Deploy: production** — deploy to prod (requires manual approval)

Follow the conventions in `ci-cd.instructions.md` and `security.instructions.md`:
- Secrets from the platform's secrets store — never hardcoded
- Dependencies cached on lockfile hash
- Explicit `needs:` between jobs
- Timeouts on all jobs
- Tag production deployments with commit SHA

Output the complete pipeline file with comments explaining each section.
