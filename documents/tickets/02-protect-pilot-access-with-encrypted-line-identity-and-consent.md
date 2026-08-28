# 02: Protect pilot access with encrypted LINE identity and consent

**What to build:** Make the LINE OA usable only by manually allowlisted pilot users, bind each request to an internal User using HMAC/encrypted LINE identity, and require explicit consent before any user content reaches AI. Private chat is the only supported conversation source.

**Blocked by:** 01: Establish the testable LINE workflow seam.

**Status:** ready-for-agent

- [ ] A pilot User can be resolved by a unique HMAC of the normalized LINE user ID.
- [ ] The reversible LINE user ID is stored with authenticated encryption and a key version when push messaging requires it.
- [ ] Email is optional and the legacy `OWNER/PARTNER` relationship is not used as a ledger-authorization boundary.
- [ ] An allowlisted user can review and accept a versioned consent notice through LINE.
- [ ] No text or image content is sent to AI before allowlist and consent checks pass.
- [ ] Unknown users receive a deterministic unauthorized response without AI processing.
- [ ] Group and room events are rejected without AI processing.
- [ ] Unfollow deactivates the User and stops notifications without deleting the ledger identity.
- [ ] Two-user tests prove that identity resolution never swaps users under concurrent requests.
- [ ] Logs emitted by this workflow contain no raw LINE user ID or display name.

