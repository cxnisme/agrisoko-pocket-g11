# Android APK build

The installable APK is produced by Expo EAS with:

```powershell
cd mobile
npx eas-cli@latest build --platform android --profile production
```

Current EAS build: [`51746a29-700a-438c-b3eb-3357ddd7fd9a`](https://expo.dev/accounts/ckristian/projects/agrisoko-pocket-g11/builds/51746a29-700a-438c-b3eb-3357ddd7fd9a), submitted from integrated `main` revision `606779e`. The cloud build remains queued, and an APK artifact is not yet available.

Earlier build `c4325b5f-df2a-4a3d-a899-94a9adeac6c5` was canceled because it
used commit `8204c92`, before the final app integration. After the current cloud
build succeeds, we will verify the downloaded APK and place it here as
`AgriSokoPocket_G11.apk`. The current package contains source and build status,
not an APK.
