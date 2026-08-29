# Personal Finance Backend Agent Guide

## Start with the delivery contract

- Read the selected file in `documents/tickets/` and every linked spec before changing code. Treat its acceptance checklist and Definition of Done as the delivery contract.
- Confirm every `Blocked by` dependency is complete. Work on one ticket per branch and pull request.
- Keep the repository ticket and the matching Notion User Story aligned: `In Progress` when work starts, `Review` when the pull request is ready, and `Done` only after merge.
- In the pull request, map each acceptance item to observable behavior and test evidence. Stop at review; merge only after the owner approves.

## Route work through project skills

Local skills under `.agents/skills/` are optional because that directory is gitignored. When a referenced skill exists, read its `SKILL.md` before taking actions in that branch. When it is absent, apply the fallback named below and continue; never block delivery on a local skill package.

- **NestJS implementation or refactor:** read `.agents/skills/nestjs-best-practices/SKILL.md`. Apply feature-module ownership, constructor injection, direct class providers by default, explicit cross-module exports, explicitly handled async workflows, and Nest TestingModule/Supertest patterns. Introduce a custom provider token only when runtime selection, multiple implementations, or a token distinct from the implementation class is required. Await controller work unless the endpoint intentionally acknowledges before a background task whose errors are handled internally.
- **Bug investigation:** read `.agents/skills/engineering/debug-mantra/SKILL.md`. Fallback: reproduce → trace the fail path → try to disprove ranked hypotheses → reconcile every experiment before proposing a fix.
- **Review-ready change:** read `.agents/skills/engineering/scrutinize/SKILL.md` for an outsider pass before opening the pull request. Fallback: restate intent, seek a smaller solution, trace every claimed behavior end to end, then report evidence-backed findings.
- **Identity, webhook, secret, authorization, financial-data, logging, or dependency-security work:** read `.agents/skills/security-testing/SKILL.md` and only the references relevant to the ticket. Keep attack traffic and scans inside explicitly authorized targets.
- **Prisma provider, connection, client-generation, or database-environment work:** read `.agents/skills/prisma-database-setup/SKILL.md` with its MySQL/MariaDB and client-setup references. Ordinary schema changes still follow the migration rules below.
- **Explicit latency, throughput, load, resource, or scalability requirement:** read `.agents/skills/performance-testing/SKILL.md`. Define thresholds and realistic data before choosing a tool; report percentiles and environment with results.
- **Validated non-trivial bug fix or requested RCA:** read `.agents/skills/engineering/post-mortem/SKILL.md` only after a reliable reproduction, known root cause, identified fix, and validation all exist.

Do not make `qwen-agent`, `qwenchance`, or `management-talk` part of the repository workflow; they depend on a particular runtime, delegation policy, or communication request. The generic `javascript-typescript-jest` skill is advisory only: this repository's `*.spec.ts`, public-seam, and mocking rules below take precedence where it differs.

## Project structure

```text
src/
├── app.module.ts              # Composition root for application modules
├── main.ts                    # Runtime bootstrap and HTTP middleware
├── configs/                   # Typed framework and infrastructure configuration
├── messaging/                 # LINE webhook transport and message orchestration
│   ├── messaging.module.ts
│   ├── messaging.controller.ts
│   ├── guards/                # Request admission and signature validation
│   ├── services/              # Workflow and LINE provider implementations
│   ├── interfaces/            # Messaging contracts and event/data shapes
│   └── enums/                 # Messaging-owned constants
├── ai/                        # Gemini text generation and OCR capability
│   ├── ai.module.ts
│   ├── services/              # AI workflows and provider implementations
│   ├── pipes/                 # Input validation and sanitization
│   ├── schemas/               # Provider response schemas
│   ├── interfaces/            # AI contracts and configuration shapes
│   ├── constants/             # Prompts, rules, and provider settings
│   ├── enums/
│   ├── utils/
│   └── logger/                # Privacy-safe security events
└── prisma/                    # Injectable Prisma module and client lifecycle
prisma/
├── schema.prisma              # Persistence model
└── migrations/                # Ordered, immutable schema migrations
test/                          # Public HTTP and cross-module application tests
documents/
├── specs/                     # Product requirements by phase
└── tickets/                   # Delivery contracts and dependency graph
```

