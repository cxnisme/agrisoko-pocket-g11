// Replace GXX with your lecturer-assigned group code.
export const GROUP_CODE = 'GXX';
export const APP_NAME = `AgriSoko Pocket ${GROUP_CODE}`;
export const APP_VERSION = '1.0.0';
export const GITHUB_URL = 'https://github.com/<leader-username>/agrisoko-pocket-gxx';

// Configurable API base URL (set EXPO_PUBLIC_API_URL; never hard-code secrets).
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:8000';
export const REQUEST_TIMEOUT_MS = 10000;
export const MAX_QUERY_LENGTH = 200;
export const CONFIDENCE_THRESHOLD = 0.45;

// Keep true until the FastAPI service is deployed, then set false.
export const USE_MOCK = true;
