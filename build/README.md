# Android APK build

The installable APK is produced by Expo EAS with:

```powershell
cd mobile
npx eas-cli@latest build --platform android --profile production
```

Current EAS build: [`51746a29-700a-438c-b3eb-3357ddd7fd9a`](https://expo.dev/accounts/ckristian/projects/agrisoko-pocket-g11/builds/51746a29-700a-438c-b3eb-3357ddd7fd9a), submitted from the integrated `main` revision `606779e`. No APK artifact is available yet.

Do not use older build `c4325b5f-df2a-4a3d-a899-94a9adeac6c5`: it was built
from commit `8204c92`, before the final app integration. Copy the current build's
downloaded artifact here as `AgriSokoPocket_G11.apk` only after the cloud build
succeeds and the APK is verified. The repository does not include a fabricated
or placeholder APK.
