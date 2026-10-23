# Group G11 task guide

## Ownership and integration

| Member | GitHub username | Primary task | Review responsibility |
|---|---|---|---|
| Christian | `cxnisme` | Product owner and final integrator; coordinates contracts, integrates accepted PRs, deploys the API, builds the APK, and owns the release | Cross-component contract, release readiness, and evidence traceability |
| Angelique | `IHIMBAZWEAngelique` | AI/data: approved member-data schema, deterministic retrieval, confidence/no-match behavior, evaluation queries and metrics | API behavior and no-match safety |
| Theogene | `rudasingwatheogiene1` | API: FastAPI endpoints, request/response validation, errors, and deployment-ready service configuration | Mobile API contract and error handling |
| Alain | `alain143` | Mobile UI: Expo screens, navigation, accessible member directory/profile and online result presentation | Usability, accessibility, and visual evidence |
| Martin | `ladumartinbullen-cmyk` | Offline/quality: cached directory and last result, local lookup, connectivity states, and offline/device test matrix | Offline recovery and evaluation evidence |

Task owners and reviewers can be reassigned by Christian if a member is unable
to participate. Reassign work explicitly in the related issue or pull request;
do not attribute a contribution to someone who did not make it.

Christian owns final integration, deployment, EAS APK build, release tag, and
publication. Other members should deliver tested, reviewable components and
deployment instructions; they should not publish a final APK or release without
the integrator's approval.

## Task 1 — AI and evidence-grounded matching

