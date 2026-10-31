import time
import secrets
from pathlib import Path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
import base64
import re
from html import unescape


BASE_DIR = Path(__file__).resolve().parents[1]

CLIENT_SECRET_FILE = BASE_DIR / "credentials" / "gmail-oauth-client.json"
TOKEN_FILE = BASE_DIR / "token.json"

REDIRECT_URI = "http://localhost:8000/api/email/oauth2callback"

SCOPES = [
    "https://www.googleapis.com/auth/gmail.readonly"
]

# Temporary state storage for this single-user local prototype.
# Restarting the backend invalidates any unfinished OAuth login.
_pending_states = {}


def start_oauth():
    """Create Google's Gmail authorization URL."""

    if not CLIENT_SECRET_FILE.exists():
        raise FileNotFoundError(
            f"OAuth credentials not found: {CLIENT_SECRET_FILE}"
        )

    flow = Flow.from_client_secrets_file(
        str(CLIENT_SECRET_FILE),
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI,
    )

    authorization_url, state = flow.authorization_url(
        access_type="offline",
        prompt="consent",
        include_granted_scopes="true",
    )

    _pending_states[state] = (time.time(), flow)

    return authorization_url


def finish_oauth(code: str, state: str):
    """Validate OAuth state, exchange the code, and save the token."""

    pending = _pending_states.pop(state, None)

    if pending is None:
        raise ValueError("Invalid or expired OAuth state. Please reconnect Gmail.")

    created_at, flow = pending

    if time.time() - created_at > 600:
        raise ValueError("OAuth session expired. Please reconnect Gmail.")

    flow.fetch_token(code=code)

    credentials = flow.credentials

    TOKEN_FILE.parent.mkdir(parents=True, exist_ok=True)
    TOKEN_FILE.write_text(credentials.to_json(), encoding="utf-8")

    return True


def get_credentials():
    """Load and refresh saved Gmail credentials when necessary."""

    if not TOKEN_FILE.exists():
        return None

    credentials = Credentials.from_authorized_user_file(
        str(TOKEN_FILE),
        SCOPES,
    )

    if credentials.expired and credentials.refresh_token:
        credentials.refresh(Request())
        TOKEN_FILE.write_text(credentials.to_json(), encoding="utf-8")

    if not credentials.valid:
        return None

    return credentials


def get_gmail_service():
    """Build an authenticated Gmail API client."""

    credentials = get_credentials()

    if credentials is None:
        return None

    return build(
        "gmail",
        "v1",
        credentials=credentials,
        cache_discovery=False,
    )


def is_gmail_connected():
    """Check whether valid Gmail credentials are available."""

    return get_gmail_service() is not None
def _extract_email_body(payload):
    """Extract readable text from Gmail message payloads."""

    body = ""

    def process_part(part):
        nonlocal body

        mime_type = part.get("mimeType", "")
        data = part.get("body", {}).get("data")

        if mime_type == "text/plain" and data and not body:
            decoded = base64.urlsafe_b64decode(data).decode(
                "utf-8", errors="replace"
            )
            body = decoded

        elif mime_type == "text/html" and data and not body:
            decoded = base64.urlsafe_b64decode(data).decode(
                "utf-8", errors="replace"
            )
            body = re.sub(r"<[^>]+>", " ", decoded)
            body = unescape(body)

        for child in part.get("parts", []):
            process_part(child)

    process_part(payload)

    return body.strip()[:5000]


def get_recent_emails(max_results=20):
    """Fetch recent Inbox messages using Gmail read-only access."""

    service = get_gmail_service()

    if service is None:
        raise ValueError("Gmail is not connected. Please connect Gmail first.")

    max_results = max(1, min(max_results, 50))

    results = service.users().messages().list(
        userId="me",
        labelIds=["INBOX"],
        maxResults=max_results,
    ).execute()

    messages = results.get("messages", [])
    emails = []

    for message in messages:
        details = service.users().messages().get(
            userId="me",
            id=message["id"],
            format="full",
        ).execute()

        headers = details.get("payload", {}).get("headers", [])

        header_map = {
            header["name"].lower(): header["value"]
            for header in headers
        }

        emails.append({
            "id": details["id"],
            "sender": header_map.get("from", "Unknown"),
            "subject": header_map.get("subject", "(No subject)"),
            "date": header_map.get("date", ""),
            "snippet": details.get("snippet", ""),
            "body": _extract_email_body(details.get("payload", {})),
        })

    return {
        "total_fetched": len(emails),
        "emails": emails,
    }
