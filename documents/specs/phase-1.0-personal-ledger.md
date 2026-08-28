# Phase 1.0 — Personal Income and Expense Ledger

Status: Ready for implementation planning

## Problem Statement

ผู้ใช้ต้องการบันทึกรายรับ–รายจ่ายส่วนตัวอย่างสม่ำเสมอ แต่การเปิดแอป กรอกฟอร์ม เลือกหมวด และใส่วันที่ทีละช่องสร้าง friction จนมักไม่ได้บันทึก รายละเอียดสำคัญกระจายอยู่ในข้อความ สลิปธนาคาร และใบเสร็จ และผู้ใช้ไม่มีวิธีตรวจว่า AI เข้าใจถูกหรือแก้รายการที่ผิดได้อย่างรวดเร็ว

เดือนทดลองแรกมีผู้ใช้สองคนผ่าน LINE OA แต่ข้อมูลของแต่ละคนต้องแยกจากกันอย่างสมบูรณ์ ระบบต้องไม่ตอบรายการของคนหนึ่งให้อีกคน ไม่ทำรายการซ้ำเมื่อ LINE retry และไม่ทำรายการหายหลังระบบตอบรับแล้ว

โค้ดปัจจุบันรับข้อความและภาพจาก LINE และส่ง Gemini ได้ แต่ยังเป็น chatbot/OCR response เท่านั้น ยังไม่มี personal ledger, durable processing, confirmation workflow, reporting, privacy boundary หรือ meaningful automated tests

## Solution

สร้าง personal finance workflow ผ่านแชตส่วนตัวกับ LINE OA ผู้ใช้ส่งข้อความธรรมชาติ สลิปธนาคารไทย หรือใบเสร็จ ระบบรับ event อย่าง durable ระบุตัวผู้ใช้จาก LINE identity ที่ผ่าน allowlist ใช้ AI เฉพาะเพื่อแปลง input เป็น financial intent ที่ระบบรองรับ และสร้าง Draft ที่ผู้ใช้ตรวจ ยืนยัน แก้ไข หรือยกเลิกได้

เดือนทดลองแรก Transaction ทุกชิ้นต้องผ่าน preview และ confirmation ข้อมูลที่ยังขาด โดยเฉพาะวันที่ จะอยู่เป็น Draft ให้ผู้ใช้กลับมาทำต่อได้ รายงานรองรับวันนี้ เดือนปัจจุบัน และช่วงวันที่ โดยยึดวันที่เกิดรายการ ไม่ใช่วันที่ record ถูกสร้าง

ระบบต้องปฏิบัติต่อข้อมูลผู้ใช้เป็นข้อมูลส่วนตัว: ทุก query scope ด้วย owner, PII ถูก encrypt, LINE identity ค้นหาด้วย HMAC, รูปไม่อยู่ใน public web root, operational logs ไม่มี payload และ admin ไม่มี product interface สำหรับดูข้อมูลการเงิน

## User Stories

