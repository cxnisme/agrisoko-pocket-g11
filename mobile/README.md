# Mobile app

Expo/React Native Android app for AgriSoko Pocket G11.

## Start the app (Windows PowerShell)

```powershell
cd mobile
npm install
npx expo start
```

For Expo Go on the same Wi-Fi network as the API:

```powershell
$env:EXPO_PUBLIC_API_URL="http://192.168.1.20:8000"
npx expo start --android
```

Use the development computer's LAN IP instead of the example address.

## Checks

```powershell
npm run typecheck
npm test
```

## Behavior

- Typed Android bottom-tab navigation and accessible screens
- Member task records with linked issue/PR evidence
- API-backed directory and explainable TF-IDF/cosine results
- Persistent directory, member, and same-query result cache
- Bundled offline lookup if there is no saved API response
- Live, cached, and offline result source indicators
- Loading, retry, no-match, and server-error states
