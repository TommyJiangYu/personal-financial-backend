# 06: Resume incomplete Drafts and resolve mandatory dates

**What to build:** Preserve incomplete proposals as owner-scoped Drafts, ask for a mandatory transaction date with unambiguous quick replies, and let users list and resume stale Drafts without allowing incomplete data into reports.

**Blocked by:** 05: Record one dated text Income or Expense.

**Status:** ready-for-agent

- [ ] A message missing its transaction date creates an `AWAITING_INPUT` Draft rather than assuming message time.
- [ ] Date quick replies display and submit absolute Bangkok calendar dates for today and yesterday.
- [ ] A future selected date is rejected.
- [ ] An unanswered Draft becomes `STALE` after 24 hours but remains resumable.
- [ ] Drafts can be listed by today, yesterday, current week, previous week, current month and previous month using creation time.
- [ ] Weeks are Monday through Sunday in `Asia/Bangkok`.
- [ ] When one explicit Draft question is active, a date answer updates only that Draft.
- [ ] Without an active Draft question, date words act as Draft-list filters.
- [ ] Several pending Drafts require the user to select one before free-text input can mutate it.
- [ ] A daily notification summarizes newly stale Drafts without sending one message per Draft.
- [ ] Drafts never contribute to Income, Expense or net totals.

