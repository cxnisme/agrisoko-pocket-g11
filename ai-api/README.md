# AI API work area

This folder is an implementation placeholder for the Python/FastAPI service
and deterministic profile matcher. Coordinate API response fields with the
mobile owner before changing the contract.

## Task owner

- AI/data and retrieval: Angelique — see Task 1 in [`../docs/TEAM_TASKS.md`](../docs/TEAM_TASKS.md).
- FastAPI endpoints and validation: Theogene — see Task 2 in
  [`../docs/TEAM_TASKS.md`](../docs/TEAM_TASKS.md).
- Final deployment and integration: Christian.

## Required behavior

Implement `GET /health`, `GET /members`, `GET /members/{id}`, `POST /ask`, and
`GET /model-info` according to the project task brief. Validate inputs and
responses, support a safe no-match result, and return only approved member data.
The matching model is deterministic TF-IDF/cosine retrieval; a generative
service must not be the only available lookup.

Add dependency manifests, source, tests, and exact local run commands with the
implementation. Do not add secrets, deployment credentials, unapproved profile
claims, or unmeasured results.
