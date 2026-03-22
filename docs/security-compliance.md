# Security and Compliance Controls

## Implemented controls
- MFA enforcement for `/admin/*` and `/campaign-staff/*` routes.
- TLS-only enforcement for protected routes.
- Field-level encryption at rest for donor and voter PII.
- Role-based access control with least-privilege roles:
  - volunteer coordinator
  - finance admin
  - content moderator
- Compliance modules:
  - ECI disclosure capture
  - donation financial limits/flags
  - audit trail export
- Moderation workflow for user-generated news content before publication.
- Structured security logging for alert pipelines.

## Operational references
- Incident response runbook: `docs/runbooks/incident-response.md`

## Required environment variables
- `PII_ENCRYPTION_KEY` (strong secret; rotate regularly)
