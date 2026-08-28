# 18: Verify backup, restore and incident recovery

**What to build:** Prove that the pilot can recover from database/application loss within the agreed objectives and can be contained rapidly if data is sent to the wrong user or a key is suspected compromised.

**Blocked by:** 13: Export data and delete or deactivate an account; 14: Enforce Draft, Evidence, AI-data and log retention; 15: Add privacy-safe health metrics and alerts; 16: Enforce rate, budget and disk degraded modes; 17: Secure provisioning and encryption-key lifecycle.

**Status:** ready-for-agent

- [ ] A documented restore drill uses HostAtom backup data plus separately protected application keys.
- [ ] The drill demonstrates an RPO of at most 24 hours and RTO of at most four hours under the pilot assumptions.
- [ ] Restored Inbox/Job state cannot recreate a Transaction that already completed after the restored snapshot.
- [ ] Evidence retention behavior after restore remains explainable and cleanup resumes safely.
- [ ] The emergency kill switch can stop outbound processing during an identity incident.
- [ ] A key-compromise procedure covers containment, key rotation and affected-data assessment.
- [ ] A wrong-user-response procedure preserves sanitized forensic metadata without copying financial payload into admin logs.
- [ ] Recovery and incident steps identify owner, trigger, verification and rollback/exit conditions.
- [ ] Restore testing is scheduled at least quarterly.
- [ ] Recovery exercises do not require an administrator to browse user financial content.

