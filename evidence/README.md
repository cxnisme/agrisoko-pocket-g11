# Project evidence

This folder contains the evidence available for the current project build.
Automated checks below reflect recorded local results. The production APK has
been downloaded and structurally verified; physical-device validation,
external user feedback, and a demo recording remain separate evidence items.

| Deliverable | Status |
| --- | --- |
| `../build/AgriSokoPocket_G11.apk` | Available in the package and published in GitHub release [v1.0.0](https://github.com/cxnisme/agrisoko-pocket-g11/releases/tag/v1.0.0); EAS build, archive structure, and SHA-256 recorded in `../build/README.md` |
| `AI_USE.md` | Available; describes project authorship, development assistance, and runtime behavior |
| `CONTRIBUTIONS.pdf` | Available; records repository evidence and pull-request review findings |
| `TEST_LOG.pdf` | Available; records automated local checks; no physical-device test is included |
| `FEEDBACK.pdf` | Available; states that no external user feedback was collected |
| `COMBO_A3_G11_DEMO.mp4` | Not available in this package |

The production APK contains the Android emulator API fallback because no
hosted `EXPO_PUBLIC_API_URL` was embedded; a physical-device build needs a
hosted API URL and a replacement APK. Our evidence record does not include
unperformed tests, uncollected feedback, or an unrecorded demo.
