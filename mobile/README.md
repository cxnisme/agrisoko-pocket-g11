# Mobile app work area

This folder is an implementation placeholder for the Expo/React Native
TypeScript Android application.

## Task owners

- UI, navigation, accessibility, and profile presentation: Alain (Task 3).
- Offline cache, local matching, connectivity and recovery: Martin (Task 4).
- API contract integration and final app wiring: Christian.

Coordinate before changing files used by both mobile tasks. See
[`../docs/TEAM_TASKS.md`](../docs/TEAM_TASKS.md) for acceptance criteria.

## Required behavior

Build Home, Ask, Team/Directory, Member Profile, and About views. Validate
questions locally, present confidence and evidence for online matches, and
provide usable offline directory lookup. Label live, cached, and local results;
show loading, timeout, retry, no-match, and server-unavailable states without
losing the last useful result.

Add the Expo manifest, lockfile, typed navigation, tests, and setup commands
with the implementation. Read the API base URL from safe configuration; never
commit credentials or a developer-specific address. The final standalone APK
is built and released by Christian after integration and physical-device
verification.
