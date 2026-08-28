# 16: Enforce rate, budget and disk degraded modes

**What to build:** Keep the service usable and predictable when a user sends excessive work, the AI budget is exhausted or the 10 GB filesystem approaches capacity, while preserving read/edit/export access to existing records.

**Blocked by:** 15: Add privacy-safe health metrics and alerts.

**Status:** ready-for-agent

- [ ] Pilot limits default to 30 messages/minute/user, 10 images/minute/user and 200 images/day/user.
- [ ] Rate limits are owner-scoped and unknown users cannot consume AI quota.
- [ ] Monthly AI warning and hard-cap values are configurable.
- [ ] Reaching the AI hard cap pauses new AI/OCR work but leaves read, edit, delete and export operations usable.
- [ ] Disk usage at 70% emits a warning.
- [ ] Disk usage at 80% triggers eligible cleanup/log rotation.
- [ ] Disk usage at 90% rejects new images with a clear user response while text/read operations remain available.
- [ ] An emergency kill switch can stop webhook business processing and outbound push without deleting Inbox evidence.
- [ ] Degraded-mode transitions and recovery are observable without PII.
- [ ] Automated tests cover threshold crossings and restoration to normal operation.

