# Security Incident Response Runbook

## Scope
This runbook covers authentication, RBAC, TLS enforcement, compliance flags, and content moderation incidents.

## Detection
1. Monitor `security_event` logs for:
   - `auth_denied`
   - `mfa_required`
   - `tls_rejected`
   - `rbac_denied`
   - `compliance_flag`
   - `content_flagged`
2. Alert on 5+ events of the same type in 10 minutes.

## Immediate actions
1. Confirm impacted route and actor identity.
2. Revoke active sessions for impacted users if compromise is suspected.
3. Freeze impacted workflows (donation capture, content publication, volunteer assignments) until triage completes.

## Triage checklist
- Validate whether MFA was bypassed or absent for protected routes.
- Validate whether request transport was HTTPS-only.
- Validate whether RBAC permissions match actor role.
- Validate whether financial compliance flags exceeded configured limits.
- Validate whether moderation queue is blocking objectionable content.

## Containment and remediation
- Rotate `PII_ENCRYPTION_KEY` if data at-rest compromise is suspected.
- Add or tighten alert thresholds for repeated offenses.
- Patch route/permission mappings and redeploy.
- Export audit trail for investigation and legal/compliance review.

## Recovery and postmortem
- Restore protected workflow access incrementally.
- Document timeline and root cause.
- Add regression tests for the incident pattern.
- Share compliance artifact package with stakeholders.
