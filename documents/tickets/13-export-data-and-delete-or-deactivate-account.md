# 13: Export data and delete or deactivate an account

**What to build:** Give each user control over their personal data through owner-only export, reversible account-deletion requests and non-destructive unfollow deactivation.

**Blocked by:** 06: Resume incomplete Drafts and resolve mandatory dates; 08: Create private Evidence-backed Drafts from images; 11: Edit, revise, undo and recover Transactions.

**Status:** ready-for-agent

- [ ] The owner can request an export containing their Transactions, Draft metadata, revisions and Evidence metadata in documented formats.
- [ ] An export excludes data belonging to every other user.
- [ ] Export delivery is owner-bound, expiring and inaccessible through a copied token from another user.
- [ ] Unfollow deactivates the account and notifications without deleting data.
- [ ] Re-follow can restore an eligible inactive account after normal authorization checks.
- [ ] Account deletion presents the affected data classes and requires two explicit confirmations.
- [ ] The user can cancel an account-deletion request during a seven-day grace period.
- [ ] After the grace period, owner PII, Drafts, Transactions, revisions and active Evidence are hard-deleted or irreversibly anonymized as specified.
- [ ] Operational/security logs retain only pseudonymous references after deletion.
- [ ] Deletion is idempotent and safe to resume after partial infrastructure failure.

