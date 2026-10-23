import os
import pickle
import numpy as np
from typing import List, Optional
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI(
    title="AgriSoko Pocket AI API",
    version="1.0.0",
    description="Live TF-IDF engine using scikit-learn cosine similarity matrix profiling."
)

# Robust absolute path resolution
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PKL = os.path.join(BASE_DIR, "data", "tfidf_model.pkl")

# Safe global storage for model artifacts
MODEL_DATA = None
if os.path.exists(MODEL_PKL):
    with open(MODEL_PKL, "rb") as f:
        MODEL_DATA = pickle.load(f)

# Core Assignment Constraints
CONFIDENCE_THRESHOLD = 0.45
GROUP_CODE = "G11"
MODEL_VERSION = "1.0.0-tfidf"

# --- API CONTRACT CONTRACT SCHEMAS ---
class HealthResponse(BaseModel):
    status: str = "healthy"
    version: str
    group_code: str

class AskRequest(BaseModel):
    query: str = Field(..., min_length=2, max_length=500)

class AskResponse(BaseModel):
    query: str
    top_match: Optional[str] = None
    confidence: float
    reason: str
    introduction: Optional[str] = None
    evidence_links: List[str] = []
    model_version: str

class ModelInfoResponse(BaseModel):
    vectorizer_type: str
    threshold: float
    dataset_fingerprint: str
    limitations: List[str]
    build_commit: str

# --- ENDPOINTS ---

@app.get("/health", response_model=HealthResponse)
def get_health():
    return {"status": "healthy", "version": "1.0.0", "group_code": GROUP_CODE}

@app.get("/model-info", response_model=ModelInfoResponse)
def get_model_info():
    if not MODEL_DATA:
        raise HTTPException(status_code=500, detail="Model artifact payload not loaded.")
    return {
        "vectorizer_type": "TF-IDF Word Features with Cosine Similarity",
        "threshold": CONFIDENCE_THRESHOLD,
        "dataset_fingerprint": MODEL_DATA["fingerprint"],
        "limitations": ["Deterministic vocabulary tracking only.", "Cannot infer data fields outside members.json context."],
        "build_commit": "v1.0.0-merged"
    }

@app.post("/ask", response_model=AskResponse)
def ask_team(payload: AskRequest):
    global MODEL_DATA
    if not MODEL_DATA:
        raise HTTPException(status_code=500, detail="Search matrix is unavailable.")

    query_text = payload.query.strip().lower()
    
    # Run the query through our pre-built TF-IDF model vector space
    vectorizer = MODEL_DATA["vectorizer"]
    matrix = MODEL_DATA["tfidf_matrix"]
    metadata = MODEL_DATA["metadata"]

    query_vector = vectorizer.transform([query_text])
    similarities = cosine_similarity(query_vector, matrix).flatten()
    best_idx = np.argmax(similarities)
    max_score = float(similarities[best_idx])

    # Enforce strict assignment exact name or alias boost criteria
    for idx, member in enumerate(metadata):
        names_to_check = [member["fullName"].lower()] + [a.lower() for a in member["aliases"]]
        if any(name in query_text for name in names_to_check):
            max_score = max(max_score, 0.65)  # Boost confidence clearly past threshold bounds
            best_idx = idx
            break

    # No-Match Safety Rule
    if max_score < CONFIDENCE_THRESHOLD:
        return {
            "query": payload.query,
            "top_match": None,
            "confidence": round(max_score, 3),
            "reason": f"Highest matrix score ({round(max_score, 3)}) sat lower than project threshold ({CONFIDENCE_THRESHOLD}).",
            "introduction": "No confident matching team profile found. Try asking for specific names, skills, or features like 'offline state' or 'Eric'.",
            "evidence_links": [],
            "model_version": MODEL_VERSION
        }

    matched_member = metadata[best_idx]
    return {
        "query": payload.query,
        "top_match": matched_member["fullName"],
        "confidence": round(max_score, 3),
        "reason": f"Successfully matched profile via technical index keys mapping directly to feature: {matched_member['feature']}.",
        "introduction": matched_member["introductionDraft"],
        "evidence_links": matched_member["evidenceLinks"],
        "model_version": MODEL_VERSION
    }
