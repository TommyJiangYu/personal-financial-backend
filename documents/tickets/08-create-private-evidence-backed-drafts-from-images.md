# 08: Create private Evidence-backed Drafts from images

**What to build:** Turn a supported bank slip or receipt image into a private Evidence-backed Draft by validating the file, extracting structured fields, optimizing storage and asking for any mandatory financial information that cannot be determined safely.

**Blocked by:** 05: Record one dated text Income or Expense.

**Status:** ready-for-agent

- [ ] The downloaded file is validated by detected media type and configured size limits rather than a hardcoded JPEG assumption.
- [ ] Unsupported or unreadable files receive a clear response and create no Transaction.
- [ ] Original content is stored under an opaque random identifier outside the public web root.
- [ ] A bounded optimized copy is produced without losing OCR readability under the agreed evaluation set.
- [ ] OCR extracts available amount, date, sender, receiver, reference number, note and bank information into a validated proposal.
- [ ] Missing amount or date prevents confirmation and asks only for the missing field.
- [ ] Unknown direction prompts the user to choose Income or Expense.
- [ ] The preview uses `moneySenderName` and `moneyReceiverName` without exposing raw storage paths.
- [ ] Evidence access is owner-authorized and cannot be obtained through a guessed identifier.
- [ ] A confirmed image Draft links the resulting Transaction to Evidence metadata.