1. As an allowlisted user, I want to activate my account through LINE, so that unauthorized followers cannot use the financial features.
2. As a new user, I want to read and accept the privacy notice before activation, so that I understand that LINE and Google Gemini process my data.
3. As a user who does not consent, I want the system to avoid sending my content to AI, so that my choice is respected.
4. As a user, I want to send `ข้าว 80 วันนี้`, so that I can create an expense without opening a form.
5. As a user, I want to send `ได้เงินเดือน 50000 วันที่ 25`, so that I can record income using natural language.
6. As a user, I want to send a Thai bank slip, so that the system extracts the amount, date, money sender, money receiver, reference number and bank information.
7. As a user, I want to send a receipt whose total can be read, so that the purchase can become an expense draft.
8. As a user, I want unsupported formats such as PDF statements to receive a clear explanation, so that I know the input was not recorded.
9. As a user, I want a message with several entries to create several drafts, so that I can record a busy day in one message.
10. As a user, I want one stated date to apply to all clearly grouped entries in the same message, so that I do not repeat myself.
11. As a user, I want the system to limit one message to ten entries, so that the preview remains reviewable.
12. As a user, I want amount, type and transaction date to be mandatory, so that confirmed records are meaningful.
13. As a user, I want category, note and sender/receiver names to be optional, so that missing secondary details do not block recording.
14. As a user, I want `ยังไม่จัดหมวด` when the category is unclear, so that AI does not invent a category.
15. As a user who omits the date, I want quick replies for today, yesterday and date selection, so that I can complete the draft quickly.
16. As a user, I want date buttons to display an absolute date, so that a delayed click cannot silently select the wrong day.
17. As a user, I want a future transaction date to be rejected, so that planned events are not mixed with actual income and expenses.
18. As a user, I want every proposal previewed during the first-month pilot, so that I can catch AI mistakes before saving.
19. As a user, I want to confirm a valid preview, so that it becomes a Transaction and appears in reports.
20. As a user, I want to edit only the incorrect field, so that AI does not rewrite fields that were already correct.
21. As a user, I want to cancel a Draft, so that unwanted proposals never enter my ledger.
22. As a user, I want a Draft that I ignored for 24 hours to remain recoverable, so that an interruption does not lose the entry.
23. As a user, I want to list Drafts from today, yesterday, this week, last week, this month and last month, so that I can finish incomplete records later.
24. As a user, I want a stale Draft to stay out of financial reports, so that incomplete data does not affect totals.
25. As a user with several Drafts, I want a response to be tied to a specific Draft, so that `วันนี้` cannot update the wrong record.
26. As a user, I want `วันนี้` to filter Drafts when no Draft question is active, so that short commands remain useful.
27. As a user, I want one active Draft question to interpret `วันนี้` as that Draft's transaction date, so that the conversation feels natural.
28. As a user, I want a daily reminder summarizing stale Drafts, so that I can complete them without receiving repetitive notifications.
29. As a user, I want to view all confirmed entries for today, so that I can check daily spending.
30. As a user, I want a summary for the current month, so that I can understand monthly income and expenses.
31. As a user, I want a summary for an explicit date range, so that I can review a trip or another period.
32. As a user, I want natural-language date ranges to show the exact interpreted dates, so that I can verify the year and boundaries.
33. As a user, I want a range without a year to default to the current year and offer a quick way to change it, so that read-only queries remain fast without hiding assumptions.
34. As a user, I want a range that crosses calendar years to require confirmation, so that December-to-January reports use the intended years.
35. As a user, I want reports to show income total, expense total, net amount and category totals, so that I can understand the period at a glance.
36. As a user, I want large result sets paginated ten entries at a time, so that LINE messages remain readable.
37. As a user, I want every page token scoped to my identity and original filter, so that it cannot expose another ledger.
38. As a user, I want to open an entry's details, so that I can inspect date, amount, category, sender/receiver, note, revision history and evidence metadata.
39. As a user, I want to edit a confirmed Transaction, so that corrections appear in subsequent reports.
40. As a user, I want revision history retained, so that I can understand what changed.
41. As a user, I want to undo my latest independent Transaction within 24 hours, so that an obvious mistake is easy to reverse.
42. As a user, I want normal deletion to be recoverable for 30 days, so that accidental deletion is reversible.
43. As a user, I want a repeated webhook event to have no additional effect, so that LINE delivery retries do not duplicate my data.
44. As a user, I want a repeated slip reference or image fingerprint to show the existing entry, so that I do not accidentally record the same payment twice.
45. As a user, I want to explicitly override duplicate-slip protection, so that a rare intentional duplicate remains possible and auditable.
46. As a user, I want repeated text such as `กาแฟ 80` to remain recordable, so that legitimate repeated purchases are not incorrectly deduplicated.
47. As a credit-card user, I want the purchase date to carry the expense, so that paying the card bill does not double-count spending.
48. As a user receiving a refund, I want it linked to and offset against the original Expense, so that refunds do not inflate Income.
49. As a user, I want promised but unpaid income excluded, so that Income represents money actually received.
50. As a user transferring between my own accounts, I want the system to detect and decline the entry, so that it is not misclassified as income or expense.
51. As a user withdrawing cash, I want the system to detect and decline the withdrawal, so that subsequent cash purchases are not counted twice.
52. As a user, I want unsupported finance requests such as investment advice to be declined deterministically, so that the AI does not invent unsupported guidance.
53. As a user, I want failed OCR processing visible with retry and cancel actions, so that failed work does not disappear.
54. As a user, I want an acknowledgement only after the event is durably accepted, so that “received” means the system can recover the job.
55. As a user, I want delayed work to notify me and deliver the preview later, so that I understand the system is still processing.
56. As a user, I want my images inaccessible through public or guessable URLs, so that evidence remains private.
57. As a user, I want source images automatically removed according to retention policy, so that storage and privacy risks are bounded.
58. As a user, I want to export my ledger, so that I retain control over my financial data.
59. As a user, I want to request account deletion with a reversible grace period, so that I can leave without an irreversible accidental click.
60. As a returning user who previously unfollowed the OA, I want my inactive account restored when appropriate, so that unfollow does not silently destroy my ledger.
61. As an unknown LINE user, I want a clear unauthorized message without AI processing, so that the allowlist boundary is explicit.
62. As an administrator, I want operational health metrics without financial payloads, so that I can support the service without browsing private data.
63. As an administrator, I want alerts for stuck jobs, provider failures, database failures, disk pressure and missed cleanup, so that incidents are detected promptly.
64. As an administrator, I want an emergency kill switch, so that outbound processing can be stopped immediately during an identity-isolation or key incident.
65. As a product owner, I want AI proposals and user corrections measured during the pilot, so that accuracy is based on evidence rather than impressions.
66. As a product owner, I want the two-user pilot evaluated after 30 days, so that expansion to the family is based on agreed success criteria.

