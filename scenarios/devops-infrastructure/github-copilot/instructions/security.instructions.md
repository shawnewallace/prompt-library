---
applyTo: '**/*.tf,**/*.yml,**/*.yaml,**/Dockerfile'
---

# Security

## Secrets

- No secrets, API keys, passwords, or tokens in source code or pipeline files — ever.
- Use a secrets manager (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, GCP Secret Manager) and inject at runtime.
- Rotate credentials regularly. Treat any committed secret as compromised immediately: rotate before closing the PR.
- Run `git-secrets` or `trufflehog` in pre-commit hooks to prevent accidental commits.

## IAM and Permissions

- Apply least-privilege to all IAM roles, service accounts, and policies. Grant only the permissions required.
- Never use wildcard resource ARNs (`*`) in production IAM policies.
- Use separate service accounts per workload — never share credentials between services.
- Audit IAM policies in every PR that modifies them.

## Network

- Default to deny-all ingress and allow only required ports.
- Restrict management ports (SSH, RDP) to known CIDR ranges or a bastion host; never expose them to `0.0.0.0/0`.
- Encrypt all traffic in transit with TLS 1.2+. Enforce HTTPS redirects.
- Use private endpoints for cloud services where available.

## Infrastructure Scanning

- Run `tfsec` or `checkov` on all Terraform changes in CI. Block merges on HIGH/CRITICAL findings.
- Run `trivy` or `grype` on container images before pushing to a registry.
- Run `npm audit` / `pip audit` / equivalent on application dependencies.

## Containers

- Use minimal base images (distroless, alpine). Avoid `latest` tags — pin to a specific digest.
- Run containers as non-root. Set `USER` in Dockerfiles.
- Scan images for CVEs in CI; block on critical vulnerabilities.
- Do not mount the Docker socket in containers unless absolutely necessary.

## Logging and Audit

- Enable audit logging for all cloud accounts and Kubernetes clusters.
- Centralize logs and set retention policies.
- Alert on suspicious activity: repeated auth failures, privilege escalation, unexpected API calls.
