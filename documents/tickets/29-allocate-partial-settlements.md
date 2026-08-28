# 29: Allocate partial Settlements

**What to build:** Allow one Reimbursement to be settled across several payments and one Settlement to allocate across several Reimbursements while keeping exact original, allocated and outstanding amounts.

**Blocked by:** 26: Pass the Phase 1.1 reimbursement gate.

**Status:** ready-for-agent

- [ ] Reimbursement exposes original, allocated and outstanding THB minor-unit amounts.
- [ ] A Settlement can allocate to one or several owner-scoped Reimbursements.
- [ ] A Reimbursement can receive allocations from more than one Settlement.
- [ ] Allocation totals equal the Settlement amount exactly.
- [ ] Reimbursement state becomes partially settled while outstanding is between zero and original amount.
- [ ] Reimbursement state becomes settled only when outstanding reaches zero.
- [ ] Overpayment is rejected unless the user selects a separately specified explicit adjustment behavior.
- [ ] Reversing one allocation recomputes every affected outstanding balance atomically.
- [ ] Concurrent allocation attempts cannot over-settle an item.
- [ ] Existing full Settlement behavior remains valid without data migration ambiguity.

