# 40: Decide whether Financial Guidance is safe to pursue

**What to build:** Produce a documented legal, safety and product go-or-no-go decision on whether the application should ever provide investment or allocation guidance; this ticket does not implement advice.

**Blocked by:** 35: Analyze pilot usage and select Phase 2 workstreams.

**Status:** ready-for-agent

- [ ] The decision documents the user problem that guidance would solve and evidence that users actually need it.
- [ ] Applicable legal/regulatory questions are identified for qualified review.
- [ ] Safety boundaries, suitability limitations and prohibited claims are defined.
- [ ] Required source quality, freshness, attribution and uncertainty behavior are specified.
- [ ] Guidance is separated from ledger commands and cannot mutate Transactions implicitly.
- [ ] Data-sharing, profiling, consent, retention and provider risks are assessed.
- [ ] A no-go result keeps deterministic Phase 1 unsupported responses unchanged.
- [ ] A go result requires a new approved spec and ticket breakdown before any implementation.

