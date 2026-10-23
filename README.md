# AgriSoko Pocket 11

**Group 11 · Evidence-grounded member finder for Android**

AgriSoko Pocket lets a user ask about a group member by name, nickname, role,
skill, or feature. The app should return a grounded match and explain its
confidence, while still supporting useful directory lookups offline.

| Project detail | Value |
| --- | --- |
| Group code | 11 |
| App identity | AgriSoko Pocket 11 |
| Repository | `cxnisme/agrisoko-pocket-g11` |
| Release APK name | `AgriSokoPocket_11.apk` |
| Final integrator and release owner | Christian (`cxnisme`) |

## Starting point

This repository is the team task starter: it contains the project brief, folder
placeholders, contribution guidance, and task drafts. Implementations and
member-specific profile data have not been added to this starter yet. The
existing project copy outside this repository is not the team submission
baseline.

Do not claim a feature, test result, model metric, user feedback, or member
contribution until it has been implemented or measured and its owner has
verified the evidence. Each member must review their own profile information
before it is included in the app. Do not commit registration numbers, private
contact information, credentials, or unapproved personal claims.

## Team responsibilities

The task breakdown, acceptance criteria, branch workflow, and review
responsibilities are in [`docs/TEAM_TASKS.md`](docs/TEAM_TASKS.md). Draft issue
titles and descriptions are in [`docs/GITHUB_ISSUE_DRAFTS.md`](docs/GITHUB_ISSUE_DRAFTS.md).

Christian retains responsibility for final integration decisions, deployment,
the standalone APK build, release tag, and release publication. Team task
ownership may be reassigned to members who participate; see the task guide.

## Project folders

- [`ai-api/`](ai-api/README.md): Python, FastAPI, and the deterministic profile
  matching service.
- [`mobile/`](mobile/README.md): Expo, React Native, and TypeScript Android app.
- [`docs/`](docs/TEAM_TASKS.md): architecture notes, task definitions, and
  GitHub issue drafts.
- [`evidence/`](evidence/README.md): verified test results, member sign-offs,
  and device-test records.

## Target behavior

- Search approved member profiles with a transparent TF-IDF/cosine matcher.
- Show the selected member, confidence, match reason, and approved evidence.
- Reject vague or unrelated questions instead of guessing.
- Provide a browsable member directory and useful exact-name, alias, and role
  lookup offline.
- Preserve cached directory/results and show whether a result is live, cached,
  or local.
- Deliver and test a standalone Android APK that does not require Expo Go.

The full API contract, privacy requirements, and evaluation requirements are
part of the project task document. Implementations must be tested against those
requirements before the team marks them complete.

## Collaboration

1. Pick one task from [`docs/TEAM_TASKS.md`](docs/TEAM_TASKS.md) and coordinate
   overlapping files before editing.
2. Create a feature branch from `main`, implement only the agreed task, and run
   its focused checks.
3. Open a pull request to `main`, describe the change and test evidence, and
   request a review from another member.
4. Merge only after review and passing checks. Do not push task work directly
   to `main`.
5. Record real issue, branch, PR, commit, test, and demo evidence. Never invent
   a metric, tester comment, contribution, or link.

Use the pull request template in [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md).

## Environment

- Python 3.12 or another version supported by the selected dependency releases.
- Node.js LTS and npm for Expo.
- Git.
- Android phone and Expo Go for development previews; the final release must
  also be tested as a standalone APK.

No application dependencies are installed in this starter yet. Each task owner
should add only the dependencies required by their implementation and document
them in the appropriate project manifest.
