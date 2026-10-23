from fastapi.testclient import TestClient

import main
from main import app

client = TestClient(app)


def test_health():
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json()['group'] == 'G11'


def test_model_info():
    response = client.get('/model-info')
    assert response.status_code == 200
    assert response.json()['modelVersion'] == 'g11-tfidf-cosine-v1'


def test_list_members():
    response = client.get('/members')
    assert response.status_code == 200
    body = response.json()
    assert len(body) == 5
    assert {member['id'] for member in body} == {
        'cxnisme',
        'alain143',
        'IHIMBAZWEAngelique',
        'rudasingwatheogene1',
        'ladumartinbullen-cmyk',
    }


def test_get_member():
    response = client.get('/members/alain143')
    assert response.status_code == 200
    assert response.json()['githubUsername'] == 'alain143'


def test_get_unknown_member():
    response = client.get('/members/missing')
    assert response.status_code == 404


def test_ask_matches_mobile_task():
    response = client.post('/ask', json={'query': 'Who built the mobile UI and navigation?'})
    assert response.status_code == 200
    payload = response.json()
    assert payload['matched'] is True
    assert payload['member']['id'] == 'alain143'


def test_ask_matches_offline_task_owner():
    response = client.post('/ask', json={'query': 'Who owns offline cache and recovery testing?'})
    assert response.status_code == 200
    payload = response.json()
    assert payload['matched'] is True
    assert payload['member']['id'] == 'ladumartinbullen-cmyk'


def test_ask_rejects_unrelated_query():
    response = client.post('/ask', json={'query': 'Tell me about the moon landing'})
    assert response.status_code == 200
    payload = response.json()
    assert payload['matched'] is False


def test_ask_rejects_empty_query():
    response = client.post('/ask', json={'query': '   '})
    assert response.status_code == 200
    assert response.json()['matched'] is False


def test_ask_handles_empty_directory(monkeypatch):
    monkeypatch.setattr(main, 'MEMBERS', [])

    response = client.post('/ask', json={'query': 'who built the mobile app'})

    assert response.status_code == 200
    assert response.json()['matched'] is False
    assert response.json()['suggestions'] == []


def test_ask_rejects_overlong_query():
    response = client.post('/ask', json={'query': 'x' * 201})
    assert response.status_code == 422
