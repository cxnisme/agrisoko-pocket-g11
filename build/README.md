# Android APK build

The installable APK is produced by Expo EAS with:

```powershell
cd mobile
npx eas-cli@latest build --platform android --profile production
```

Production EAS build [`51746a29-700a-438c-b3eb-3357ddd7fd9a`](https://expo.dev/accounts/ckristian/projects/agrisoko-pocket-g11/builds/51746a29-700a-438c-b3eb-3357ddd7fd9a) succeeded on 23 October 2026. It used app version `1.0.0` (version code `1`), Expo SDK `53.0.0`, and integrated `main` revision `606779e`.

The downloaded APK was verified as a readable Android package archive with
1,065 entries, including `AndroidManifest.xml`, `classes.dex`,
`resources.arsc`, and native libraries. Its SHA-256 is
`AD64418C85B1B7AA56DCF3FC5F5DBF9AFA579038E4DCCC64C2343DEFA398F2A8`.
The file is available here as `AgriSokoPocket_G11.apk`.

Earlier build `c4325b5f-df2a-4a3d-a899-94a9adeac6c5` was canceled because it
used commit `8204c92`, before the final app integration. This verifies the downloaded APK's archive structure and integrity hash;
installation and physical-device behavior have not been tested. Inspection of
the bundled JavaScript confirmed the Android emulator fallback
`http://10.0.2.2:8000`; no hosted API URL was embedded. This address does not
provide a hosted API for physical devices.

The remote `v1.0.0` tag points to the source revision used by this APK.
The GitHub Release has not yet been published; an authenticated GitHub session
is required to attach the APK. The release notes should disclose the API
fallback limitation.
