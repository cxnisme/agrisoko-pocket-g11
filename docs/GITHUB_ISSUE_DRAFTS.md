# GitHub issue drafts

The project tasks are tracked in GitHub. Task 3 is
[issue #1](https://github.com/cxnisme/agrisoko-pocket-g11/issues/1), opened by
Alain and assigned to him. The AI task is
[issue #2](https://github.com/cxnisme/agrisoko-pocket-g11/issues/2), assigned
to Angelique; the API task is
[issue #3](https://github.com/cxnisme/agrisoko-pocket-g11/issues/3), assigned
to Theogene; and the offline/quality task is
[issue #4](https://github.com/cxnisme/agrisoko-pocket-g11/issues/4), assigned
to Martin.

The descriptions below summarize the task scopes. [`TEAM_TASKS.md`](TEAM_TASKS.md)
records ownership, reviews, and integration status.

## Task 1 — Build the approved-profile AI matcher and evaluation

**Issue:** [#2](https://github.com/cxnisme/agrisoko-pocket-g11/issues/2) · **Assignee:** `IHIMBAZWEAngelique`

**Body:**

Implement the deterministic evidence-grounded profile matcher in `ai-api/`.
Coordinate the approved member-data schema, build the TF-IDF/cosine index and
the required fingerprint/model metadata command, define and test safe
no-match behavior, and add the recorded query evaluation.

Acceptance:
- Tests cover exact name, alias, role/feature, no-match, missing input, and an
  empty dataset.
- Evaluation reports top-1 accuracy, no-match rejection, and a confusion/error
  table from recorded queries.
- Begin with threshold 0.45. Change it only when recorded queries and a
  documented threshold comparison justify the change.
- Profile data, metrics, feedback, biographies, and repository evidence are
  grounded in member review and verifiable project sources.
- Add focused test output and the evaluation artifact to the PR.

**Review:** Theogene; Christian checks integration/evidence readiness.

## Task 2 — Implement the FastAPI endpoints and validation

**Issue:** [#3](https://github.com/cxnisme/agrisoko-pocket-g11/issues/3) · **Assignee:** `rudasingwatheogiene1`

**Body:**

Implement the task brief's FastAPI endpoints under `ai-api/`: `/health`,
`/members`, `/members/{id}`, `/ask`, and `/model-info`. Agree on the `/ask`
response shape with Task 1 before wiring the matcher.

Acceptance:
- Typed request/response validation and tests for normal and invalid requests.
- Clear 404, 422, and empty/degraded dataset behavior.
- No private/unapproved profile fields in public responses and no unnecessary
  raw-question logging.
- Local run/test instructions and deployment-ready configuration are
  documented. Deployment is coordinated with Christian.

**Review:** Angelique and Martin.

## Task 3 — Build accessible member-finder screens (tracked by issue #1)

**Issue:** [#1](https://github.com/cxnisme/agrisoko-pocket-g11/issues/1) · **Assignee:** `alain143`

Issue #1 covers the mobile screens, typed navigation, validation, error/retry
states, accessibility, and evidence links. Its acceptance criteria correspond
to Task 3 in [`TEAM_TASKS.md`](TEAM_TASKS.md).

**Existing issue body:**

Implement the Expo/TypeScript navigation and UI under `mobile/` for Home, Ask,
Team/Directory, Member Profile, and About. Coordinate the API contract before
integrating online results.

Acceptance:
- Typed navigation and reusable, accessible components.
- Validated query input; loading, result, no-match, and recoverable error states.
- Member profile shows approved contribution/evidence links only.
- Typecheck and focused UI tests pass; large text and contrast are checked and
  recorded.
- No hard-coded secrets or developer-specific API addresses.

**Review:** Martin; Christian reviews the integration seam.

## Task 4 — Implement and verify offline behavior

**Issue:** [#4](https://github.com/cxnisme/agrisoko-pocket-g11/issues/4) · **Assignee:** `ladumartinbullen-cmyk`

**Body:**

Implement or verify the offline directory/result cache, local exact-name/alias/
role lookup, NetInfo/connectivity handling, timeout/retry/server-unavailable
states, and restoration after an app restart.

Acceptance:
- Automated tests cover local matches, no-match behavior, cache restore, and
  connectivity transitions.
- Live, cached, bundled, and local-match sources are distinguishable in the UI.
- Last useful content survives a temporary API outage and an app restart.
- The test matrix records physical-device outcomes from completed checks.
- Changes to shared `mobile/` files are coordinated with Alain.

**Review:** Alain and Angelique; Christian coordinates final device/build integration as group leader.
