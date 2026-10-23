import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_theogene_schema_validation_payloads():
    """Validates that empty inputs or overly long questions return 422 processing blocks."""
    # Too short
    bad_response = client.post("/ask", json={"query": ""})
    assert bad_response.status_code == 422
    
    # Overly long text constraint block
    oversized_text = "potato " * 200
    long_response = client.post("/ask", json={"query": oversized_text})
    assert long_response.status_code == 422

def test_theogene_cors_headers_present():
    """Validates that cross-origin preflight responses carry safety permissions for the APK client."""
    response = client.options("/ask", headers={
        "Origin": "http://localhost:19006",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type"
    })
    assert response.status_code == 200
    assert "access-control-allow-origin" in response.headers
