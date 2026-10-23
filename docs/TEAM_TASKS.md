# Group G11 task guide

## Ownership and integration

| Member | GitHub username | Primary task | Review responsibility |
|---|---|---|---|
| Christian | `cxnisme` | Group leader and final integrator; coordinates contracts, integrates accepted PRs, deploys the API, builds the APK, and coordinates the release | Cross-component contract, release readiness, and evidence traceability |
| Angelique | `IHIMBAZWEAngelique` | AI/data: approved member-data schema, deterministic retrieval, confidence/no-match behavior, evaluation queries and metrics | API behavior and no-match safety |
| Theogene | `rudasingwatheogiene1` | API: FastAPI endpoints, request/response validation, errors, and deployment-ready service configuration | Mobile API contract and error handling |
| Alain | `alain143` | Mobile UI: Expo screens, navigation, accessible member directory/profile and online result presentation | Usability, accessibility, and visual evidence |
| Martin | `ladumartinbullen-cmyk` | Offline/quality: cached directory and last result, local lookup, connectivity states, and offline/device test matrix | Offline recovery and evaluation evidence |

As group leader, Christian completed the final integration of the mobile,
matching, API, and offline features in the release tree. No feature
implementation is waiting for reassignment. The contribution record follows
the available authorship evidence and distinguishes integrated work from
member-authored work.

Christian leads final integration, deployment, EAS APK build, release tag, and
publication. Our team coordinates component reviews and deployment handoff
with the integrator.

## Task 1 — AI and evidence-grounded matching

