# 10: Report today, month and date ranges safely

**What to build:** Let a user view confirmed personal-ledger summaries and entries for today, the current month or an explicit date range, with visible date interpretation and owner-bound pagination.

**Blocked by:** 05: Record one dated text Income or Expense.

**Status:** ready-for-agent

- [ ] Reports filter confirmed Transactions by transaction date in `Asia/Bangkok`.
- [ ] Today and current-month shortcuts return Income total, Expense total, net amount and category totals.
- [ ] Explicit start/end date ranges are supported.
- [ ] A natural-language range without a year defaults to the current year and displays the interpreted absolute dates.
- [ ] The user can change the inferred year without retyping the full query.
- [ ] A cross-year range requires explicit confirmation of both years.
- [ ] Detail lists are paginated ten entries at a time.
- [ ] Page tokens are opaque, expiring and bound to owner plus original filters.
- [ ] An entry row shows date, category, amount and receiver/merchant when available.
- [ ] Attempted cross-user detail or pagination access returns no financial information.

