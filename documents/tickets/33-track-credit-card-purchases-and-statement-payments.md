# 33: Track credit-card purchases and statement payments

**What to build:** Represent a credit-card purchase as an Expense plus card liability and represent statement payment as a transfer that clears liability without adding a second Expense.

**Blocked by:** 31: Track accounts and own-account transfers.

**Status:** ready-for-agent

- [ ] A user can designate a private credit-card account.
- [ ] A card purchase creates Expense on the purchase date and increases tracked card liability.
- [ ] Paying the card statement transfers value from a payment account and decreases card liability.
- [ ] Statement payment contributes zero additional Expense.
- [ ] Purchase plus statement-payment reports demonstrate exactly one Expense effect.
- [ ] Partial statement payment leaves the remaining liability visible.
- [ ] Refund to a card reduces the linked Expense and card liability consistently.
- [ ] Editing, deleting or reversing card events preserves account and ledger integrity.
- [ ] Card/account Evidence and identity remain owner-scoped and encrypted where PII applies.
- [ ] Disabling account tracking preserves Phase 1 card-purchase behavior and statement-payment rejection.

