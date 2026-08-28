# 22: Create split Expenses with PAYABLE or RECEIVABLE

**What to build:** Let a user record a shared purchase with equal, explicit-amount or percentage splitting and atomically create the owner's Expense plus a PAYABLE or RECEIVABLE when another person paid on their behalf or they paid for others.

**Blocked by:** 20: Create private Financial Contacts.

**Status:** ready-for-agent

- [ ] The proposal records total paid amount, owner's personal Expense amount and reimbursement amount separately.
- [ ] `PAYABLE` means the ledger owner owes the selected Financial Contact.
- [ ] `RECEIVABLE` means the selected Financial Contact owes the ledger owner.
- [ ] Equal split, explicit owner amount and explicit owner percentage are supported.
- [ ] The system asks for the share when total and payer are known but the split is missing.
- [ ] Arithmetic uses THB minor units and does not rely on binary floating point.
- [ ] Percentage rounding is visible in the preview and the amounts reconcile.
- [ ] Confirming atomically creates Expense and Reimbursement; failure creates neither.
- [ ] The Expense is recognized on the date the cost occurred even when the user has not paid yet.
- [ ] Creating the record never writes to the Financial Contact's ledger, including when the contact links to a User.

