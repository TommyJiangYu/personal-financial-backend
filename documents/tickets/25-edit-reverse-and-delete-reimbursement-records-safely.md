# 25: Edit, reverse and delete reimbursement-linked records safely

**What to build:** Preserve financial integrity when a user edits or deletes a split Expense by updating pending Reimbursements atomically and requiring Settlement reversal before changing settled financial values.

**Blocked by:** 24: Settle multiple exact-match Reimbursements.

**Status:** ready-for-agent

- [ ] Editing an unsettled personal share recomputes the linked PAYABLE or RECEIVABLE in the same database transaction.
- [ ] Changing payer, contact or direction recomputes or cancels the pending Reimbursement correctly.
- [ ] Changing the payer to the owner removes an obsolete PAYABLE.
- [ ] Deleting a pending split Expense cancels its linked Reimbursement atomically.
- [ ] Settled financial fields cannot be edited or deleted directly.
- [ ] Reversing a Settlement returns all linked Reimbursements to pending and records revisions.
- [ ] A reversed Settlement does not delete historical Evidence metadata.
- [ ] After reversal, the user can edit and create a corrected Settlement through normal flows.
- [ ] All Expense, Reimbursement and Settlement changes remain owner-scoped and auditable.
- [ ] Concurrent edit/reversal/delete attempts result in one coherent financial state.

