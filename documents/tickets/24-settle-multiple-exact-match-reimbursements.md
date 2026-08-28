# 24: Settle multiple exact-match Reimbursements

**What to build:** Let a user choose several pending PAYABLE or RECEIVABLE items for one Financial Contact, verify that their exact total matches one Settlement, and close them atomically with separate Settlement Evidence.

**Blocked by:** 23: Report personal Expense, cash paid and outstanding balances.

**Status:** ready-for-agent

- [ ] The user can query pending items for one Financial Contact and select one or several.
- [ ] The confirmation displays item count, date range, selected details and exact sum.
- [ ] Every selected Reimbursement must be pending and owned by the current user.
- [ ] The Settlement amount must equal the selected sum exactly.
- [ ] A mismatch leaves all selected items pending and creates no Settlement.
- [ ] Successful confirmation atomically creates one Settlement and marks all selected Reimbursements settled.
- [ ] Settlement changes cash paid and outstanding balance but does not add another personal Expense.
- [ ] Settlement Evidence is distinct from original Expense Evidence and uses private-storage rules.
- [ ] A bank transfer fee can be confirmed as its own fees-category Expense rather than overpayment.
- [ ] Phase 1.1 rejects partial payment and overpayment with explicit corrective guidance.
- [ ] Concurrent attempts cannot settle the same Reimbursement twice.

