# AgriSoko Pocket G11 API

FastAPI service for the Group G11 member lookup app.

## Start the backend (Windows PowerShell)

```powershell
cd ai-api
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## Endpoints

- `GET /health`
- `GET /model-info`
- `GET /members`
- `GET /members/{member_id}`
- `POST /ask`

Run the automated checks with:

```powershell
python -m pytest -q
```

## Matching logic

The service uses deterministic TF-IDF/cosine retrieval with exact name and
alias boosts, then applies a confidence threshold and a top-result margin to
avoid ambiguous guesses. Responses include matched terms, evidence links, and
a safe no-match result. The profile data uses GitHub usernames, assigned task areas, and repository
evidence. The final matcher and offline features were integrated by the group
leader; member-authored work and profile confirmation are recorded separately.