For a new capability, prefer `src/<feature>/` with one `<feature>.module.ts` composition point. Add a controller only for an HTTP interface; keep orchestration in `services/`, request admission in `guards/`, provider or persistence shapes in `interfaces/`, validation in `schemas/` or `pipes/`, and constants in `enums/` or `constants/`. Co-locate focused tests as `*.spec.ts`; reserve `test/` for behavior that crosses the public application seam.

## Preserve the module shape

- Organize NestJS code by feature module under `src/`. Keep controllers focused on HTTP concerns and delegate workflow decisions to an injected service.
- Keep orchestration in feature services. Put LINE, Gemini, and other external SDK operations behind focused, role-named providers so tests can replace them without changing orchestration.
- Inject dependencies through constructors with `private readonly`. Use the provider class as the Nest token when one concrete runtime implementation owns the role; tests should replace that class token with a focused fake. Keep its public surface small enough to hide provider setup, SDK types, retries, and response conversion.
- Keep guards responsible for request admission, including signature validation. Business behavior belongs behind the admitted public interface.
- Reuse project enums, interfaces, schemas, and constants from their feature folders instead of duplicating literals across modules.

## Match the TypeScript style

- Use kebab-case file names, PascalCase classes and types, camelCase variables and methods, and UPPER_SNAKE_CASE enum or constant members.
- Follow `.prettierrc` and `eslint.config.mjs`; let the configured tools decide whitespace, import formatting, single quotes, and trailing commas.
- Use explicit return types on public and asynchronous methods when they make the interface clearer. Represent absence with the existing nullable or optional types rather than sentinel values.
- Prefer `async`/`await` in application code and test adapters over manual `Promise` construction. Catch errors where the module can add context, recover, or produce the user-visible fallback; otherwise allow the caller to handle them.
- Comments should explain module responsibility, security reasoning, or a non-obvious constraint. Keep routine mechanics clear through names and structure.

## Test through public seams

- Develop behavior test-first in vertical slices: one failing behavior test, the smallest passing implementation, then the next behavior.
- Put unit and feature tests beside source as `*.spec.ts`; put HTTP application tests in `test/` and run them through the public Nest application interface.
- Fake only system providers such as LINE, Gemini, time, and persistence. Exercise owned modules together and assert returned HTTP behavior, outbound messages, and orchestration results rather than private methods or internal call order.
- Preserve signed webhook coverage for accepted and rejected requests. Provider fakes must prevent network calls and expose deterministic observations.
- Replace placeholder expectations with observable application behavior. Keep persistence replaceable so application tests can use a disposable database.

## Protect financial and identity data

- Log event type, outcome, safe identifiers, and operational error context only. Keep message text, LINE user IDs, images, OCR/Gemini payloads, financial amounts, and credentials out of logs and test snapshots.
- Preserve owner isolation across every query and workflow. A test fixture may use synthetic identities only and must make cross-owner access visibly fail.
- Read secrets through `ConfigService`. Keep `.env` files and real provider credentials outside commits and tests.
- Validate LINE signatures from the preserved raw request body before processing webhook events.

## Change persistence safely

- Update `prisma/schema.prisma` and add a generated migration together for schema changes. Preserve existing table and column mappings unless the ticket explicitly migrates them.
- Use the Prisma scripts in `package.json` for generation and migration checks. Tests that persist state should use an isolated disposable database.

## Verify before review

- Run the focused test during each red-green cycle.
- Before opening or updating a pull request, run `npm test`, `npm run test:e2e`, `npm run lint`, and `npm run build`.
- Inspect the final diff for unrelated edits, generated artifacts, secrets, PII, and unchecked acceptance items. The work is review-ready when every applicable check passes and the pull request contains the evidence.
