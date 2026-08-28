# 03: Durably accept webhook events exactly once

**What to build:** Persist every valid, authorized LINE event in a database-backed Inbox before acknowledging the webhook, using the LINE webhook event ID as the idempotency key. A durably accepted event must survive process restart, while a repeated delivery must have no additional business effect.

**Blocked by:** 02: Protect pilot access with encrypted LINE identity and consent.

**Status:** ready-for-agent

- [ ] A valid event is stored with owner, event type, event ID, delivery metadata and pending status before a successful webhook response.
- [ ] Failure to persist the Inbox event results in a non-success webhook response rather than a false acknowledgement.
- [ ] The event ID is unique under concurrent delivery.
- [ ] LINE redelivery of an existing event returns success without inserting a second Inbox record.
- [ ] Duplicate delivery cannot produce a second outbound business response.
- [ ] Every stored event is owner-scoped from the moment it is accepted.
- [ ] Stored operational fields exclude raw message content and PII not required for processing.
- [ ] Restarting the application after acknowledgement leaves the event discoverable as pending.

