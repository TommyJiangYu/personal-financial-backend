# Personal Financial System — Specification Index

เอกสารชุดนี้สรุป product requirements ที่ตกลงร่วมกันสำหรับระบบบันทึกรายรับ–รายจ่ายส่วนตัวผ่าน LINE OA โดยแบ่งขอบเขตออกเป็น release ที่สามารถส่งมอบและตรวจสอบได้แยกจากกัน

## Product Definition

ผลิตภัณฑ์นี้เป็นสมุดบันทึกรายรับ–รายจ่ายส่วนตัว ไม่ใช่บัญชีครอบครัวร่วม ผู้ใช้แต่ละคนมี ledger ของตนเองและต้องไม่สามารถเห็นหรือแก้ข้อมูลของผู้อื่นได้ ผู้ใช้ส่งข้อความหรือภาพผ่านแชตส่วนตัวกับ LINE OA แล้วระบบช่วยแปลงข้อมูลเป็นรายการทางการเงินที่ตรวจสอบและยืนยันได้

เดือนทดลองแรกใช้กับผู้ใช้สองคนเป็นเวลา 30 วัน ก่อนพิจารณาขยายเป็นสมาชิกครอบครัวประมาณห้าคน

## Specification Set

1. [Phase 1.0 — Personal Income and Expense Ledger](./phase-1.0-personal-ledger.md)
   - การบันทึกรายรับ–รายจ่ายจากข้อความและภาพ
   - Draft, confirmation, edit, delete, undo และรายงานตามช่วงเวลา
   - User isolation, privacy, reliability, retention และ production readiness
2. [Phase 1.1 — Shared Expense Reimbursement](./phase-1.1-reimbursements.md)
   - Financial Contacts
   - ค่าใช้จ่ายที่มีคนออกแทน, PAYABLE, RECEIVABLE และ batch Settlement
3. [Phase 1.2 — Extended Onboarding and Settlement](./phase-1.2-extended-capabilities.md)
   - Email invitation
   - Mutual claim confirmation
   - Partial settlement, custom categories และ transfer/cash-account tracking
4. [Phase 2+ — Product Expansion](./phase-2-plus-product-expansion.md)
   - Budget/trip, multi-currency, statement import และ shared-ledger capabilities
   - Investment guidance เป็นเพียง candidate ที่ต้องผ่าน legal/product discovery แยกต่างหาก

## Delivery Order and Gates

| Release | Goal | Entry condition | Exit condition |
| --- | --- | --- | --- |
| Phase 1.0 | พิสูจน์ว่า personal ledger ผ่าน LINE ใช้งานจริงได้ | LINE/Gemini/MySQL baseline พร้อม | ผู้ใช้สองคนผ่าน pilot 30 วันตาม acceptance criteria |
| Phase 1.1 | รองรับรูปแบบครอบครัวที่มีคนหนึ่งออกเงินแทน | Phase 1.0 data isolation และ ledger integrity ผ่าน | Batch Settlement ใช้งานได้โดยไม่ทำให้ expense ถูกนับซ้ำ |
| Phase 1.2 | ลดงาน manual และรองรับความสัมพันธ์ที่ซับซ้อนขึ้น | Phase 1.1 ผ่าน pilot จริง | Onboarding และ partial settlement มีข้อกำหนดที่ยืนยันแล้วและผ่าน tests |
| Phase 2+ | ขยายจาก ledger ไปสู่ planning/shared finance | มี usage feedback เพียงพอ | กำหนดแยกตามแต่ละ feature |

## Canonical Domain Vocabulary

| Term | Meaning |
| --- | --- |
| User | บุคคลที่ได้รับอนุญาตให้ใช้ LINE OA และมี ledger ส่วนตัว |
| Ledger | ชุดรายการทางการเงินส่วนตัวของ User หนึ่งคน |
| Transaction | รายรับหรือรายจ่ายที่ผู้ใช้ยืนยันแล้ว |
| Draft | ข้อเสนอรายการที่ยังขาดข้อมูลหรือรอการยืนยันและยังไม่ถูกนับในรายงาน |
| Income | เงินที่ผู้ใช้ได้รับจริงแล้ว |
| Expense | ค่าใช้จ่ายส่วนตัวตามวันที่เกิดค่าใช้จ่าย ไม่จำเป็นต้องตรงกับวันที่เงินออกจริง |
| Evidence | ข้อมูลหรือภาพที่ใช้อ้างอิงเหตุการณ์ทางการเงิน |
| Financial Contact | บุคคลที่ผู้ใช้ใช้ระบุความสัมพันธ์ทางการเงิน อาจเป็นหรือไม่เป็น User ก็ได้ |
| Reimbursement | ยอดที่เกิดจากการที่บุคคลหนึ่งออกค่าใช้จ่ายแทนอีกบุคคลหนึ่ง |
| PAYABLE | ยอดที่เจ้าของ ledger ต้องจ่ายคืนผู้อื่น |
| RECEIVABLE | ยอดที่เจ้าของ ledger ต้องได้รับคืนจากผู้อื่น |
| Settlement | การจ่ายเงินจริงเพื่อปิด Reimbursement; ไม่ใช่ Expense ใหม่ |
| Operational Log | Log สำหรับดูสุขภาพระบบซึ่งต้องไม่มี payload หรือ PII |
| Security Audit Log | Log การกระทำด้านสิทธิ์ ความปลอดภัย และการดูแลระบบ |

