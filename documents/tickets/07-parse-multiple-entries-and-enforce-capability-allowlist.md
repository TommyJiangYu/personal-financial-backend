# 07: Parse multiple entries and enforce the capability allowlist

**What to build:** Parse up to ten financial entries from one message while restricting AI to implemented financial commands. Unsupported requests receive deterministic help instead of general advice or invented behavior.

**Blocked by:** 06: Resume incomplete Drafts and resolve mandatory dates.

**Status:** ready-for-agent

- [ ] One message can produce between one and ten independently confirmable Drafts.
- [ ] A clearly stated common date is applied to all entries in the message.
- [ ] Ambiguous date scope prompts the user before any Transaction is confirmed.
- [ ] More than ten proposed entries is rejected or reduced through an explicit user workflow.
- [ ] AI output is schema-validated and malformed output creates no financial state.
- [ ] AI selects only from the fixed Income/Expense category taxonomy.
- [ ] Unclear category becomes `UNCATEGORIZED` without blocking confirmation.
- [ ] Investment advice, budget advice and unimplemented financial requests receive a deterministic capability message.
- [ ] Non-financial requests do not reach a general-chat response path.
- [ ] Prompt-injection content cannot expand allowed intents or supply an owner identity.