**Owner:** Angelique · **Area:** `ai-api/` · **Issue:** [#2](https://github.com/cxnisme/agrisoko-pocket-g11/issues/2) (assigned)

Implement a deterministic Python profile finder using approved records only.
Define and validate the profile schema, normalize searchable text, build
word/character TF-IDF features, rank with cosine similarity, and return a clear
no-match for unrelated, ambiguous, or below-threshold queries. Add the required
index/fingerprint command, recorded evaluation queries, threshold rationale,
and tests.

**Acceptance:** exact name, alias, role/feature, no-match, missing-question and
empty-data cases are tested; report top-1 accuracy, no-match rejection, and
confusions from the actual query set. Keep the required starting threshold of
0.45 until recorded evidence justifies a change. Never synthesize member
biographies, metrics, feedback, or links.

**Review:** Theogene reviews the API-facing result contract; Christian reviews
that evidence is grounded and the contract can be integrated.

## Task 2 — API service and contract

**Owner:** Theogene · **Area:** `ai-api/` · **Issue:** [#3](https://github.com/cxnisme/agrisoko-pocket-g11/issues/3) (assigned)

Implement the FastAPI surface defined in the task brief: `GET /health`,
`GET /members`, `GET /members/{id}`, `POST /ask`, and `GET /model-info`.
Use typed request/response validation, explicit 404/422/503 behavior, useful
service status, and tests. Document the local run command and a secure,
HTTPS-ready deployment configuration; do not deploy or publish a service
without Christian's coordination.

**Acceptance:** schema tests cover every endpoint, invalid input, unknown
member, empty dataset, and unavailable/degraded service. The API must not expose
unapproved fields or log raw questions unnecessarily.

**Review:** Angelique reviews matcher integration; Martin reviews failure and
recovery behavior.

## Task 3 — Mobile user interface

**Owner:** Alain · **Area:** `mobile/` · **Issue:** [#1](https://github.com/cxnisme/agrisoko-pocket-g11/issues/1) (assigned)

Build the Expo/TypeScript app screens and typed navigation for Home, Ask, Team,
Member Profile, and About. Present online AI results with confidence, reason,
approved introduction, and evidence links. Validate questions before sending
them. Provide readable layouts, accessible labels, contrast, and large-text
support.

**Acceptance:** typecheck and UI tests pass; no-match, loading, error, and
directory selection states are visible; links are opened safely. Do not hard
code an API credential or machine-specific URL.

**Review:** Martin reviews offline/source labels; Christian reviews the
cross-platform API wiring before integration.

## Task 4 — Offline behavior and quality evidence

**Owner:** Martin · **Area:** `mobile/`, `evidence/` · **Issue:** [#4](https://github.com/cxnisme/agrisoko-pocket-g11/issues/4) (assigned)

Issue #4 is assigned to Martin. No implementation PR or device-test evidence
has been recorded for this task yet.

Implement or verify connectivity-aware behavior, caching of the approved
directory and last successful result, local exact-name/alias/role lookup,
timeout/retry/server-unavailable states, and restoration after app restart.
Prepare an honest device-test matrix for online/offline/recovery and accessibility
checks; record only observations actually made.

**Acceptance:** automated tests cover cache and local matching; the manual
matrix records device/Android version and actual outcomes. An outage must not
erase the last useful result or crash the app. Clearly label live, cached, and
local results.

**Review:** Alain reviews interaction states; Angelique reviews query/evaluation
coverage. Coordinate overlapping `mobile/` files with Alain before editing.

## Personal contribution and evidence

Each member must own at least one technical change, run the relevant tests,
explain a code decision, and contribute a review. Before a profile record is
used in a public release, its owner must review and sign off on the exact claims.
Collect tester feedback only with consent. Store issue, branch, PR, merged commit,
and demo timestamp links after those artifacts exist.

## Current integration status

Christian has integrated the mobile app, persistent offline cache, local lookup,
FastAPI endpoints, and deterministic TF-IDF/cosine matching in the working
release tree. Local automated checks are recorded in `evidence/TEST_LOG.pdf`.
This integration does not replace member review of PR #5 or profile sign-off.
The API is not yet deployed, issue #4 remains open and assigned to Martin, and
no physical-device demo or tester feedback has been recorded.

### Verified member task status

| Member | Status | Evidence and remaining distinction |
|---|---|---|
| Alain (`alain143`) | **Implementation complete; integrated** | Mobile implementation is present in the release integration (`4cdc9d9`). PR [#5](https://github.com/cxnisme/agrisoko-pocket-g11/pull/5) is still open and has not been reviewed or merged. |
| Theogene (`rudasingwatheogene1`) | **Implementation integrated; PR merged** | PR [#6](https://github.com/cxnisme/agrisoko-pocket-g11/pull/6) was merged into `main`. Issue #3 remains open for checking the complete acceptance criteria and deployment readiness. |
| Angelique (`IHIMBAZWEAngelique`) | **Pending** | The matcher is present, but no Angelique-authored implementation PR, evaluation evidence, or member confirmation is recorded. Do not attribute Theogene's merged PR to Angelique. |
| Martin (`ladumartinbullen-cmyk`) | **Pending** | No member-authored implementation PR or device-test evidence is recorded. Offline behavior in the release integration is not attributed to Martin. |

These implementation statuses do not claim member sign-off, profile approval,
or physical-device validation. PR #5 remains unreviewed; do not describe it as
formally approved or merged.

## Branch and pull request workflow

```powershell
git switch main
git pull --ff-only origin main
git switch -c feature/<short-task-name>
# implement the agreed task and run its focused tests
git status --short
git add <only-your-task-files>
git commit -m "feat: <describe the task>"
git push -u origin feature/<short-task-name>
```

Open a pull request with base `main`, describe the task, list checks actually
run, link the issue, and request the listed reviewer. Do not force-push shared
branches or merge your own PR without the team's agreed review.

### Current task status

- [ ] Task 1 — Angelique: implementation/acceptance evidence pending.
- [x] Task 2 — Theogene: API implementation integrated from merged PR #6; issue #3 remains open for acceptance checks.
- [x] Task 3 — Alain: implementation integrated; PR #5 review/merge remains pending.
- [ ] Task 4 — Martin: member implementation and device-test evidence pending.
- [ ] Each member has reviewed and signed off on their own profile record.
- [ ] Christian has completed deployment, APK build, and release verification.

If a task owner does not participate, Christian will reassign the remaining work
to participating members and update the issue/PR assignment before integration.
