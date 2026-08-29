# 01: Establish the testable LINE workflow seam

**What to build:** Refactor the existing LINE webhook workflow behind replaceable LINE and Gemini adapters and establish one high-level integration seam that can drive a signed LINE event through orchestration and observe the outbound response. Preserve the currently supported text and image behavior while making later tracer bullets independently testable.

**Blocked by:** None (can start immediately).

**Status:** review

- [x] A signed text webhook can be exercised through the public webhook boundary with fake provider adapters.
- [x] A signed image webhook can be exercised without calling the real LINE or Gemini services.
- [x] Tests can observe outbound LINE messages and orchestration results without asserting private methods.
- [x] Invalid LINE signatures remain rejected.
- [x] Existing text, image, follow, unfollow and postback routing continues to work.
- [x] The obsolete starter end-to-end expectation is replaced by behavior that exists in the application.
- [x] The test setup can use a disposable database when later tickets introduce persisted state.
