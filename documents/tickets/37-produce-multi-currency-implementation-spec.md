# 37: Produce an implementation-ready Multi-currency spec

**What to build:** Produce an approved specification for recording and reporting non-THB Transactions while preserving original value, conversion assumptions and exact reimbursement/settlement arithmetic.

**Blocked by:** 35: Analyze pilot usage and select Phase 2 workstreams.

**Status:** ready-for-agent

- [ ] The discovery confirms concrete user scenarios and required currencies.
- [ ] Original amount and currency are immutable financial facts.
- [ ] Derived reporting amount records exchange-rate source and effective timestamp.
- [ ] Rounding rules are defined in minor units for Transaction, split and Settlement behavior.
- [ ] Unavailable or stale exchange-rate behavior is explicit and never silently guessed.
- [ ] Reports distinguish original and converted values clearly.
- [ ] Refund, edit, reversal and partial Settlement behavior across currencies is specified.
- [ ] Provider trust, cost, caching, retention, tests and failure modes are approved before implementation tickets.

