# Phase 2+ — Product Expansion

Status: Candidate roadmap; not implementation-ready

## Problem Statement

หลัง personal ledger และ reimbursement workflow พิสูจน์การใช้งานจริงแล้ว ผู้ใช้อาจต้องการวางแผนงบประมาณ จัดกลุ่มค่าใช้จ่ายตามทริป นำเข้าข้อมูลจำนวนมาก รองรับหลายสกุลเงิน หรือแชร์ข้อมูลบางส่วนกับครอบครัว ความต้องการเหล่านี้เปลี่ยนผลิตภัณฑ์จากเครื่องมือบันทึกส่วนตัวไปสู่ planning, collaboration หรือ advice ซึ่งมีความเสี่ยงและ domain complexity สูงกว่า Phase 1 อย่างมีนัยสำคัญ

การรวมความสามารถเหล่านี้เข้า Phase 1 จะทำให้เป้าหมาย “ส่งข้อความหรือสลิปแล้วบันทึกได้ง่ายที่สุด” สูญเสียความชัดเจน และอาจทำให้ privacy boundary ของ personal ledger อ่อนลง

## Solution

เก็บ Phase 2+ เป็นชุด candidate workstreams ที่ต้องผ่าน usage research และ requirement grilling แยกจากกัน โดยใช้ personal ledger เป็น source of truth และไม่เปลี่ยนสิทธิ์การเข้าถึงโดยปริยาย

Candidate workstreams ได้แก่ budget/trip planning, multi-currency, PDF/statement import, explicitly shared household views และ financial guidance ที่ผ่าน legal/safety review

## User Stories

1. As a user, I want to create a budget for a period, so that I can compare actual personal Expense against a planned limit.
2. As a traveler, I want to group Transactions into a trip, so that I can review trip spending without changing the underlying ledger.
3. As a traveler, I want trip date ranges to suggest relevant Transactions, so that grouping is fast but remains confirmable.
4. As a user, I want an overspend alert only after opting in, so that notifications do not become intrusive.
5. As a user, I want budget reports to distinguish personal Expense, cash paid and reimbursement balances, so that shared purchases do not distort the budget.
6. As a user, I want to record a Transaction in another currency, so that overseas spending is represented accurately.
7. As a user, I want original amount/currency preserved separately from converted reporting amount, so that exchange-rate assumptions remain visible.
8. As a user, I want exchange-rate source and timestamp disclosed, so that conversions can be audited.
9. As a user, I want to import a PDF or bank statement, so that historical entries can be added in bulk.
10. As a user, I want imported rows previewed and deduplicated before confirmation, so that bulk import cannot corrupt the ledger.
11. As a user, I want statement import to identify transfers and card payments, so that they are not counted as new Expense.
12. As a user, I want to share a selected report with a family member, so that collaboration is explicit and limited.
13. As a user, I want shared access to expire or be revoked, so that sharing is not permanent by default.
14. As a household member, I want a shared view to contain only opted-in entries, so that private entries remain private.
15. As a user, I want any future financial guidance clearly separated from record keeping, so that suggestions cannot silently mutate my ledger.
16. As a user, I want advice to disclose assumptions and uncertainty, so that it is not presented as guaranteed financial outcome.
17. As a product owner, I want legal and safety review before enabling investment guidance, so that high-stakes recommendations are handled responsibly.
18. As a product owner, I want each Phase 2 workstream validated by observed Phase 1 behavior, so that roadmap scope follows real needs.

## Implementation Decisions

### General phase boundary

- No Phase 2 capability is implied by Phase 1 data. Each requires an explicit product decision, privacy review and separate acceptance criteria.
- Phase 2 workstreams consume confirmed ledger data and may add references/grouping; they do not rewrite historical Transaction meaning without user confirmation.
- Every collaborative feature is opt-in and field/record scoped.

### Budgets and trips

- Budget is a planning aggregate separate from Transaction.
- Trip is an optional grouping/context over Transactions and date ranges, not a new ledger.
- Actual spend uses personal Expense as the primary value and may display cash paid and reimbursement balances separately.
- Notifications are configurable and owner-scoped.

### Multi-currency

- Original amount and original currency are immutable facts.
- Converted amount is a derived value with rate source and effective timestamp.
- Settlement and split arithmetic must define currency and rounding explicitly.
- Currency conversion requires a trusted rate source and failure behavior before implementation.

### Bulk import

- PDF/statement import is a staged workflow: upload, parse, normalize, deduplicate, preview and batch confirm.
- Imported rows do not bypass owner authorization, mandatory dates, category restrictions or duplicate protection.
- Bank statements may contain sensitive account data and need a separate retention/privacy assessment.

### Shared views

- A household/shared view is not the default owner model.
- Sharing is explicit by record/report scope, recipient, purpose and duration.
- Revocation blocks future access without deleting the owner's source records.
- Mutual contacts do not automatically become shared-view members.

### Financial guidance

- Investment or allocation advice is not committed merely by appearing on the roadmap.
- It requires legal/regulatory review, safety policy, source quality requirements, suitability boundaries and a clear separation from ledger commands.
- Guidance must never create or modify Transactions without a separate explicit financial-record action.

## Testing Decisions

- Each workstream defines its own highest externally observable seam and reuses owner-scoped ledger APIs rather than database coupling.
- Budget/trip tests cover date boundaries, reimbursement-aware totals, grouping/removal and notification preferences.
- Multi-currency tests cover original-value immutability, rate timestamp, rounding and unavailable-rate behavior.
- Bulk-import tests cover malicious files, parser errors, duplicate detection, batch confirmation, partial failure and rollback.
- Shared-view tests cover explicit inclusion, recipient authorization, expiry, revocation, screenshots/links where technically controllable and non-member denial.
- Financial-guidance tests, if ever authorized, require safety/evaluation criteria beyond ordinary feature tests.

## Out of Scope

- Any assumption that all family members share one ledger
- Automatic sharing based solely on Financial Contact connection
- Bank credential collection in the initial Phase 2 workstreams
- Autonomous transfers, bill payments or investments
- Guaranteed investment returns or personalized regulated advice without review
- Replacing bank statements or official evidence

## Further Notes

- Budget/trip was discussed only as an example motivating date-range reports and is not a current Phase 1 requirement.
- Investment advice was explicitly rejected for the supported Phase 1 AI capability set. It should remain disabled unless a future dedicated discovery approves it.
- This roadmap should be revised after the two-user and family pilots rather than treated as a fixed implementation queue.

