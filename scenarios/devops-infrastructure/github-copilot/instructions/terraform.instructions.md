---
applyTo: '**/*.tf'
---

# Terraform

## Module Structure

- Organize infrastructure as reusable modules. Each module must have `main.tf`, `variables.tf`, `outputs.tf`, and `README.md`.
- Root configurations call modules; they do not contain resource definitions directly.
- Use a consistent directory layout:

```
infrastructure/
  modules/
    networking/
    compute/
    database/
  environments/
    dev/
    staging/
    prod/
```

## Remote State

- Always use remote state (S3 + DynamoDB locking, Azure Blob, GCS, or Terraform Cloud). Never commit `.tfstate` files.
- Use separate state files per environment. Never share state between environments.
- Enable state encryption at rest.

## Variables and Values

- Never hardcode environment-specific values (account IDs, region names, CIDR blocks, secrets). Use `variables.tf`.
- Provide descriptions and types for all variables. Use validation blocks for constrained inputs.
- Use `locals` for computed or repeated values; avoid duplicating expressions.

```hcl
variable "environment" {
  type        = string
  description = "Deployment environment (dev, staging, prod)"
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}
```

## Tagging

- Apply consistent tags to all resources: at minimum `environment`, `project`, `managed-by = terraform`, and `owner`.
- Use a `locals` block for the common tag map and merge with resource-specific tags.

```hcl
locals {
  common_tags = {
    environment = var.environment
    project     = var.project_name
    managed-by  = "terraform"
  }
}
```

## Style

- Use `terraform fmt` before committing. CI must reject unformatted code.
- Use `terraform validate` and `tflint` in pre-commit hooks.
- Prefer `for_each` over `count` for resources with meaningful keys (avoids index-based drift).
- Pin provider versions in `required_providers` and pin Terraform itself with `required_version`.
