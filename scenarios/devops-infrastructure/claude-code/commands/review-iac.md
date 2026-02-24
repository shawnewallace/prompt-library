# Review Infrastructure as Code

Review the infrastructure code at `$ARGUMENTS` against the project's DevOps standards.

Check for:

**Security**
- [ ] No hardcoded secrets, passwords, or API keys
- [ ] IAM roles and policies follow least-privilege (no wildcard resource ARNs in prod)
- [ ] Network ingress rules are not open to `0.0.0.0/0` for sensitive ports
- [ ] Encryption at rest and in transit is enabled for storage and databases
- [ ] Container images pin to a specific digest, not `latest`

**Terraform**
- [ ] Remote state is configured with locking
- [ ] Provider and Terraform versions are pinned
- [ ] All variables have descriptions and types
- [ ] `for_each` used instead of `count` for keyed resources
- [ ] Common tags applied to all resources
- [ ] No environment-specific values hardcoded in `.tf` files

**CI/CD**
- [ ] Secrets sourced from secrets manager, not pipeline variables
- [ ] Dependency caches keyed on lockfile hash
- [ ] Production deployments require manual approval
- [ ] Timeouts set on all jobs
- [ ] Security scans run before deploy stages

**General**
- [ ] `terraform fmt` / `terraform validate` passes
- [ ] No commented-out resource blocks left in code
- [ ] Modules are used for repeated patterns rather than copy-paste

For each failing check, explain the risk and provide a corrected example.
