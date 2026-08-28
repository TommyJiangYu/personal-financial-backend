# Phase 1.2 — Extended Onboarding and Settlement

Status: Directional; each workstream requires implementation refinement after Phase 1.1 feedback

## Problem Statement

Phase 1.0 และ 1.1 ใช้ manual provisioning, full-only Settlement, fixed categories และ private one-sided reimbursement records ซึ่งเหมาะกับ pilot แต่สร้างข้อจำกัดเมื่อจำนวนสมาชิกเพิ่มขึ้น ผู้ดูแลต้องเพิ่มผู้ใช้ด้วยตนเอง ผู้ใช้ไม่สามารถส่ง claim ให้อีกฝ่ายตรวจยืนยัน การชำระบางส่วนทำไม่ได้ และ taxonomy ไม่สามารถปรับให้เหมาะกับพฤติกรรมของแต่ละคน

นอกจากนี้ Transfer และ cash movement ถูกตรวจจับแล้วปฏิเสธ หาก feedback จาก pilot แสดงว่าผู้ใช้ต้องการติดตามบัญชีหรือเงินสดจริง ระบบต้องเพิ่ม model ที่ไม่ทำให้รายรับ–รายจ่ายถูกนับซ้ำ

## Solution

Phase 1.2 ประกอบด้วย workstreams ที่เปิดใช้แยกกันได้:

1. Email invitation และ self-service onboarding ที่ผูก LINE identity อย่างปลอดภัย
2. Mutual reimbursement claim ที่อีกฝ่ายยืนยันหรือปฏิเสธได้โดยไม่เปิด ledger
3. Partial Settlement พร้อม allocation และยอดคงเหลือ
4. Custom categories ที่ยังรักษาความเสถียรของรายงาน
5. Transfer/cash-account tracking เฉพาะเมื่อ pilot feedback ยืนยันความต้องการ

แต่ละ workstream ต้องรักษา owner isolation, consent, encryption, auditability และ durable processing ของ Phase 1.0–1.1

## User Stories

1. As an existing user, I want to invite a family member by email, so that an administrator does not need to provision every account manually.
2. As an invited person, I want a one-time expiring code, so that I can bind my LINE identity securely.
3. As an invited person, I want the code to be single-use, so that a forwarded or replayed invitation cannot create another account.
4. As a user, I want my email encrypted and exact-match searchable without plaintext, so that onboarding does not weaken PII protection.
5. As a user, I want to accept the current consent version during onboarding, so that new processing purposes are transparent.
6. As an administrator, I want invitation status without seeing private ledger data, so that onboarding problems can be supported safely.
7. As a connected user, I want to send a reimbursement claim to another connected user, so that both sides can reconcile the same shared expense.
8. As a claim recipient, I want to see only the proposed shared-expense details, so that accepting a claim does not expose the sender's ledger.
9. As a claim recipient, I want to accept, reject or request correction, so that incorrect claims do not enter my ledger.
10. As a claim sender, I want rejection to leave my private record intact, so that the other person's decision cannot delete my history.
11. As two connected users, I want an accepted claim to create owner-scoped records in each ledger, so that both ledgers remain independent but reconcilable.
12. As a user, I want notifications for new claims to be opt-in, so that financial messages are not sent unexpectedly.
13. As a user, I want to pay part of a Reimbursement, so that a large balance can be reduced over several payments.
14. As a user, I want to see original, settled and outstanding amounts, so that partial payments are understandable.
15. As a user, I want one partial Settlement allocated to one or several Reimbursements, so that real transfer behavior can be represented.
16. As a user, I want allocation totals to reconcile exactly with the Settlement amount, so that no unexplained money remains.
17. As a user, I want overpayment to require an explicit adjustment or credit decision, so that the system does not guess.
18. As a user, I want to reverse one allocation without corrupting others, so that corrections remain traceable.
19. As a user, I want to create a private custom category, so that reports fit my life.
20. As a user, I want historical Transactions to retain their category identity after a category is renamed, so that reports remain explainable.
21. As a user, I want deleted categories mapped to an archival state rather than silently removed, so that old data is preserved.
22. As a user, I want AI to select only from my active categories, so that category creation does not reopen arbitrary AI output.
23. As a user who needs account tracking, I want transfers between my own accounts excluded from Income and Expense, so that balances can move without distorting reports.
24. As a cash user, I want ATM withdrawal to move money into a cash account, so that later cash purchases reduce the correct balance without double-counting Expense.
25. As a credit-card user, I want purchases and card payments represented as Expense plus account transfer, so that both spending and balances are correct.
26. As a product owner, I want each Phase 1.2 workstream feature-flagged, so that it can be piloted without destabilizing the core ledger.

## Implementation Decisions

### Release structure

- Phase 1.2 is not one indivisible release. Email onboarding, mutual claims, partial Settlement, custom categories and account tracking are separate feature-flagged workstreams.
- No workstream begins until Phase 1.1 integrity and privacy acceptance criteria pass.
- Each workstream gets its own migration, metrics and rollback/disable path.

### Email invitation and onboarding

