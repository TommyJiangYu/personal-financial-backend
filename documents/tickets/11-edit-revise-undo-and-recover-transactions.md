# 11: Edit, revise, undo and recover Transactions

**What to build:** Let the owner correct confirmed Transactions field by field, inspect revision history, undo a recent independent entry, and recover a normally deleted entry within a defined window.

**Blocked by:** 10: Report today, month and date ranges safely.

**Status:** ready-for-agent

- [ ] The owner can select an entry from a report and edit amount, date, type, category, sender/receiver or note one field at a time.
- [ ] Every edit returns a complete preview before committing.
- [ ] A committed edit updates subsequent summaries and detail views.
- [ ] Each edit records an encrypted revision with actor and change timestamp.
- [ ] Operational logs record the change event without old/new financial values.
- [ ] Undo applies only to the owner's latest independent Transaction within 24 hours.
- [ ] Undo is rejected when another record depends on the target.
- [ ] Normal deletion is soft deletion and removes the entry from ordinary reports.
- [ ] A soft-deleted entry can be restored by its owner for 30 days.
- [ ] Revision, edit, delete and restore references cannot be used across users.

