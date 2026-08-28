# Phase 1.1 — Shared Expense Reimbursement

Status: Ready after Phase 1.0 pilot foundations

## Problem Statement

ในครอบครัวหรือคู่รัก ค่าใช้จ่ายจำนวนมากไม่ได้จ่ายจากบัญชีของผู้รับภาระค่าใช้จ่ายโดยตรง คนหนึ่งอาจออกเงินทั้งหมดก่อนแล้วอีกคนคืนยอดรวมปลายเดือน หากระบบนับเฉพาะวันที่เงินออกจากบัญชี ผู้ใช้จะไม่เห็นค่าใช้จ่ายส่วนตัวในวันที่เกิดจริง แต่หากบันทึกทั้งวันที่เกิดค่าใช้จ่ายและวันที่คืนเงินเป็น Expense ก็จะถูกนับซ้ำ

ผู้ใช้ต้องการเก็บว่าใครออกเงิน, ส่วนของตนเองเท่าไร, ต้องจ่ายคืนใครหรือรับคืนจากใคร, หลักฐานต้นทางคืออะไร และหลักฐานการคืนเงินจริงคืออะไร โดย ledger ของแต่ละคนยังต้องเป็นส่วนตัวและไม่เขียนข้อมูลให้อีกฝ่ายโดยอัตโนมัติ

## Solution

เพิ่ม Financial Contact, Reimbursement และ Settlement บน personal ledger เดิม Expense ยังคงเกิดตามวันที่บริโภคหรือวันที่ภาระค่าใช้จ่ายเกิด ส่วนเงินที่ออกจริงและส่วนของผู้ใช้ถูกเก็บแยกกัน

Reimbursement มีสองทิศทาง: `PAYABLE` เมื่อเจ้าของ ledger ต้องจ่ายคืน และ `RECEIVABLE` เมื่อเจ้าของ ledger ต้องได้รับคืน ผู้ใช้สามารถเลือกหลาย Reimbursements ที่ผลรวมตรงกับยอดโอนหนึ่งครั้ง แล้วสร้าง Settlement เพื่อปิดทั้งหมดโดยไม่สร้าง Expense ซ้ำ

Phase 1.1 รองรับเฉพาะ full allocation ของแต่ละ Reimbursement ไม่รองรับ partial payment, overpayment หรือการสร้างรายการใน ledger ของอีกฝ่าย

## User Stories

1. As a user, I want to create a private Financial Contact for my partner, relative or friend, so that I can reuse a familiar alias in reimbursement records.
2. As a user, I want a Financial Contact to exist even when that person does not use the app, so that expense tracking does not depend on adoption by others.
3. As a user, I want a contact alias encrypted, so that a database-only leak does not reveal my relationships.
4. As a user, I want to connect a Financial Contact to another registered user only with mutual consent, so that identities are not linked unilaterally.
5. As a connected user, I want the connection to grant no ledger visibility, so that connection does not weaken personal privacy.
6. As a user, I want to record `แฟนจ่ายค่าข้าวให้ 500`, so that my Expense and PAYABLE are created together.
7. As a user, I want to record `ผมจ่าย 1,000 ส่วนผม 500`, so that my Expense is 500, cash paid is 1,000 and RECEIVABLE is 500.
8. As a user, I want `หารครึ่ง` to calculate my share, so that common splits are fast.
9. As a user, I want to state my exact share, so that unequal purchases such as 360/140 are represented correctly.
10. As a user, I want to state a percentage split, so that non-equal proportional sharing is supported.
11. As a user, I want the system to ask when a total and payer are known but the split is missing, so that it never assumes 50/50.
12. As a user, I want the personal expense to appear on the date the expense occurred, so that trip and daily reports are accurate even before reimbursement.
13. As a user, I want the amount actually paid to be reported separately, so that cash outflow is not confused with personal consumption.
14. As a user, I want PAYABLE and RECEIVABLE totals shown separately, so that I know what I owe and what I should collect.
15. As a user, I want to list PAYABLE items by Financial Contact and date range, so that month-end repayment is easy to prepare.
16. As a user, I want to list RECEIVABLE items by Financial Contact and date range, so that I can follow up without exposing the list to that person.
17. As a user, I want a compact report showing personal expense, cash paid and reimbursement balance, so that the three concepts remain understandable.
18. As a user, I want to select several pending items and see their total before paying, so that one transfer can settle a month of obligations.
19. As a user, I want the selected total to equal the Settlement evidence amount, so that closed balances remain explainable.
20. As a user, I want a mismatch to leave every selected item pending, so that a failed settlement cannot partially mutate the ledger.
21. As a user, I want one Settlement to close several Reimbursements atomically, so that month-end payment is represented as one event.
22. As a user, I want the Settlement cash outflow recorded without another Expense, so that spending is not double-counted.
23. As a user, I want a bank fee to become a separate Expense, so that a fee does not look like overpayment to the contact.
24. As a user, I want to attach original Expense evidence, so that I can review why the reimbursement exists.
25. As a user, I want to attach separate Settlement evidence, so that I can prove repayment independently of the original purchase.
26. As a user, I want a text-only reimbursement to remain valid, so that missing images do not block simple recording.
27. As a user, I want edits to a pending Expense share to update the linked Reimbursement atomically, so that totals cannot diverge.
28. As a user, I want changing the payer to myself to cancel an obsolete PAYABLE, so that the outstanding list remains correct.
29. As a user, I want settled financial fields locked until Settlement is reversed, so that post-settlement edits do not create unexplained balances.
30. As a user, I want deletion of a pending Expense to cancel its Reimbursement, so that orphaned debts do not remain.
31. As a user, I want deletion of a settled Expense blocked until reversal, so that evidence and balances remain coherent.
32. As a user, I want a contact's raw OCR name and my private alias kept separately, so that AI does not silently merge identities.
33. As a user, I want AI to avoid linking an OCR name to a Financial Contact without explicit confidence and confirmation, so that the wrong person is not assigned.
34. As one of two connected users, I want my reimbursement entry to remain only in my ledger, so that the other person's data is never mutated automatically.
35. As a user, I want the deletion of another user's account to unlink but not erase my local contact history, so that my ledger remains intact.
36. As a product owner, I want reimbursement usage measured separately from core ledger usage, so that Phase 1.1 value can be evaluated independently.