- Email becomes optional PII associated with User only when invitation is enabled.
- Normalized email uses a unique HMAC for exact lookup and an encrypted reversible value for delivery/support needs.
- Invitation codes are cryptographically random, single-use, purpose-bound and expiring. Only a secure hash/HMAC is stored.
- The recipient sends or enters the invitation code through the authenticated LINE OA flow, binding the current LINE source identity.
- Invitation acceptance records inviter, recipient, consent version, timestamps and sanitized status without financial payload.
- Expired, consumed and revoked invitation codes cannot be reused.
- Email delivery provider, resend limits and expiry duration require a deployment decision before implementation.

### Mutual reimbursement claims

- A connection remains mutual and does not create general ledger access.
- A claim contains only the minimum explicitly shared fields: requesting user reference, contact relationship, amount/share, transaction date, short description and evidence metadata selected for sharing.
- Sending a claim does not mutate the recipient's ledger.
- Accepting creates recipient-owned records through the recipient's own authorization context.
- Rejecting or requesting correction does not alter the sender's private Expense/Reimbursement.
- Claim state and shared fields are auditable. Private notes, unrelated transactions and full reports are never included.
- Notifications are opt-in and contain no sensitive amount/detail unless the user explicitly enables them.

### Partial Settlement

- Reimbursement adds original, allocated and outstanding amounts.
- A Settlement may allocate amounts across multiple Reimbursements, and a Reimbursement may receive allocations from multiple Settlements.
- Allocation sums must equal the Settlement amount in minor currency units.
- A Reimbursement becomes partially settled when outstanding amount is greater than zero and less than original amount; it becomes settled at zero.
- Overpayment is not automatically converted to Income, Expense or contact credit. The user must select a supported explicit action introduced by that workstream.
- Reversal targets allocations and recomputes all affected outstanding balances atomically.
- Phase 1.1 full Settlement behavior remains a valid special case.

### Custom categories

- Categories are owner-scoped and have stable identifiers distinct from display names.
- Rename changes the display name without rewriting historical Transaction references.
- Archive removes the category from new selection while preserving history.
- AI may select only active fixed or owner-created categories.
- Reports can optionally map archived/custom categories to a fixed high-level reporting group.
- Category count, naming rules and duplicate handling require UX refinement before implementation.

### Transfer and account tracking

- This workstream is conditional on pilot feedback; detection-only remains the default.
- Account tracking introduces explicit account identities and transfer events separate from Income/Expense.
- A transfer moves balance between accounts and contributes neither Income nor Expense.
- ATM withdrawal moves value from a bank account to a cash account; subsequent cash spending creates Expense.
- Credit-card purchase creates Expense and card liability; statement payment transfers value to clear that liability.
- Account balances must never be inferred from incomplete history without clearly labeling them as tracked balances.
- Existing Phase 1 Transactions remain valid without an assigned account.

### Security and privacy

- All Phase 1.0 owner-scoping and postback/token binding rules apply.
- Mutual claim sharing is field-level explicit consent, not general cross-ledger authorization.
- Email, contact identity and shared claim PII follow HMAC/encryption/key-version rules.
- Admin operational views show invitation/claim states and error codes only.
- Every workstream has a kill switch independent of the core personal ledger.

## Testing Decisions

- Tests continue to use externally observable LINE/application workflows with fake email/LINE/AI adapters and a real disposable database.
- Email onboarding tests cover valid, expired, consumed, revoked and replayed invitation codes; consent; HMAC lookup; and concurrent acceptance.
- Onboarding isolation tests prove an invitation binds only the LINE identity that presents the valid code and cannot expose an existing user.
- Mutual claim tests cover send, accept, reject, correction request, duplicate delivery, notification opt-out and minimal-field sharing.
- Cross-ledger tests prove that only accepted claim data is materialized for the recipient and unrelated ledger data is never readable.
- Partial Settlement tests cover one/many allocations, exact reconciliation, multiple payments, outstanding-state transitions, concurrent allocations and reversals.
- Overpayment tests prove no automatic financial classification occurs.
- Custom category tests cover create, rename, archive, historical reporting, owner isolation and AI restriction to active categories.
- Account tracking tests cover own-account transfer, ATM-to-cash, cash Expense, card purchase/payment and migration of account-less historical Transactions.
- Feature-flag tests prove each workstream can be disabled without breaking Phase 1.0/1.1 reads and edits.

## Out of Scope

- Public social graph or user search
- Ledger sharing beyond explicitly accepted claim fields
- Joint account ownership
- Automatic claim acceptance
- Formal debt collection, interest or penalties
- Business invoicing and accounts receivable
- Currency conversion
- Budgets, trip planning or forecasting
- Investment advice
- Bank account aggregation or bank API synchronization

## Further Notes

- This document establishes boundaries and invariants, but exact invitation delivery, contact-link initiation, overpayment treatment and account reconciliation UX require focused design before implementation.
- Partial Settlement materially deepens the domain and should not be combined with email onboarding in one risky deployment solely because both are labeled Phase 1.2.
- Account tracking should remain unimplemented if Phase 1 feedback confirms that users naturally omit own transfers and ATM withdrawals.

