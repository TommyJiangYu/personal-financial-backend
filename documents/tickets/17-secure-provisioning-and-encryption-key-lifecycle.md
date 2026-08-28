# 17: Secure provisioning and encryption-key lifecycle

**What to build:** Provide a repeatable least-privilege method to provision the two pilot users from a local machine and establish recoverable, versioned encryption/HMAC key handling for production.

**Blocked by:** 02: Protect pilot access with encrypted LINE identity and consent.

**Status:** ready-for-agent

- [ ] Provisioning computes normalized HMAC lookup and authenticated ciphertext rather than requiring manual encrypted-field construction.
- [ ] Provisioning uses a dedicated database credential distinct from application and migration credentials.
- [ ] The credential can be limited to required onboarding operations and the developer's current source IP.
- [ ] Remote database TLS is verified explicitly before production use.
- [ ] Provisioning is safe to retry and cannot create duplicate LINE identities.
- [ ] Application encryption and lookup keys are separate and versioned.
- [ ] Key material is never printed in logs or committed to the repository.
- [ ] Encrypted offline key backups can be stored in at least two controlled locations.
- [ ] The application can read existing ciphertext through the recorded key version during rotation.
- [ ] A rotation procedure demonstrates adding a new version and migrating/re-encrypting safely.