## Implementation Decisions

### Domain model

- `Expense` is the user's economic share on the date the cost occurs.
- `paidAmount` is the amount of money the user actually paid at that event.
- `personalExpenseAmount` is the user's share that contributes to Expense reporting.
- `Reimbursement` represents money owed because one person paid on behalf of another.
- Reimbursement direction is `PAYABLE` or `RECEIVABLE` from the owner ledger's perspective.
- `Settlement` represents actual repayment and does not contribute a second Expense.
- `Evidence` identifies either the source Expense or the Settlement event.
- Reimbursement and Settlement records remain owner-scoped even when their Financial Contact links to a registered user.

### Financial Contact

- A Financial Contact is private to its owner and may be local-only or linked to a registered user.
- Contact states support local, invited and connected behavior.
- A registered-user link requires mutual consent.
- Connection grants identity convenience only. It grants no read, write, reporting, notification or evidence access across ledgers.
- Contact alias is the user-facing name. Raw names extracted from evidence remain distinct encrypted evidence fields.
- AI does not automatically link an OCR name to a contact when identity is ambiguous.
- The exact one-time initiation UX for connecting two existing users remains configurable, but the token must be authenticated, expiring and mutual.

### Split calculation

- Supported input modes are equal split, explicit owner amount and explicit owner percentage.
- Total amount, payer and owner share must reconcile before confirmation.
- If total and payer are known but share is absent, the system asks rather than assuming equal split.
- Arithmetic uses integer minor currency units and cannot rely on binary floating point.
- Rounding behavior must be shown in the preview when a percentage creates a non-integer satang result.
- Phase 1.1 operates in THB only.

### Expense and reimbursement creation

- Expense and its generated Reimbursement are created atomically after one preview confirmation.
- When another person paid the entire bill, `paidAmount` may be zero while `personalExpenseAmount` and PAYABLE are positive.
- When the user paid for others, `paidAmount` may exceed `personalExpenseAmount`, and the difference becomes RECEIVABLE.
- A reimbursement-linked preview shows personal expense, cash paid, direction, contact and reimbursement amount.
- Reports count `personalExpenseAmount` on the Expense date regardless of pending/settled reimbursement status.
- Reimbursement creation never creates or modifies data in another user's ledger.

### Settlement workflow

- The user can query pending PAYABLE or RECEIVABLE by contact and date range.
- The system displays item count, date range, selected entries and exact selected total before Settlement.
- One Settlement may close multiple Reimbursements.
- Every selected Reimbursement must be pending and owned by the same user.
- The Settlement amount must exactly equal the sum of selected Reimbursements.
- The whole operation is atomic: mismatch or failure leaves all items pending.
- Phase 1.1 does not permit partial allocation of a Reimbursement across Settlements.
- Phase 1.1 does not permit overpayment or prepayment. The system asks the user to correct selection/amount.
- A transfer fee is a separate Expense and is not allocated to the Financial Contact.
- Settlement evidence may be a slip image or text metadata.

