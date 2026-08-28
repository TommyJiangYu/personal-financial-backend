# 19: Pass the Phase 1.0 pilot-readiness gate

**What to build:** Integrate and verify Phase 1.0 as a production-ready two-user pilot, demonstrating the agreed user journeys, privacy invariants, durability, performance and measurable success criteria end to end.

**Blocked by:** 07: Parse multiple entries and enforce the capability allowlist; 09: Prevent duplicate slips with explicit override; 11: Edit, revise, undo and recover Transactions; 12: Handle refunds, cards and unsupported cash movements; 18: Verify backup, restore and incident recovery.

**Status:** ready-for-agent

- [ ] The full signed-webhook acceptance suite runs against a disposable production-like database and private temporary storage.
- [ ] Two-user tests demonstrate zero unauthorized cross-user reads, edits, replies, tokens or Evidence access.
- [ ] Concurrent delivery and restart tests demonstrate no acknowledged loss and no duplicate Transaction effect.
- [ ] Supported text submissions reach a preview or recoverable Draft and image submissions reach a preview or explicit failure state.
- [ ] Text preview meets the under-10-second p95 target under pilot load.
- [ ] Image preview meets the under-20-second p95 target under pilot load.
- [ ] Cleanup, monitoring, degraded modes, export, deletion and recovery procedures have recorded verification evidence.
- [ ] Pilot metrics can measure supported-submission success, amount/type/date correction rate, duplicate prevention, latency and AI cost.
- [ ] A 30-day two-user pilot checklist and go/no-go review are documented.
- [ ] No known blocker remains for beginning the allowlisted pilot.