## Implementation Decisions

### Identity and authorization

- Phase 1.0 supports private one-to-one LINE chats only. Events from LINE groups or rooms are rejected without AI processing.
- Users are manually allowlisted for the two-person pilot. Email is not mandatory in Phase 1.0.
- A LINE user ID is normalized and transformed into a unique HMAC lookup value. The reversible value is encrypted only where outbound push messaging requires it.
- Encryption and lookup keys are distinct. Ciphertext records include IV/authentication data and a key version.
- Every user-owned aggregate stores an internal owner identifier. The owner comes only from the authenticated LINE event and can never be accepted from AI output, request text, postback payload or pagination input.
- Postbacks, pagination tokens, Draft references, Evidence access and Processing Jobs are bound to the authenticated owner.
- Unfollow deactivates the user and disables notifications; it does not delete financial data.
- Consent version and acceptance timestamp are recorded before the first content is sent to AI.

### Supported channels and inputs

- The supported channel is LINE OA private chat.
- Supported inputs are natural-language text, Thai bank slip images and receipt images with a readable total.
- PDF files, account statements, LINE groups, audio, video and arbitrary documents are rejected with a capability explanation.
- One text message may produce up to ten Drafts.
- Input files are validated using detected media type and size rather than trusting a filename or hardcoded JPEG assumption.

### Capability allowlist and AI boundary

- AI is a structured financial intent parser, not a general chatbot.
- Phase 1.0 intents cover create Income/Expense, supply missing Draft fields, confirm/edit/cancel, list Drafts, view today, summarize a date range/month, edit/delete/undo a Transaction and show help.
- Unsupported financial advice, investment allocation, budgeting, transfers, withdrawals and unknown commands receive deterministic responses listing available capabilities.
- AI output is schema-validated. Missing or ambiguous mandatory fields produce a Draft question instead of a guessed value.
- Numeric model confidence is not sufficient for automatic decisions. Deterministic validation checks mandatory fields, amount format, date validity, supported type, split-free arithmetic and duplicate state.
- During the first 30-day pilot every proposal requires confirmation. A later release may enable auto-save only after accuracy metrics meet the release gate.
- Prompt-injection-like content cannot expand the capability allowlist or authorize data access.

### Draft lifecycle

