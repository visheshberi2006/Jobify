import re
from html import unescape


CATEGORIES = {
    "INTERVIEW": [
        "interview", "interview invitation", "schedule a call",
        "technical round", "hr round", "hiring manager"
    ],
    "ASSESSMENT": [
        "assessment", "coding test", "technical test",
        "hackerrank", "assignment", "take-home test"
    ],
    "JOB_OFFER": [
        "job offer", "offer letter", "pleased to offer",
        "employment offer", "joining date"
    ],
    "REJECTION": [
        "unfortunately", "not moving forward",
        "not selected", "regret to inform",
        "other candidates"
    ],
    "HR_REPLY": [
        "application received", "thank you for applying",
        "recruiter", "hiring team", "your application"
    ],
}


def classify_email(email):
    subject = email.get("subject", "")
    body = email.get("body", "")
    sender = email.get("sender", "")

    text = f"{subject} {body} {sender}".lower()

    scores = {
        category: sum(keyword in text for keyword in keywords)
        for category, keywords in CATEGORIES.items()
    }

    best_category = max(scores, key=scores.get)
    best_score = scores[best_category]

    if best_score == 0:
        return {
            "category": "OTHER",
            "confidence": 0.0,
        }

    total_matches = sum(scores.values())

    return {
        "category": best_category,
        "confidence": round(best_score / total_matches * 100, 2),
    }


def extract_job_information(email):
    subject = email.get("subject", "")
    body = email.get("body", "")
    sender = email.get("sender", "")

    text = f"{subject}\n{body}"

    date_pattern = (
        r"\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|"
        r"\d{4}-\d{2}-\d{2})\b"
    )

    dates = list(dict.fromkeys(re.findall(date_pattern, text)))

    action_keywords = [
        "complete", "submit", "attend",
        "reply", "confirm", "schedule",
        "upload", "prepare"
    ]

    action_items = []

    for line in body.splitlines():
        cleaned = line.strip()

        if cleaned and any(
            word in cleaned.lower() for word in action_keywords
        ):
            action_items.append(cleaned[:250])

    return {
        "sender": sender,
        "dates_found": dates[:10],
        "action_items": action_items[:10],
    }