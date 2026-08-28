# 28: Exchange mutual reimbursement claims

**What to build:** Let connected users send, review, accept, reject or request correction of a reimbursement claim while sharing only the selected claim fields and never exposing either user's broader ledger.

**Blocked by:** 26: Pass the Phase 1.1 reimbursement gate.

**Status:** ready-for-agent

- [ ] A connected user can send a claim containing only the agreed amount/share, date, short description, relationship and explicitly selected Evidence metadata.
- [ ] Sending a claim does not mutate the recipient's ledger.
- [ ] The recipient can accept, reject or request correction through an owner-bound action.
- [ ] Acceptance creates recipient-owned financial records through the recipient's authorization context.
- [ ] Rejection or correction request leaves the sender's private Expense/Reimbursement intact.
- [ ] Claim lifecycle and shared fields are auditable without exposing private notes or unrelated Transactions.
- [ ] Claim notifications are opt-in and respect the recipient's notification preference.
- [ ] Notification content contains no sensitive amount/detail unless explicitly enabled.
- [ ] Duplicate or replayed claim events have one effect.
- [ ] Tests prove a claim cannot be addressed to an unconnected or wrong user.

