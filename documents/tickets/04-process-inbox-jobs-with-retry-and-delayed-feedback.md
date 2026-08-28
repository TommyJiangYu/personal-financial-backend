# 04: Process Inbox jobs with retry and delayed user feedback

**What to build:** Turn pending Inbox events into recoverable Processing Jobs that can be claimed, retried and completed after webhook acknowledgement. Users receive owner-bound progress or failure feedback, and exhausted work remains visible with retry and cancel actions.

**Blocked by:** 03: Durably accept webhook events exactly once.

**Status:** ready-for-agent

- [ ] Jobs transition safely through pending, processing, completed and failed states.
- [ ] Concurrent workers cannot claim and execute the same Job simultaneously.
- [ ] Transient provider/database failures retry at approximately 10 seconds, one minute and five minutes.
- [ ] Validation and unsupported-input errors do not retry.
- [ ] Restarting during processing allows the Job to be reclaimed without duplicating its completed effect.
- [ ] A user-visible acknowledgement is sent only for a durably accepted event.
- [ ] Work taking more than 30 seconds produces a delayed-processing message and later owner-bound result.
- [ ] Exhausted Jobs expose retry and cancel actions to the owning user.
- [ ] Late outbound delivery never uses another user's LINE identity or stale owner context.
- [ ] An optional in-memory concurrency limiter does not become the source of durability.

