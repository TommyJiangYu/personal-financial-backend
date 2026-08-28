# 21: Connect existing users with mutual consent

**What to build:** Allow two existing users to mutually link their private Financial Contacts through an authenticated, expiring connection flow while preserving complete ledger isolation.

**Blocked by:** 20: Create private Financial Contacts.

**Status:** ready-for-agent

- [ ] One user can initiate a purpose-bound, expiring connection request for an existing user.
- [ ] The recipient must explicitly accept before either contact is marked connected.
- [ ] Rejected, expired, consumed and replayed connection tokens cannot create a link.
- [ ] Connection requires both users to be active and consented.
- [ ] A connected state does not allow either user to list, read, edit or download the other's ledger or Evidence.
- [ ] Connection does not automatically create PAYABLE, RECEIVABLE or notifications.
- [ ] Either user can disconnect without deleting historical entries in the other's ledger.
- [ ] If one account is deleted, the surviving contact becomes local-only and retains its owner's history.
- [ ] Concurrent accept/reject actions produce one consistent outcome.
- [ ] Cross-user isolation tests cover contact tokens and connected-user identifiers.