**Owner:** Angelique · **Area:** `ai-api/` · **Issue:** [#2](https://github.com/cxnisme/agrisoko-pocket-g11/issues/2) (assigned)

Our Task 1 deliverable is a deterministic Python profile finder using
member-approved records. It defines and validates the profile schema,
normalizes searchable text, builds word/character TF-IDF features, ranks with
cosine similarity, and returns a clear no-match for unrelated, ambiguous, or
below-threshold queries. The task also covers the index/fingerprint command,
recorded evaluation queries, threshold rationale, and tests.

**Acceptance:** tests cover exact name, alias, role/feature, no-match,
missing-question, and empty-data cases. The evaluation reports top-1 accuracy,
no-match rejection, and confusions from the recorded query set. The required
starting threshold is 0.45; any change is supported by recorded evidence.
Member biographies, metrics, feedback, and links are grounded in source
evidence.

**Review:** Theogene reviews the API-facing result contract; Christian, as
group leader, reviews that evidence is grounded and the contract can be
integrated.

## Task 2 — API service and contract

**Owner:** Theogene · **Area:** `ai-api/` · **Issue:** [#3](https://github.com/cxnisme/agrisoko-pocket-g11/issues/3) (assigned)

Our Task 2 API surface follows the project brief: `GET /health`,
`GET /members`, `GET /members/{id}`, `POST /ask`, and `GET /model-info`.
It uses typed request/response validation, explicit 404/422/503 behavior,
service status, and tests. The local run command and an HTTPS-ready deployment
configuration are documented; service deployment is coordinated with the
group leader.

**Acceptance:** schema tests cover each endpoint, invalid input, unknown
member, empty dataset, and unavailable/degraded service. Public responses
contain approved fields, and request logging is limited to operational needs.

**Review:** Angelique reviews matcher integration; Martin reviews failure and
recovery behavior.

## Task 3 — Mobile user interface

**Owner:** Alain · **Area:** `mobile/` · **Issue:** [#1](https://github.com/cxnisme/agrisoko-pocket-g11/issues/1) (assigned)

Our Task 3 mobile app includes Expo/TypeScript screens and typed navigation for
Home, Ask, Team, Member Profile, and About. Online results present confidence,
reason, approved introduction, and evidence links. Questions are validated
before submission, with readable layouts, accessible labels, contrast, and
large-text support.

**Acceptance:** typecheck and UI tests pass; no-match, loading, error, and
directory selection states are visible; links open safely. API credentials and
developer-specific URLs are kept out of source.

**Review:** Martin reviews offline/source labels; Christian, as group leader,
reviews the cross-platform API wiring before integration.

## Task 4 — Offline behavior and quality evidence

**Owner:** Martin · **Area:** `mobile/`, `evidence/` · **Issue:** [#4](https://github.com/cxnisme/agrisoko-pocket-g11/issues/4) (assigned)

Issue #4 is assigned to Martin. At the time of this record, no implementation
PR or device-test evidence was available for this task.

Our Task 4 scope covers connectivity-aware behavior, caching of the approved
directory and last successful result, local exact-name/alias/role lookup,
timeout/retry/server-unavailable states, and restoration after app restart.
The device-test matrix captures online/offline/recovery and accessibility
checks as observed.

**Acceptance:** automated tests cover cache and local matching; the manual
matrix records device/Android version and outcomes. During an outage, the app
preserves useful results and remains available. Live, cached, and local results
are clearly labeled.

**Review:** Alain reviews interaction states; Angelique reviews query/evaluation
coverage. Changes to shared `mobile/` files are coordinated with Alain.

## Personal contribution and evidence

Our contribution process records each member's technical changes, relevant
tests, design explanations, and reviews. Members review the claims in their
profile records before public use. We collect tester feedback with consent and
include issue, branch, PR, commit, and demo references when available.

## Current integration status

As group leader and final integrator, Christian integrated the mobile app,
persistent offline cache, local lookup, FastAPI endpoints, and deterministic
TF-IDF/cosine matching in the release tree. All four feature areas are
implemented in that integration; member-authored attribution and PR status are
tracked separately. Local automated checks are recorded in
`evidence/TEST_LOG.pdf`.

The following delivery and evidence gaps are separate from feature
implementation: the matcher evaluation artifact is not present; the API is
not deployed; the production APK uses the Android emulator API fallback
`http://10.0.2.2:8000` because a hosted `EXPO_PUBLIC_API_URL` was not embedded;
no physical-device test, demo recording, external feedback, or member profile
sign-off is available. The `v1.0.0` Git tag currently points to commit
`606779e`, which is the source revision used by the successful EAS APK build.
The [GitHub v1.0.0 release](https://github.com/cxnisme/agrisoko-pocket-g11/releases/tag/v1.0.0)
is published with the verified APK and an explicit note about the emulator-only
API fallback. GitHub issues and PRs retain their actual remote statuses and
are not treated as proof that the integrated features are missing.

### Verified member task status

| Member | Status | Evidence and remaining distinction |
|---|---|---|
| Alain (`alain143`) | **Mobile implementation integrated by the group leader; PR review findings documented** | Mobile screens/navigation were incorporated in release integration `4cdc9d9`. PR [#5](https://github.com/cxnisme/agrisoko-pocket-g11/pull/5) remains open and unmerged; our review record identifies placeholder/mock-data and stale-result issues in its submitted branch. |
| Theogene (`rudasingwatheogene1`) | **API integrated by the group leader; earlier PR contribution recorded separately** | PR [#6](https://github.com/cxnisme/agrisoko-pocket-g11/pull/6) was merged without submitted reviews or check runs. Its sample profile data and pickle-based model path were removed; the current API was reimplemented during release integration. The API is implemented locally, but deployment and formal issue acceptance are not verified. |
| Angelique (`IHIMBAZWEAngelique`) | **Matcher integrated by the group leader; member evidence not recorded** | The matcher is present in the release integration. No Angelique-authored implementation PR, evaluation artifact, or member confirmation is recorded. Theogene's merged API PR is recorded separately from matcher implementation. |
| Martin (`ladumartinbullen-cmyk`) | **Offline behavior integrated by the group leader; device evidence not recorded** | The offline cache and local lookup are present in the release integration. No Martin-authored implementation PR or physical-device test evidence is recorded. |

These implementation statuses distinguish repository evidence from member
sign-off, profile approval, and physical-device validation. The review notes
below are code-review findings; they are not reviews submitted through GitHub.

### Pull request review record

Reviewed the complete diffs for PRs #5 and #6 on 23 October 2026. Neither PR
has a submitted GitHub review or reported CI/check results.

| PR | Review outcome | Findings and current-main disposition |
|---|---|---|
| [#5 — Alain, mobile UI](https://github.com/cxnisme/agrisoko-pocket-g11/pull/5) | **Review finding: changes are needed before merging the submitted branch.** | The PR defaults to mock mode and returns placeholder profiles, includes `GXX`/placeholder repository configuration, and keeps a module-global previous result that can be shown after a different query fails. The release integration replaced the mock data and corrected the group/repository values; the result cache is now query-scoped. PR #5 remains open and unmerged; the fixes in `main` are separate from a formal PR approval. |
| [#6 — Theogene, API](https://github.com/cxnisme/agrisoko-pocket-g11/pull/6) | **Merged by author; post-merge review found release blockers in the submitted diff.** | The diff included unverified sample profile claims and auto-generated sample data, loaded a pickle model at API startup, omitted the required `/members` endpoints, and added a CORS test without corresponding CORS middleware in that diff. The pickle and sample-data implementation were removed and the API was replaced in release integration. PR #6 remains merged in GitHub history, but this is not a reviewer approval of its original implementation. |

The final integration has separate local validation records; those results do
not retroactively validate the PR heads. This review did not change either PR's
GitHub status.

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

Our pull requests use `main` as the base, describe the task, list checks that
were run, link the issue, and request the listed reviewer. We coordinate shared
branches and merges through the team's review process.

### Final integration status

- [x] Task 1 — Deterministic member matcher integrated by the group leader.
- [x] Task 2 — FastAPI endpoints and validation integrated by the group leader.
- [x] Task 3 — Mobile screens and navigation integrated by the group leader.
- [x] Task 4 — Offline cache and local lookup integrated by the group leader.
- [ ] Matcher evaluation artifact and metrics recorded.
- [ ] API deployed and reachable from the production app.
- [x] EAS APK build completed, APK downloaded, and archive structure verified.
- [ ] Hosted API URL configured in EAS production environment and a replacement APK built.
- [ ] Physical-device test and demo recording completed.
- [ ] Member profile sign-off and external tester feedback collected.
- [ ] GitHub issues and PRs updated to reflect final integration.
- [x] `v1.0.0` tag aligned with the source revision used for the EAS APK.
- [x] GitHub release published with the APK and API fallback limitation noted.

These unchecked items are real delivery, evidence, or remote-tracking gaps;
they do not mean that the feature implementation is waiting to be reassigned.
