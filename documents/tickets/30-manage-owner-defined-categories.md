# 30: Manage owner-defined categories

**What to build:** Let each user create, rename and archive private categories while retaining stable historical reporting and restricting AI to the user's active taxonomy.

**Blocked by:** 26: Pass the Phase 1.1 reimbursement gate.

**Status:** ready-for-agent

- [ ] A user can create a category visible only in their ledger.
- [ ] Category display names follow defined validation and duplicate rules.
- [ ] A category has a stable identity independent of its display name.
- [ ] Renaming changes future display without rewriting historical Transaction references.
- [ ] Archiving removes a category from new selection while preserving historical reports.
- [ ] AI can select only fixed categories plus the owner's active custom categories.
- [ ] Another user's custom categories are never exposed in AI context or UI.
- [ ] Reports can group custom/archived categories under a stable high-level reporting group where configured.
- [ ] Category create/rename/archive actions are revisioned without PII in operational logs.
- [ ] Disabling this feature leaves the fixed Phase 1.0 taxonomy usable.

