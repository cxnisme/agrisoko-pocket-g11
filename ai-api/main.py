from __future__ import annotations

import json
import math
import re
from collections import Counter
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

ROOT = Path(__file__).resolve().parent
DATA_FILE = ROOT / "data" / "members.json"

app = FastAPI(title="AgriSoko Pocket G11 API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)
STOP_WORDS = {
    "a", "an", "and", "built", "did", "does", "for", "how", "i", "is",
    "me", "of", "the", "to", "who", "what",
}

with DATA_FILE.open("r", encoding="utf-8") as fh:
    MEMBERS: list[dict[str, Any]] = json.load(fh)


def normalize(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def tokenize(value: str) -> list[str]:
    return [
        token for token in normalize(value).split()
        if len(token) > 1 and token not in STOP_WORDS
    ]


def weighted_fields(member: dict[str, Any]) -> list[str]:
    return [
        member.get("fullName", ""),
        member.get("role", ""),
        member.get("feature", ""),
        member.get("problem", ""),
        member.get("contribution", ""),
        " ".join(member.get("aliases", [])),
        " ".join(member.get("skills", [])),
        " ".join(member.get("githubUsername", "").split("-")),
    ]


def tfidf_vector(
    tokens: list[str],
    document_frequency: Counter[str],
    document_count: int,
) -> dict[str, float]:
    frequencies = Counter(tokens)
    return {
        token: (1 + math.log(frequency))
        * (math.log((document_count + 1) / (document_frequency[token] + 1)) + 1)
        for token, frequency in frequencies.items()
    }


def cosine_similarity(left: dict[str, float], right: dict[str, float]) -> float:
    dot_product = sum(weight * right.get(token, 0.0) for token, weight in left.items())
    left_norm = math.sqrt(sum(weight * weight for weight in left.values()))
    right_norm = math.sqrt(sum(weight * weight for weight in right.values()))
    if left_norm == 0 or right_norm == 0:
        return 0.0
    return dot_product / (left_norm * right_norm)


def rank_members(
    query: str,
    members: list[dict[str, Any]],
) -> list[tuple[dict[str, Any], float, str]]:
    if not members:
        return []
    query_tokens = tokenize(query)
    if not query_tokens:
        return [(member, 0.0, "The query contains no useful search terms.") for member in members]

    documents = [tokenize(" ".join(weighted_fields(member))) for member in members]
    document_frequency: Counter[str] = Counter()
    for document in documents:
        document_frequency.update(set(document))

    query_vector = tfidf_vector(query_tokens, document_frequency, len(documents))
    normalized_query = f" {normalize(query)} "
    ranked = []
    for member, document in zip(members, documents):
        similarity = cosine_similarity(
            query_vector,
            tfidf_vector(document, document_frequency, len(documents)),
        )
        normalized_name = normalize(member.get("fullName", ""))
        name_bonus = 0.2 if normalized_name and f" {normalized_name} " in normalized_query else 0.0
        exact_aliases = sum(
            1 for alias in member.get("aliases", [])
            if normalize(alias) and f" {normalize(alias)} " in normalized_query
        )
        score = min(1.0, similarity + name_bonus + min(0.3, exact_aliases * 0.12))
        matched_terms = sorted(set(query_tokens) & set(document))
        if score >= 0.5:
            reason = f"TF-IDF/cosine profile similarity; matched terms: {', '.join(matched_terms)}."
        elif score >= 0.25:
            reason = f"Partial TF-IDF/cosine similarity; matched terms: {', '.join(matched_terms)}."
        else:
            reason = "The query is too vague or not strongly tied to a single member."
        ranked.append((member, score, reason))

    return sorted(ranked, key=lambda item: item[1], reverse=True)


class EvidenceLink(BaseModel):
    label: str
    url: str


class MemberSummary(BaseModel):
    id: str
    fullName: str
    role: str
    feature: str


class MemberRecord(MemberSummary):
    aliases: list[str]
    githubUsername: str
    skills: list[str]
    targetUser: str
    problem: str
    contribution: str
    outcomeMetric: str | None
    evidenceLinks: list[EvidenceLink]
    testerFeedback: str | None
    introductionDraft: str


class AskRequest(BaseModel):
    query: str = Field(min_length=1, max_length=200)


class HealthResponse(BaseModel):
    status: str
    group: str


class ModelInfoResponse(BaseModel):
    modelVersion: str
    approach: str
    groupCode: str


class AskResponse(BaseModel):
    query: str
    matched: bool
    member: MemberSummary | None
    confidence: float = Field(ge=0.0, le=1.0)
    reason: str
    introduction: str
    evidenceLinks: list[EvidenceLink]
    suggestions: list[str]
    modelVersion: str
    groupCode: str


@app.get("/health", response_model=HealthResponse)
def health() -> dict[str, str]:
    return {"status": "ok", "group": "G11"}


@app.get("/model-info", response_model=ModelInfoResponse)
def model_info() -> dict[str, str]:
    return {
        "modelVersion": "g11-tfidf-cosine-v1",
        "approach": "Deterministic TF-IDF/cosine retrieval with exact name and alias boosts",
        "groupCode": "G11",
    }


@app.get("/members", response_model=list[MemberSummary])
def list_members() -> list[dict[str, Any]]:
    return [{
        "id": member["id"],
        "fullName": member["fullName"],
        "role": member["role"],
        "feature": member["feature"],
    } for member in MEMBERS]


@app.get("/members/{member_id}", response_model=MemberRecord)
def get_member(member_id: str) -> dict[str, Any]:
    for member in MEMBERS:
        if member["id"] == member_id:
            return member
    raise HTTPException(status_code=404, detail="Member not found")


@app.post("/ask", response_model=AskResponse)
def ask_member(payload: AskRequest) -> dict[str, Any]:
    query = payload.query.strip()
    if not query:
        return {
            "query": query,
            "matched": False,
            "member": None,
            "confidence": 0.0,
            "reason": "Please enter a meaningful question.",
            "introduction": "",
            "evidenceLinks": [],
            "suggestions": [member["fullName"] for member in MEMBERS],
            "modelVersion": "g11-tfidf-cosine-v1",
            "groupCode": "G11",
        }

    if not MEMBERS:
        return {
            "query": query,
            "matched": False,
            "member": None,
            "confidence": 0.0,
            "reason": "The member directory is empty.",
            "introduction": "",
            "evidenceLinks": [],
            "suggestions": [],
            "modelVersion": "g11-tfidf-cosine-v1",
            "groupCode": "G11",
        }

    ranked = rank_members(query, MEMBERS)
    best_member, score, reason = ranked[0]
    next_score = ranked[1][1] if len(ranked) > 1 else 0.0
    matched = score >= 0.45 and score - next_score >= 0.1

    return {
        "query": query,
        "matched": matched,
        "member": {
            "id": best_member["id"],
            "fullName": best_member["fullName"],
            "role": best_member["role"],
            "feature": best_member["feature"],
        } if matched else None,
        "confidence": round(score, 2),
        "reason": reason,
        "introduction": best_member["introductionDraft"] if matched else "",
        "evidenceLinks": best_member["evidenceLinks"] if matched else [],
        "suggestions": [member["fullName"] for member in MEMBERS],
        "modelVersion": "g11-tfidf-cosine-v1",
        "groupCode": "G11",
    }
