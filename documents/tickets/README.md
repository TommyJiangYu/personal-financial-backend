# Personal Financial System — Ticket Index

Tickets ชุดนี้แตกจาก specs ใน `documents/specs` เป็น tracer-bullet slices ที่ทำงานผ่าน user-visible workflow ตั้งแต่ LINE event, business state, outbound response และ automated tests

ทุก ticket มีสถานะ `ready-for-agent` แต่เริ่มได้ต่อเมื่อ tickets ใน `Blocked by` เสร็จแล้วเท่านั้น

## Current Frontier

- [01: Establish the testable LINE workflow seam](./01-establish-testable-line-workflow-seam.md) — เริ่มได้ทันที

## Phase Gates

| Gate | Ticket | Blocks |
| --- | --- | --- |
| Phase 1.0 pilot readiness | [19](./19-pass-phase-1-0-pilot-readiness-gate.md) | Phase 1.1 implementation |
| Phase 1.1 reimbursement readiness | [26](./26-pass-phase-1-1-reimbursement-gate.md) | Phase 1.2 workstreams and Phase 2 discovery |
| Phase 1.2 integration | [34](./34-integrate-and-verify-phase-1-2-feature-flags.md) | Production rollout of combined Phase 1.2 workstreams |

## Phase 1.0 — Personal Ledger

1. [Establish the testable LINE workflow seam](./01-establish-testable-line-workflow-seam.md)
2. [Protect pilot access with encrypted LINE identity and consent](./02-protect-pilot-access-with-encrypted-line-identity-and-consent.md)
3. [Durably accept webhook events exactly once](./03-durably-accept-webhook-events-exactly-once.md)
4. [Process Inbox jobs with retry and delayed user feedback](./04-process-inbox-jobs-with-retry-and-delayed-feedback.md)
5. [Record one dated text Income or Expense](./05-record-one-dated-text-income-or-expense.md)
6. [Resume incomplete Drafts and resolve mandatory dates](./06-resume-incomplete-drafts-and-resolve-mandatory-dates.md)
7. [Parse multiple entries and enforce the capability allowlist](./07-parse-multiple-entries-and-enforce-capability-allowlist.md)
8. [Create private Evidence-backed Drafts from images](./08-create-private-evidence-backed-drafts-from-images.md)
9. [Prevent duplicate slips with explicit override](./09-prevent-duplicate-slips-with-explicit-override.md)
10. [Report today, month and date ranges safely](./10-report-today-month-and-date-ranges-safely.md)
11. [Edit, revise, undo and recover Transactions](./11-edit-revise-undo-and-recover-transactions.md)
12. [Handle refunds, cards and unsupported cash movements](./12-handle-refunds-cards-and-unsupported-cash-movements.md)
13. [Export data and delete or deactivate an account](./13-export-data-and-delete-or-deactivate-account.md)
14. [Enforce Draft, Evidence, AI-data and log retention](./14-enforce-draft-evidence-ai-data-and-log-retention.md)
15. [Add privacy-safe health metrics and alerts](./15-add-privacy-safe-health-metrics-and-alerts.md)
16. [Enforce rate, budget and disk degraded modes](./16-enforce-rate-budget-and-disk-degraded-modes.md)
17. [Secure provisioning and encryption-key lifecycle](./17-secure-provisioning-and-encryption-key-lifecycle.md)
18. [Verify backup, restore and incident recovery](./18-verify-backup-restore-and-incident-recovery.md)
19. [Pass the Phase 1.0 pilot-readiness gate](./19-pass-phase-1-0-pilot-readiness-gate.md)

## Phase 1.1 — Reimbursement

20. [Create private Financial Contacts](./20-create-private-financial-contacts.md)
21. [Connect existing users with mutual consent](./21-connect-existing-users-with-mutual-consent.md)
22. [Create split Expenses with PAYABLE or RECEIVABLE](./22-create-split-expenses-with-payable-or-receivable.md)
23. [Report personal Expense, cash paid and outstanding balances](./23-report-personal-expense-cash-paid-and-outstanding-balances.md)
24. [Settle multiple exact-match Reimbursements](./24-settle-multiple-exact-match-reimbursements.md)
25. [Edit, reverse and delete reimbursement-linked records safely](./25-edit-reverse-and-delete-reimbursement-records-safely.md)
26. [Pass the Phase 1.1 reimbursement gate](./26-pass-phase-1-1-reimbursement-gate.md)

## Phase 1.2 — Extended Capabilities

27. [Onboard users through expiring email invitations](./27-onboard-users-through-expiring-email-invitations.md)
28. [Exchange mutual reimbursement claims](./28-exchange-mutual-reimbursement-claims.md)
29. [Allocate partial Settlements](./29-allocate-partial-settlements.md)
30. [Manage owner-defined categories](./30-manage-owner-defined-categories.md)
31. [Track accounts and own-account transfers](./31-track-accounts-and-own-account-transfers.md)
32. [Track ATM withdrawals and cash spending](./32-track-atm-withdrawals-and-cash-spending.md)
33. [Track credit-card purchases and statement payments](./33-track-credit-card-purchases-and-statement-payments.md)
34. [Integrate and verify Phase 1.2 feature flags](./34-integrate-and-verify-phase-1-2-feature-flags.md)

## Phase 2+ — Discovery

35. [Analyze pilot usage and select Phase 2 workstreams](./35-analyze-pilot-usage-and-select-phase-2-workstreams.md)
36. [Produce an implementation-ready Budget and Trip spec](./36-produce-budget-and-trip-implementation-spec.md)
37. [Produce an implementation-ready Multi-currency spec](./37-produce-multi-currency-implementation-spec.md)
38. [Produce an implementation-ready Statement Import spec](./38-produce-statement-import-implementation-spec.md)
39. [Produce an implementation-ready Shared Views spec](./39-produce-shared-views-implementation-spec.md)
40. [Decide whether Financial Guidance is safe to pursue](./40-decide-financial-guidance-go-or-no-go.md)

## Dependency Notes

- Phase 1.0 เริ่มเป็น chain ที่ tickets 01–05 เพื่อสร้าง test seam, identity, durable acceptance, worker และ Transaction happy path
- หลัง ticket 05 งาน Draft, image ingestion และ reporting แยกทำได้ตาม blockers ของแต่ละ ticket
- Phase 1.1 เริ่มหลัง ticket 19 เท่านั้น
- หลัง ticket 20 งาน mutual connection และ split Expense สามารถเดินคู่ขนานได้
- Phase 1.2 workstreams เริ่มหลัง ticket 26 และสามารถทำคู่ขนานตาม blocking edges
- Phase 2 discovery เริ่มหลัง ticket 35 ได้พร้อมกัน แต่ยังไม่ใช่ implementation work