### Editing, reversal and deletion

- Editing a pending Expense's share updates the linked Reimbursement in the same transaction and writes revisions for both.
- Changing the payer/contact/direction recomputes or cancels the pending Reimbursement as required.
- Financial values linked to a completed Settlement are locked.
- The user must reverse the Settlement before changing or deleting linked financial values.
- Reversal returns linked Reimbursements to pending and records a revision/audit event; it does not delete historical evidence metadata.
- Deleting a pending Expense cancels its linked Reimbursement atomically.
- Account deletion follows Phase 1.0 ownership rules. Deleting another user's account only removes a registered-user link from the surviving owner's contact.

### Reporting

- Summary separates personal Expense, cash paid, PAYABLE and RECEIVABLE.
- A Settlement changes cash paid and outstanding balances but does not increase personal Expense.
- Reports can filter reimbursement direction, status, Financial Contact and date range.
- A compact entry shows expense date, category, personal share, cash paid and pending amount.
- Detail view shows source Expense, Financial Contact alias, raw evidence names when authorized, Settlement state and evidence metadata.

### Evidence and retention

- `EXPENSE_EVIDENCE` and `SETTLEMENT_EVIDENCE` are distinct evidence purposes.
- Both use Phase 1.0 private storage, authorization and retention rules.
- Images are optional. Structured evidence metadata remains after images expire.
- Settlement evidence fingerprint/reference participates in owner-scoped duplicate detection.

### Release gate

- Phase 1.1 begins only after Phase 1.0 identity isolation, durable processing and ledger reporting are stable.
- Phase 1.1 must be available before expanding the pilot from the couple to the broader family group.
- A Phase 1.1 pilot demonstrates that month-end selected totals match completed Settlements and no Expense is double-counted.

## Testing Decisions

- Tests use the signed LINE webhook/application workflow seam established in Phase 1.0 and verify user-visible messages plus persisted owner-scoped state.
- Financial tests use exact minor-unit arithmetic and assert personal Expense, cash paid, PAYABLE/RECEIVABLE and Settlement effects separately.
- Required split tests cover equal split, explicit amount, percentage, 360/140 split, rounding, missing share, invalid negative share and share greater than total.
- Required direction tests cover another person paying for the user and the user paying for another person.
- Required privacy tests prove that connected users cannot read or mutate each other's contacts, reimbursements, settlements or evidence.
- Required contact tests cover local-only contacts, invite, mutual acceptance, rejection, duplicate aliases, unlinking and deletion of the linked user's account.
- Required creation tests prove Expense and Reimbursement commit atomically and roll back together on failure.
- Required report tests verify that pending reimbursement affects outstanding balances but not whether personal Expense is recognized.
- Required Settlement tests cover one item, several items, exact total, mismatch, concurrent settlement attempts and duplicate evidence.
- Required no-partial tests prove that paying less than one selected item's amount leaves it pending and creates no partial allocation.
- Required fee tests prove a bank fee creates its own Expense and does not change the contact's reimbursement amount.
- Required edit tests cover share changes, payer changes, contact changes and cancellation before Settlement.
- Required lock/reversal tests prove settled values cannot be edited/deleted before reversal and return to pending after a successful reversal.
- Required evidence tests distinguish source Expense evidence from Settlement evidence and apply independent authorization checks.
- Required account-deletion tests prove the surviving user's ledger/history is retained while the registered-user link is removed.

## Out of Scope

- Partial payment of one Reimbursement
- Allocating one Reimbursement across several Settlements
- Overpayment, prepayment or account credit with a Financial Contact
- Automatic creation of PAYABLE in another user's ledger
- Automatic creation of RECEIVABLE in another user's ledger
- Notification to or confirmation by the other person
- Shared ledger visibility
- Dispute workflow between two users
- Email-based invitations
- Interest, due-date penalties or formal lending
- Business accounts receivable/payable
- Multi-currency splitting or exchange rates
- Permanent image evidence vault

## Further Notes

- Phase 1.1 deliberately models personal economic Expense separately from cash movement. User-facing copy must consistently explain this distinction.
- `PAYABLE` and `RECEIVABLE` are from the current ledger owner's perspective, never from the contact's perspective.
- The physical database shape may use separate relations or equivalent constraints, but the domain concepts and atomicity must remain visible and independently testable.
- Partial Settlement belongs to Phase 1.2 because it introduces outstanding balances and many-to-many allocations.

