# 20: Create private Financial Contacts

**What to build:** Let a user create and manage private Financial Contacts for partners, relatives or friends, including people who do not use the application, without granting any ledger access.

**Blocked by:** 19: Pass the Phase 1.0 pilot-readiness gate.

**Status:** ready-for-agent

- [ ] A user can create a local Financial Contact with a private alias.
- [ ] The alias and other contact PII are encrypted with the established key-version scheme.
- [ ] A Financial Contact is owner-scoped and inaccessible to every other user.
- [ ] A contact can exist without a linked registered User.
- [ ] Duplicate or ambiguous aliases are handled through explicit owner-facing UX.
- [ ] Raw sender/receiver names extracted from Evidence remain distinct from the user's contact alias.
- [ ] AI does not silently link an OCR name to a contact when identity is ambiguous.
- [ ] A contact can be renamed or archived without rewriting historical financial references.
- [ ] Contact management emits only sanitized operational events.
- [ ] Contact creation, listing and selection work through LINE without exposing a public directory.

