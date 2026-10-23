# AgriSoko Pocket G11 — Team Showcase App

An evidence-grounded team profile retrieval system engineered as an installable standalone Android APK matching an applied scikit-learn TF-IDF machine learning backend matrix.

## 👥 Team Identity & Roles
* **Group Code:** G11
* **Course:** Integrated Mobile and Artificial Intelligence (INES-Ruhengeri)
* **Members:**
  * **Aline Uwase** (INES/2024/001) — AI and Data Engineer (Owned Feature: `build_index.py` & Vector Matrix)
  * **Eric Nshimiye** (INES/2024/002) — Offline and Quality Engineer (Owned Feature: AsyncStorage Caching Layer)

---

## 🛠️ Complete Local Setup & Run Commands

### 1. AI Backend Layer Setup
Navigate into the `ai-api` directory, configure your workspace, and compile your data weights model:
```bash
cd ai-api
pip install -r requirements.txt

# Run the database verification indexing script
python build_index.py

# Run the automated endpoint matrix validation suite
pytest -v

# Launch the live FastAPI runtime execution engine
uvicorn main:app --reload --port 8000
```
* **Active Base URL Routing Path:** `http://127.0.0.1:8000`
* **Dataset Cryptographic Fingerprint Verification:** Generated automatically on build execution via absolute SHA-256 validation pipelines.

### 2. React Native Frontend Setup
Navigate into the frontend project layout folder to activate your dependencies:
```bash
cd mobile
npm install

# Launch the internal development bundler engine
npx expo start
```

---

## 📱 Independent Mobile Compilation (EAS Native Build)
To produce the release package without relying on an external Expo Go runtime simulator sandbox environment:
```bash
# Log in to your cloud build system profiles
eas login

# Initialize project settings
eas build:configure

# Execute the local release compilation cycle
eas build --platform android --profile preview
```
* **Target Package Target Binary:** `build/AgriSokoPocket_G11.apk`
* **Release State Marker Tag:** `v1.0.0`

---

## 📄 Core Submission Evidence File Map
The required asset layout structure is distributed across these tracking coordinates:
* **UI UX System Evaluation Dossier:** `docs/COMBO_A3_G11_REPORT.pdf`
* **Continuous System Demo Presentation Clip:** `evidence/COMBO_A3_G11_DEMO.mp4`
* **Traceable Contribution Signature Matrix:** `evidence/CONTRIBUTIONS.pdf`
* **Automated & Manual System Test Summaries:** `evidence/TEST_LOG.pdf`
* **External User Testing Consented Notes:** `evidence/FEEDBACK.pdf`
* **Responsible Machine Learning Usage Log:** `evidence/AI_USE.md`
