# 09: Prevent duplicate slips with explicit override

**What to build:** Detect when the same user submits a previously recorded slip, show the existing record, and require an explicit auditable override before another Transaction can be created.

**Blocked by:** 08: Create private Evidence-backed Drafts from images.

**Status:** ready-for-agent

- [ ] Slip reference number and image fingerprint are stored as owner-scoped duplicate signals.
- [ ] A matching reference or strong fingerprint shows the owning user's existing record instead of creating a new Draft silently.
- [ ] Duplicate lookup never reveals a matching record from another owner.
- [ ] The user can view the existing record, cancel, or explicitly choose to record a duplicate.
- [ ] An override records an auditable reason/reference without leaking financial payload into operational logs.
- [ ] Concurrent copies of the same slip cannot both bypass duplicate protection.
- [ ] Repeated text content is not treated as a duplicate solely because its words and amount match.
- [ ] Webhook redelivery remains handled by Inbox idempotency rather than slip duplicate UX.

