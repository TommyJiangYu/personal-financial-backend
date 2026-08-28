# 12: Handle refunds, cards and unsupported cash movements

**What to build:** Prevent common personal-finance events from distorting reports by linking refunds to prior Expenses, counting credit-card purchases only once, and declining own-account transfers and ATM withdrawals in Phase 1.0.

**Blocked by:** 10: Report today, month and date ranges safely.

**Status:** ready-for-agent

- [ ] A received refund can be linked to an existing owner-scoped Expense.
- [ ] A linked refund reduces net Expense and is not counted as ordinary Income.
- [ ] When the original Expense cannot be identified, the system asks the user rather than guessing.
- [ ] A credit-card purchase is recorded as an Expense on the purchase date.
- [ ] A credit-card statement payment is detected and declined as a second Expense.
- [ ] An own-account transfer is detected and produces a deterministic “not recorded” response.
- [ ] An ATM withdrawal is detected and produces a deterministic “not recorded” response.
- [ ] The user can explicitly state that a detected unsupported movement is actually an Expense and return to the normal preview flow.
- [ ] Aggregate unsupported-intent metrics contain no raw text, amount or PII.
- [ ] Reports demonstrate that purchase/refund/card-payment sequences are not double-counted.

