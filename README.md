# AgriSoko Pocket G11

Group G11's Expo Android app and FastAPI member lookup service.

## Submission names

- Repository: `agrisoko-pocket-g11`
- ZIP: `COMBO_A3_G11.zip`
- Folder: `COMBO_A3_G11/`
- APK: `AgriSokoPocket_G11.apk`
- Report: `COMBO_A3_G11_REPORT.pdf`
- Demo: `COMBO_A3_G11_DEMO.mp4`
- Release tag: `v1.0.0`

## Project layout

```text
COMBO_A3_G11/
├── README.md
├── mobile/
├── ai-api/
│   ├── requirements.txt
│   ├── data/
│   │   └── members.json
│   └── tests/
├── build/
│   └── AgriSokoPocket_G11.apk
├── docs/
│   └── COMBO_A3_G11_REPORT.pdf
└── evidence/
    ├── COMBO_A3_G11_DEMO.mp4
    ├── CONTRIBUTIONS.pdf
    ├── TEST_LOG.pdf
    ├── FEEDBACK.pdf
    └── AI_USE.md
```

## Run the backend (Windows PowerShell)

```powershell
cd ai-api
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

API endpoints: `GET /health`, `GET /model-info`, `GET /members`,
`GET /members/{member_id}`, and `POST /ask`.

## Run the mobile app

```powershell
cd mobile
npm install
npx expo start
```

For Expo Go, use the development computer's LAN IP address for the API, not
`localhost`:

```powershell
$env:EXPO_PUBLIC_API_URL="http://192.168.1.20:8000"
npx expo start --android
```

Replace the example address with the computer's actual LAN IP.

## Build an APK with Expo EAS

`mobile/eas.json` is configured to generate an installable Android APK:

```powershell
cd mobile
npx eas-cli@latest build --platform android --profile production
```

The build needs access to the linked Expo account. Set
`EXPO_PUBLIC_API_URL` to a deployed HTTPS service URL before building when the
APK should use a hosted API. The app includes bundled task records for local
lookup when the API is unreachable.

## Data and evidence status

We use GitHub usernames and assigned responsibilities in the member directory.
The contribution record distinguishes integrated work, open pull requests, and
tasks still in progress. Local automated test results are reported separately
from physical-device testing and user feedback.

The EAS production build succeeded and the APK is available at
`build/AgriSokoPocket_G11.apk` and the
[GitHub v1.0.0 release](https://github.com/cxnisme/agrisoko-pocket-g11/releases/tag/v1.0.0).
The APK currently uses the Android emulator
address `http://10.0.2.2:8000` when no `EXPO_PUBLIC_API_URL` is supplied. A
hosted API URL must be configured and a new APK built before live API access
from physical devices is available; bundled local lookup remains available.
Physical-device testing and a demo recording are still outstanding.

## Team leadership and authorship

AgriSoko Pocket G11 is our group project, led by Christian (`cxnisme`) as the
group leader. Christian developed and integrated the project with support from
an AI coding assistant during implementation, testing, review, and
documentation. Project direction, integration decisions, and submission
coordination were led by the group leader.