- Draft states are `AWAITING_INPUT`, `READY_TO_CONFIRM`, `STALE`, `CANCELLED` and `CONFIRMED`.
- A Draft is never included in financial reports.
- A Draft becomes `STALE` after 24 hours without required input but remains resumable for 90 days.
- Raw AI input/output is retained encrypted for 30 days during the pilot. Extracted structured proposal fields remain with the Draft until the 90-day Draft retention expires.
- Draft filters use creation time because an incomplete Draft may not yet have a transaction date.
- Draft filters support today, yesterday, Monday-to-Sunday current week, previous week, current month and previous month in `Asia/Bangkok`.
- A free-text date answer may update a Draft only when an active question points to one unambiguous Draft. Otherwise date words are interpreted as list filters.
- Date quick replies display and carry an absolute calendar date.
- A daily reminder may summarize the number of newly stale Drafts. It does not send one reminder per Draft.
- `PROCESSING_FAILED` is operationally distinct from a Draft and exposes retry/cancel actions.

### Transaction model and validation

- Phase 1.0 confirms only `INCOME` and `EXPENSE` Transactions.
- Mandatory Transaction data is owner, type, amount, currency, transaction date, source and status.
- Currency is always `THB`; the field is persisted to preserve a future multi-currency seam.
- Transaction date is mandatory. Exact hour/minute is optional. Database creation time is never substituted for an unknown transaction date.
- Future-dated Income/Expense is rejected.
- `moneySenderName`, `moneyReceiverName`, note and category are optional and treated as PII where applicable.
- Category must come from the fixed taxonomy. Uncertain categorization uses `UNCATEGORIZED` and does not block confirmation.
- Expense categories are food, transportation, accommodation, shopping/household goods, utilities/bills, health, education, entertainment, travel, fees, gifts/donations, other and uncategorized.
- Income categories are salary, bonus, side work/business, interest/dividends, gifts, other income and uncategorized.
- Income is recognized only after money is received.
- Expense is recognized on the date the expense occurs.
- A credit-card purchase is an Expense. Paying the card statement is detected as an unsupported transfer/settlement and is not recorded as another Expense.
- A refund is represented as an expense refund linked to the original Expense and reduces net Expense. It is not ordinary Income.
- Own-account transfer and ATM withdrawal intents are detected and declined rather than persisted as Income/Expense.

### Confirmation, editing and deletion

- Preview shows type, amount, transaction date, category, money sender, money receiver and any relevant note.
- The user can confirm, edit one field or cancel.
- After an edit the full preview is shown again before confirmation.
- Confirming creates one Transaction exactly once and marks the Draft confirmed atomically.
- Edits create an encrypted revision record with change timestamp. Operational logs record only that a change occurred.
- Undo applies only to the user's most recent independent Transaction within 24 hours.
- Normal deletion is soft deletion with a 30-day recovery window.
- Account deletion has a seven-day grace period, followed by hard deletion/anonymization of user-owned records. Provider backups expire according to their separate retention cycle.

### Duplicate handling

- The LINE webhook event ID is unique and is the primary idempotency key.
- LINE redelivery of the same event returns success without producing a second Draft, Transaction or outbound business response.
- Slip reference number and image fingerprint are owner-scoped duplicate signals.
- A detected duplicate slip shows the prior record and requires an explicit override to create another record. The override reason is auditable.
- Text content is not a duplicate key because identical purchases may legitimately recur.

### Reporting

- Transaction reports filter by transaction date in `Asia/Bangkok`; Draft reports filter by Draft creation time.
- Reports support today, current month and explicit start/end date ranges.
- Natural-language ranges without a year default to the current year for read-only queries, display the interpreted absolute dates and offer a quick year change.
- Cross-year ranges require an explicit absolute-date confirmation.
- A report shows total Income, total Expense, net amount and category totals.
- Detail lists show ten entries per page. Pagination tokens are opaque, expire and are owner/filter scoped.
- A compact row shows date, category, amount and receiver/merchant when available. Detailed view shows the remaining user-authorized information and revision/evidence metadata.

### Evidence and file lifecycle

