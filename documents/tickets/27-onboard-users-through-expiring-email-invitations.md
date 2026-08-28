# 27: Onboard users through expiring email invitations

**What to build:** Replace manual provisioning for new users with an email invitation that delivers a single-use expiring code and safely binds the recipient's LINE identity after consent.

**Blocked by:** 26: Pass the Phase 1.1 reimbursement gate.

**Status:** ready-for-agent

- [ ] An existing authorized user or approved onboarding actor can create an invitation for an email address.
- [ ] Normalized email has a unique HMAC lookup and an encrypted reversible value.
- [ ] Invitation codes are cryptographically random, purpose-bound, single-use and expiring.
- [ ] Only a secure code hash/HMAC is persisted.
- [ ] The email-delivery provider is behind a replaceable adapter with configurable expiry and resend limits.
- [ ] The recipient can present the code through LINE and review the current consent version.
- [ ] Successful acceptance binds only the presenting LINE identity and consumes the invitation atomically.
- [ ] Expired, revoked, consumed and replayed invitations cannot create or relink a User.
- [ ] Invitation status is visible operationally without exposing the email or ledger data.
- [ ] Concurrent acceptance attempts produce exactly one successful binding.

