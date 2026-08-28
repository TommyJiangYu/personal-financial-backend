# 34: Integrate and verify Phase 1.2 feature flags

**What to build:** Make every Phase 1.2 workstream independently deployable, observable and reversible so that email onboarding, mutual claims, partial Settlement, custom categories and account tracking cannot destabilize the core ledger.

**Blocked by:** 27: Onboard users through expiring email invitations; 28: Exchange mutual reimbursement claims; 29: Allocate partial Settlements; 30: Manage owner-defined categories; 32: Track ATM withdrawals and cash spending; 33: Track credit-card purchases and statement payments.

**Status:** ready-for-agent

- [ ] Each Phase 1.2 workstream has an independent feature flag and kill switch.
- [ ] Disabling a workstream blocks new writes but preserves valid reads/recovery for existing records.
- [ ] Each workstream has independent migration, rollout, rollback and metrics documentation.
- [ ] Phase 1.0 and 1.1 acceptance suites remain green with every Phase 1.2 flag disabled.
- [ ] Mixed flag combinations do not expose unavailable commands or corrupt existing state.
- [ ] Owner isolation and consent rules remain invariant across all workstreams.
- [ ] Operational logs and alerts identify workstream states without financial payloads.
- [ ] Recovery tests cover disabling a workstream during pending work.
- [ ] A rollout checklist prevents combining all Phase 1.2 workstreams into one unreviewed deployment.
- [ ] Production readiness is recorded separately for each workstream.

