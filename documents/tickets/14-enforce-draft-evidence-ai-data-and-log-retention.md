# 14: Enforce Draft, Evidence, AI-data and log retention

**What to build:** Run a daily authenticated cleanup operation through HostAtom cron that applies each data class's retention policy without deleting confirmed financial records or another user's still-valid data.

**Blocked by:** 06: Resume incomplete Drafts and resolve mandatory dates; 08: Create private Evidence-backed Drafts from images; 11: Edit, revise, undo and recover Transactions.

**Status:** ready-for-agent

- [ ] Original Evidence images become eligible for deletion after seven days.
- [ ] Optimized Evidence images and incomplete Drafts become eligible after 90 days.
- [ ] Encrypted raw AI input/output becomes eligible after 30 days during the pilot.
- [ ] Operational logs are retained 90 days and security audit logs one year.
- [ ] Confirmed Transaction and retained Evidence metadata are not removed by file cleanup.
- [ ] Cleanup is idempotent and safe when invoked more than once or after a previous partial failure.
- [ ] Cleanup uses an authenticated cron operation and rejects unauthenticated callers.
- [ ] Concurrent cleanup runs are prevented or coordinated through a durable lock.
- [ ] Each run records sanitized counts, duration and failure codes without filenames or PII.
- [ ] Tests acknowledge that HostAtom provider backups may retain deleted active files for its separate 21-day window.

