
import logging

from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import RedirectResponse

from services.gmail_service import (
    start_oauth,
    finish_oauth,
    is_gmail_connected,
    get_recent_emails,
)

from services.email_classifier import (
    classify_email,
    extract_job_information,
)
from services.database import (
    save_email,
    get_saved_emails,
    get_dashboard_stats,
)

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/email",
    tags=["Gmail Intelligence"],
)


@router.get("/connect")
def connect_gmail():
    """Start Google Gmail OAuth authorization."""

    try:
        authorization_url = start_oauth()
        return RedirectResponse(url=authorization_url)

    except Exception:
        logger.exception("Could not start Gmail authorization")
        raise HTTPException(
            status_code=500,
            detail="Could not start Gmail authorization.",
        )



@router.get("/oauth2callback")
def gmail_oauth_callback(
    code: str = Query(...),
    state: str = Query(...),
):
    """Handle Google's OAuth callback."""

    try:
        finish_oauth(code=code, state=state)

        return RedirectResponse(
            url="http://localhost:5173/?gmail=connected",
            status_code=303,
        )

    except ValueError as error:
        logger.warning("Gmail OAuth callback validation failed: %s", error)
        return RedirectResponse(
            url="http://localhost:5173/?gmail=error",
            status_code=303,
        )

    except Exception:
        logger.exception("Gmail OAuth callback failed")
        return RedirectResponse(
            url="http://localhost:5173/?gmail=error",
            status_code=303,
        )



@router.get("/status")
def gmail_status():
    """Check Gmail connection status."""

    try:
        return {
            "connected": is_gmail_connected(),
            "service": "Gmail",
        }

    except Exception:
        logger.exception("Gmail status check failed")
        raise HTTPException(
            status_code=500,
            detail="Could not check Gmail connection status.",
        )


@router.get("/messages")
def fetch_gmail_messages(
    limit: int = Query(default=20, ge=1, le=50),
):
    """Fetch recent Gmail inbox messages."""

    try:
        return get_recent_emails(max_results=limit)

    except ValueError as error:
        raise HTTPException(status_code=401, detail=str(error))

    except Exception:
        logger.exception("Gmail message fetching failed")
        raise HTTPException(
            status_code=500,
            detail="Could not fetch Gmail messages. Check backend logs.",
        )


@router.get("/analyze")
def analyze_gmail_emails(
    limit: int = Query(default=20, ge=1, le=50),
):
    """Fetch, classify, and save recent Gmail messages."""

    try:
        result = get_recent_emails(max_results=limit)
        analyzed_emails = []

        for email in result["emails"]:
            classification = classify_email(email)
            job_info = extract_job_information(email)

            analyzed = {
                "id": email["id"],
                "subject": email["subject"],
                "sender": email["sender"],
                "date": email["date"],
                "category": classification["category"],
                "confidence": classification["confidence"],
                "job_information": job_info,
            }

            save_email(analyzed)
            analyzed_emails.append(analyzed)

        return {
            "total_analyzed": len(analyzed_emails),
            "saved_to_database": len(analyzed_emails),
            "results": analyzed_emails,
        }

    except ValueError as error:
        raise HTTPException(status_code=401, detail=str(error))

    except Exception:
        logger.exception("Gmail email analysis failed")
        raise HTTPException(
            status_code=500,
            detail="Email analysis failed. Check backend logs.",
        )
@router.get("/saved")
def fetch_saved_emails():
    """Retrieve previously analyzed emails from SQLite."""

    try:
        emails = get_saved_emails()

        return {
            "total_saved": len(emails),
            "emails": emails,
        }

    except Exception:
        logger.exception("Could not retrieve saved emails")
        raise HTTPException(
            status_code=500,
            detail="Could not retrieve saved emails.",
        )
@router.post("/sync")
def sync_gmail_emails(
    limit: int = Query(default=20, ge=1, le=50),
):
    """Fetch, classify and save Gmail messages in one operation."""

    try:
        result = get_recent_emails(max_results=limit)

        synced_emails = []

        for email in result["emails"]:
            classification = classify_email(email)
            job_info = extract_job_information(email)

            analyzed = {
                "id": email["id"],
                "subject": email["subject"],
                "sender": email["sender"],
                "date": email["date"],
                "category": classification["category"],
                "confidence": classification["confidence"],
                "job_information": job_info,
            }

            save_email(analyzed)
            synced_emails.append(analyzed)

        return {
            "success": True,
            "message": "Gmail synchronization completed.",
            "total_fetched": len(result["emails"]),
            "total_processed": len(synced_emails),
            "total_saved": len(synced_emails),
            "results": synced_emails,
        }

    except ValueError as error:
        raise HTTPException(status_code=401, detail=str(error))

    except Exception:
        logger.exception("Gmail synchronization failed")
        raise HTTPException(
            status_code=500,
            detail="Gmail synchronization failed. Check backend logs.",
        )
@router.get("/dashboard")
def get_email_dashboard():
    """Return dashboard statistics from saved emails."""

    try:
        return {
            "success": True,
            "dashboard": get_dashboard_stats(),
        }

    except Exception:
        logger.exception("Dashboard statistics failed")
        raise HTTPException(
            status_code=500,
            detail="Could not load dashboard statistics.",
        )