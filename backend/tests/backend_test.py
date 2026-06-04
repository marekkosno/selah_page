"""Backend API tests for SELAH landing page."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://focus-timer-hub-9.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_health_ok(self, session):
        r = session.get(f"{API}/health", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"

    def test_root_api(self, session):
        r = session.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        assert "SELAH" in r.json().get("app", "") or "message" in r.json()


# ---------- Newsletter ----------
class TestNewsletter:
    def test_subscribe_valid_email(self, session):
        email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        r = session.post(f"{API}/newsletter/subscribe", json={"email": email, "lang": "pl"}, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("status") == "ok"
        assert data.get("already_subscribed") is False

    def test_subscribe_duplicate_returns_already_subscribed(self, session):
        email = f"dup_{uuid.uuid4().hex[:8]}@example.com"
        r1 = session.post(f"{API}/newsletter/subscribe", json={"email": email, "lang": "en"}, timeout=15)
        assert r1.status_code == 200
        assert r1.json().get("already_subscribed") is False

        r2 = session.post(f"{API}/newsletter/subscribe", json={"email": email, "lang": "en"}, timeout=15)
        assert r2.status_code == 200
        assert r2.json().get("already_subscribed") is True

        # Case insensitive duplicate (uppercase)
        r3 = session.post(f"{API}/newsletter/subscribe", json={"email": email.upper(), "lang": "en"}, timeout=15)
        assert r3.status_code == 200
        assert r3.json().get("already_subscribed") is True

    def test_subscribe_invalid_email(self, session):
        r = session.post(f"{API}/newsletter/subscribe", json={"email": "not-an-email", "lang": "pl"}, timeout=15)
        assert r.status_code == 422

    def test_subscribe_missing_email(self, session):
        r = session.post(f"{API}/newsletter/subscribe", json={"lang": "pl"}, timeout=15)
        assert r.status_code == 422


# ---------- Contact ----------
class TestContact:
    def test_contact_valid(self, session):
        payload = {
            "name": "TEST_User",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "message": "Hello, this is a longer than 5 chars test message.",
            "lang": "pl",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("status") == "ok"
        assert "id" in data and isinstance(data["id"], str)

    def test_contact_invalid_email(self, session):
        payload = {"name": "x", "email": "bad", "message": "Hello there friend"}
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_contact_missing_email(self, session):
        payload = {"name": "x", "message": "Hello there friend"}
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_contact_message_too_short(self, session):
        payload = {
            "name": "x",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "message": "hi",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_contact_missing_message(self, session):
        payload = {"name": "x", "email": "ok@example.com"}
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_contact_no_name_allowed(self, session):
        payload = {
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "message": "Anonymous message body content.",
            "lang": "en",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 200
        assert r.json().get("status") == "ok"
