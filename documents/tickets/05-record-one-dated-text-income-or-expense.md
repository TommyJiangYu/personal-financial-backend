# 05: Record one dated text Income or Expense

**What to build:** Let an authorized user send one natural-language financial entry with a clear date, receive a structured preview, and confirm it into exactly one owner-scoped Income or Expense Transaction.

**Blocked by:** 04: Process Inbox jobs with retry and delayed user feedback.

**Status:** ready-for-agent

- [ ] A dated Expense message produces a Draft preview rather than a free-form chatbot answer.
- [ ] A dated Income message produces a Draft preview.
- [ ] Mandatory fields are owner, type, amount, THB currency, transaction date, source and Draft status.
- [ ] Category, note, `moneySenderName` and `moneyReceiverName` remain optional.
- [ ] A future transaction date is rejected with a correction prompt.
- [ ] The preview displays type, amount, absolute date, category and available sender/receiver information.
- [ ] Confirming the preview atomically creates one Transaction and marks the Draft confirmed.
- [ ] Cancelling the preview creates no Transaction.
- [ ] The Transaction owner comes from authenticated LINE identity and never from AI output.
- [ ] The first-month configuration requires confirmation for every proposal.

