# 31: Track accounts and own-account transfers

**What to build:** Introduce optional owner-scoped financial accounts and represent a transfer between the user's own accounts as balance movement that contributes neither Income nor Expense.

**Blocked by:** 26: Pass the Phase 1.1 reimbursement gate.

**Status:** ready-for-agent

- [ ] A user can create private account identities without exposing them to other users.
- [ ] Existing Transactions remain valid without an assigned account.
- [ ] A transfer records source account, destination account, amount, currency and occurred date.
- [ ] A confirmed own-account transfer changes tracked balances but contributes zero Income and zero Expense.
- [ ] Transfer preview makes the non-Income/non-Expense treatment explicit.
- [ ] Duplicate transfer Evidence is protected by the existing owner-scoped rules.
- [ ] Reports can include or exclude transfers without changing personal Expense totals.
- [ ] Account balances are labeled as tracked balances and are not presented as authoritative when history is incomplete.
- [ ] Account and Transfer edits remain owner-scoped and revisioned.
- [ ] The workstream can be disabled, returning to Phase 1 detection-only behavior.