## Cross-Phase Invariants

1. Ledger ทุกเล่มเป็นส่วนตัว การเชื่อม Financial Contact ไม่ให้สิทธิ์อ่านหรือแก้ ledger
2. AI ไม่มีสิทธิ์กำหนดเจ้าของข้อมูล เจ้าของต้องมาจาก authenticated LINE identity เท่านั้น
3. Transaction เกิดขึ้นเมื่อผู้ใช้ยืนยันแล้ว Draft ไม่ถูกนับในรายงาน
4. วันที่เกิดรายการทางการเงินแยกจากวันที่สร้าง record ในฐานข้อมูล
5. Settlement ต้องไม่ทำให้ Expense ถูกนับซ้ำ
6. ทุก accepted webhook ต้องกู้กลับมาประมวลผลต่อได้และ event เดิมต้องไม่สร้างผลซ้ำ
7. Admin ไม่มี product UI/API สำหรับเปิดดูข้อมูลการเงินของผู้ใช้
8. AI ตอบหรือดำเนินการได้เฉพาะ capability ที่ระบบรองรับอย่างชัดเจน
9. Phase 1 รองรับเฉพาะ THB และ `Asia/Bangkok`
10. รูปและ raw AI data เป็นข้อมูลชั่วคราว Transaction เป็นข้อมูลระยะยาวจนกว่าผู้ใช้จะลบ

## Current Codebase Baseline

สิ่งที่มีอยู่แล้ว:

- NestJS backend และ LINE webhook endpoint
- LINE signature validation
- Routing สำหรับ text, image, follow, unfollow และ postback
- Gemini text generation และ OCR สำหรับสลิป
- Prisma เชื่อม MySQL/MariaDB และมี User model เบื้องต้น
- Helmet และ global request throttling

ช่องว่างหลักเมื่อเทียบกับ Phase 1.0:

- Text flow ยังเป็น general chatbot ไม่ใช่ allowlisted financial command parser
- OCR อ่านและตอบกลับแต่ยังไม่สร้าง Transaction
- ไม่มี user lookup, allowlist, consent หรือ owner-scoped authorization
- ไม่มี Draft, Transaction, Revision, Evidence, Inbox Event หรือ Processing Job
- ไม่มี idempotency หรือ durable retry
- Webhook ตอบ `200 OK` ก่อน persist งาน จึงมีโอกาสสูญหายหลัง process restart
- Log ปัจจุบันมี raw text, LINE user ID และ OCR response
- Encryption key มีใน configuration แต่ยังไม่มี encryption/HMAC implementation
- User model ยังบังคับ email และใช้ role `OWNER/PARTNER` ซึ่งไม่ตรงกับ personal-ledger model
- ไม่มี file retention, cleanup, reporting, export หรือ account deletion flow
- Automated tests ปัจจุบันยังไม่ครอบคลุม behavior ที่ใช้งานจริง
- ไม่มี health check, monitoring, recovery runbook หรือ emergency kill switch

## Primary Testing Seam

Testing seam หลักของ Phase 1 คือ workflow ระดับ LINE webhook: ส่ง signed LINE event เข้าระบบด้วย fake LINE/Gemini adapters แล้วตรวจ outbound message, database state, job state และ file metadata ที่ผู้ใช้สังเกตได้จากภายนอก

ใช้ seam นี้ทดสอบทั้ง happy path, cross-user isolation, duplicate delivery, retry, draft lifecycle และ report behavior โดยหลีกเลี่ยง test ที่ผูกกับ method ภายใน ส่วน scheduled cleanup และ recovery operations ให้ทดสอบผ่าน public application operation เดียวกับที่ hosting cron เรียก

## Open Configuration Values

รายการเหล่านี้ไม่ใช่ product ambiguity แต่ต้องกำหนดค่าก่อน production:

- Monthly AI cost warning และ hard budget cap
- ขนาด/คุณภาพเป้าหมายของ optimized evidence image หลังทดสอบ OCR readability
- TLS configuration ของ remote MySQL connection
- IP allowlist และอายุของ provisioning database credential
- วิธี initiate Financial Contact connection ใน Phase 1.1
- Provider-specific cron authentication secret และ rotation procedure

## Hosting Assumptions

- ใช้ HostAtom Web Hosting แพ็กเกจ Go พื้นที่ 10 GB
- Hosting cron เป็น scheduler หลัก; Nest in-process schedule เป็น fallback เท่านั้น
- Provider backup มี 21 ชุดย้อนหลัง 21 วัน
- Active evidence ถูกลบเมื่อครบ 90 วัน แต่อาจยังเหลือใน provider backup ได้อีกประมาณ 21 วัน
- Remote database access ต้องจำกัด source IP และใช้ dedicated credentials ตามหน้าที่

แหล่งอ้างอิง: [HostAtom Web Hosting](https://www.hostatom.com/web-hosting/), [HostAtom SLA](https://www.hostatom.com/sla/), [HostAtom Cron Job](https://kb.hostatom.com/content/35499/), [HostAtom Remote Database Access](https://kb.hostatom.com/content/8928/)
