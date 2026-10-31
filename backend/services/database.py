import sqlite3
import json
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[1]
DB_PATH = BASE_DIR / "jobify.db"


def get_connection():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    with get_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS emails (
                id TEXT PRIMARY KEY,
                sender TEXT,
                subject TEXT,
                email_date TEXT,
                category TEXT,
                confidence REAL,
                dates_found TEXT,
                action_items TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        connection.commit()


def save_email(email):
    with get_connection() as connection:
        connection.execute("""
            INSERT INTO emails (
                id, sender, subject, email_date,
                category, confidence, dates_found, action_items
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                category = excluded.category,
                confidence = excluded.confidence,
                dates_found = excluded.dates_found,
                action_items = excluded.action_items
        """, (
            email["id"],
            email["sender"],
            email["subject"],
            email["date"],
            email["category"],
            email["confidence"],
            json.dumps(email["job_information"]["dates_found"]),
            json.dumps(email["job_information"]["action_items"]),
        ))

        connection.commit()


def get_saved_emails():
    with get_connection() as connection:
        rows = connection.execute("""
            SELECT * FROM emails
            ORDER BY email_date DESC
        """).fetchall()

    results = []

    for row in rows:
        item = dict(row)
        item["dates_found"] = json.loads(item["dates_found"] or "[]")
        item["action_items"] = json.loads(item["action_items"] or "[]")
        results.append(item)

    return results
def get_dashboard_stats():
    with get_connection() as connection:
        total = connection.execute(
            "SELECT COUNT(*) FROM emails"
        ).fetchone()[0]

        rows = connection.execute("""
            SELECT category, COUNT(*) AS count
            FROM emails
            GROUP BY category
        """).fetchall()

    categories = {
        "INTERVIEW": 0,
        "ASSESSMENT": 0,
        "HR_REPLY": 0,
        "REJECTION": 0,
        "JOB_OFFER": 0,
        "OTHER": 0,
    }

    for row in rows:
        category = row["category"]

        if category in categories:
            categories[category] = row["count"]
        else:
            categories["OTHER"] += row["count"]

    return {
        "total_emails": total,
        "categories": categories,
        "interviews": categories["INTERVIEW"],
        "assessments": categories["ASSESSMENT"],
        "offers": categories["JOB_OFFER"],
        "rejections": categories["REJECTION"],
    }