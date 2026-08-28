# 15: Add privacy-safe health metrics and alerts

**What to build:** Give administrators enough operational visibility to run the pilot without exposing financial payloads, through health checks, structured sanitized logs, metrics and alerts.

**Blocked by:** 04: Process Inbox jobs with retry and delayed user feedback; 08: Create private Evidence-backed Drafts from images.

**Status:** ready-for-agent

- [ ] A health operation reports application and database readiness without exposing secrets.
- [ ] Metrics cover webhook success, Inbox backlog, stuck Jobs, retry exhaustion, AI latency/errors, outbound LINE failures, duplicate prevention, disk usage and cleanup recency.
- [ ] Structured logs use request, Job, event and pseudonymous user references.
- [ ] Captured logs contain no raw text, amount, category, sender/receiver, raw LINE ID, OCR payload, image path/URL, ciphertext or secret.
- [ ] Error handling prevents payload-bearing stack traces from reaching operational logs.
- [ ] Alerts contain only operational codes, counts and references.
- [ ] Administrators have no product endpoint for browsing Drafts, Transactions or Evidence.
- [ ] Security-relevant administrative actions are retained in the security audit stream.
- [ ] Log rotation and compression respect the configured retention and available storage.
- [ ] Tests inspect actual emitted logs for representative text, image and failure flows.

