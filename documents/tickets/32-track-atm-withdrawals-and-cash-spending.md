# 32: Track ATM withdrawals and cash spending

**What to build:** Represent an ATM withdrawal as a transfer from a bank account to a cash account, then record later cash purchases as Expenses from that cash account without counting the withdrawal itself as Expense.

**Blocked by:** 31: Track accounts and own-account transfers.

**Status:** ready-for-agent

- [ ] A user can designate or create a cash account.
- [ ] An ATM withdrawal preview identifies bank source, cash destination, amount and date.
- [ ] Confirming the withdrawal changes tracked balances but not Income/Expense totals.
- [ ] A later cash purchase creates Expense and reduces the tracked cash balance.
- [ ] Withdrawal plus cash purchase reports demonstrate exactly one Expense effect.
- [ ] A withdrawal lacking required account information asks the user rather than guessing.
- [ ] Editing or deleting a withdrawal preserves account-balance consistency.
- [ ] Evidence and duplicate rules apply to ATM records without exposing account PII.
- [ ] Incomplete tracked history is visibly distinguished from an authoritative bank/cash balance.
- [ ] Disabling account tracking restores the Phase 1 unsupported-withdrawal response.