- Evidence files are stored outside the public web root under random opaque identifiers.
- File reads go through an authenticated owner check. A raw filesystem path is never returned to LINE or stored in a user-facing token.
- The original image is retained for seven days for short-term OCR troubleshooting.
- An optimized image is retained in active storage for 90 days. The target size/quality is configurable and must be validated against OCR readability before production.
- Evidence metadata, extracted reference number and content fingerprint remain with the Transaction after the image is deleted.
- Phase 1.0 is a financial notebook, not a permanent evidence vault. Users rely on their bank or personal files for long-term proof.
- HostAtom backups may retain a deleted active file for up to the provider's 21-day backup window.
- Hosting cron invokes an authenticated, idempotent cleanup operation daily. Nest in-process scheduling may be a fallback but is not the primary retention guarantee.

### Durable processing and messaging

- A valid signed webhook is persisted to a database-backed inbox before the endpoint acknowledges success.
- Inbox records carry a unique event ID, owner reference, event type, status, attempt count, retry time and sanitized error code.
- Processing states are pending, processing, completed and failed.
- Transient AI/provider/database failures retry three times with increasing delays around 10 seconds, one minute and five minutes.
- Validation failures and unsupported inputs do not retry.
- A database-backed inbox is the durability mechanism. An in-memory concurrency limiter may additionally cap provider calls but cannot replace persistence.
- User-visible acknowledgement occurs only after durable acceptance.
- Delayed processing sends a status message and later delivers the preview through an owner-bound outbound message.
- A failed job remains visible with retry and cancel actions.

### Privacy, logs and administration

- Admin has no product UI or API for reading Transactions, Drafts, Evidence, amounts, notes or contact names.
- The privacy promise is access-control based, not end-to-end encryption; a server operator with application keys remains technically capable of decryption.
- Operational logs may contain timestamps, request/job/event references, pseudonymous user references, message type, payload size, attempt count, duration, provider request ID, sanitized error code and state transition.
- Operational logs must not contain raw LINE user ID, display name, text, amount, category, sender/receiver, OCR output, image URL/path, ciphertext, keys or payload-bearing stack traces.
- Operational logs are retained 90 days. Security audit logs are retained one year. Both are rotated and compressed.
- Admin access and security actions are auditable without storing financial payloads.
- Users can request export of their own confirmed Transactions and relevant metadata. Export delivery is owner-bound and expires.
- Users can request account deletion with a two-step confirmation and seven-day cancellation window.

### Provisioning and secrets

- Pilot users may be provisioned from a local tool because HostAtom permits remote database access.
- Provisioning uses a dedicated least-privilege database credential restricted to the developer's source IP. It is distinct from application and migration credentials.
- Remote database TLS must be verified before production. A successful DBeaver connection alone is not evidence of TLS.
- Provisioning computes HMAC and ciphertext; raw encrypted fields are not manually typed into the database.
- Encryption keys have offline encrypted backups in at least two controlled locations and support versioned rotation.
- Loss of all encryption keys is treated as unrecoverable PII loss even if database backups survive.

### Reliability and operational targets

- Webhook persistence and `2xx` response target is under two seconds at p95.
- User-visible acknowledgement target is under three seconds at p95.
- Text preview target is under ten seconds at p95.
- Image preview target is under twenty seconds at p95.
- After thirty seconds the user is told processing is delayed.
- Pilot rate limits are 30 messages/minute/user, 10 images/minute/user and 200 images/day/user.
- A configurable monthly AI cost warning and hard cap are required. When the cap is reached, new AI/OCR work pauses while read/edit/export operations remain available.
- Disk thresholds are warning at 70%, forced cleanup/log rotation at 80% and temporary rejection of new images at 90%.
- Monitoring covers webhook success, inbox backlog, stuck jobs, AI latency/errors/rate limits, database health, outbound LINE failures, disk usage, cleanup recency, duplicate prevention and backup/restore status.
- Alerts contain only operational references and counts.
- Recovery target is RPO at most 24 hours and RTO at most four hours. Restore is tested at least quarterly.
- An emergency kill switch stops webhook business processing and outbound push while preserving sanitized forensic metadata.

### Pilot success criteria

- Two users use the system for 30 consecutive days.
- At least 90% of supported submissions reach a recoverable Draft or preview.
- At least 95% of proposed amount/type/date fields are correct before user correction.
- No durably acknowledged event is lost.
- No webhook retry creates a duplicate Transaction.
- No unauthorized cross-user read, edit or response occurs.
- A user can correct an inaccurate proposal within 30 seconds.
- Cleanup, retention, backup and monitoring run successfully.
- AI cost remains below the configured pilot budget.
- Both pilot users choose to continue using the system at the end of the month.

## Testing Decisions

- Tests assert externally observable behavior and persisted business state, not private method calls or implementation structure.
- The primary test seam is the signed LINE webhook workflow with fake LINE and Gemini adapters plus a real disposable test database.
- A test submission should observe outbound LINE messages, Inbox state, Draft/Transaction state and owner-scoped queries through public application boundaries.
- Scheduled cleanup is tested through the same public operation called by hosting cron, with a controlled clock and temporary private storage.
- Prior test files in the repository do not provide usable behavior precedent: unit tests are commented and the existing end-to-end test targets a removed starter endpoint. Phase 1.0 establishes the new testing pattern.
- Required identity tests cover invalid LINE signatures, unknown users, missing consent, group events, inactive users and two users issuing identical commands concurrently.
- Required isolation tests attempt cross-user access through list queries, detail tokens, postbacks, Draft IDs, pagination tokens, Evidence references, background jobs and export links.
- Required ingestion tests cover one text entry, multiple text entries, valid bank slip, valid receipt, unsupported file, malformed AI output and prompt-injection-like input.
- Required Draft tests cover missing date, absolute quick replies, multiple pending Drafts, context expiry, stale listing, cancellation, confirmation and 90-day purge.
- Required date tests cover Bangkok day boundaries, Monday-to-Sunday weeks, month/year boundaries, omitted year, cross-year range, yesterday and future-date rejection.
- Required financial tests cover Income, Expense, credit-card purchase/payment, refund linkage, own-account transfer rejection and withdrawal rejection.
- Required duplicate tests cover LINE redelivery, concurrent delivery of the same event, repeated slip reference, repeated image fingerprint, explicit duplicate override and legitimate repeated text.
- Required durability tests stop processing after inbox commit, restart processing, retry provider errors, exhaust retries and verify exactly-one Transaction effect.
- Required editing tests cover one-field correction, revision history, undo window, soft deletion, recovery and account deletion cascade.
- Required Evidence tests cover MIME validation, private storage, unauthorized download, original/optimized retention and idempotent cleanup.
- Required privacy tests inspect captured logs and errors to ensure payload, raw IDs, PII and keys are absent.
- Required encryption tests cover HMAC lookup uniqueness, authenticated decryption, incorrect key, key version selection and rotation path.
- Required degraded-mode tests cover AI budget cap, disk thresholds, database outage, outbound LINE failure and emergency kill switch.
- Required performance checks measure webhook acknowledgement and text/image preview latency against the stated p95 targets in a representative pilot workload.

## Out of Scope

- LINE group or room usage
- Shared or household ledger
- Automatic cross-user record creation
- Split-expense PAYABLE/RECEIVABLE behavior, which belongs to Phase 1.1
- Partial Settlement or debt accounting
- Tracking balances across bank, cash or credit-card accounts
- Recording transfers between the user's own accounts
- Recording ATM withdrawal as an Expense
- Future-dated planned transactions
- Budgeting, trip budgets or overspend alerts
- Investment, tax, legal or financial advice
- Custom user-created categories
- Multi-currency support
- PDF statements or bulk statement import
- Permanent evidence archiving
- Email-based invitation
- Auto-save during the first-month pilot

## Further Notes

- Exact monthly AI budget and optimized-image target remain deployment configuration decisions.
- HostAtom's provider backup retention means “deleted after 90 days” refers to active storage; provider backups may retain the file for approximately 21 additional days.
- The first implementation plan should prioritize identity isolation, durable inbox and Transaction/Draft boundaries before expanding OCR sophistication.
- The current general-chat response path must be removed or placed behind the financial capability allowlist before pilot use.
- Phase 1.1 depends on the Phase 1.0 invariants and must not weaken personal-ledger isolation.

