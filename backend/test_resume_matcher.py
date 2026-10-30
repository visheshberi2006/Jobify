
from pathlib import Path

from engine.resume_parser import extract_resume_text
from engine.resume_matcher import calculate_resume_match

# Load the sample PDF
resume_path = Path("sample_resume.pdf")

if not resume_path.exists():
    print("sample_resume.pdf not found!")
    raise SystemExit(1)

resume_text = extract_resume_text(
    resume_path.name,
    resume_path.read_bytes()
)

# Sample job description
job_description = """
We are hiring a Junior Python Backend Developer.

Required skills:
Python, FastAPI, REST API development,
SQL, PostgreSQL, Git, Docker and AWS.

Responsibilities:
Build backend applications, develop APIs,
manage databases, write clean Python code
and collaborate using Git.
"""

# Calculate match
result = calculate_resume_match(
    resume_text,
    job_description
)

print("\nRESUME MATCH RESULT")
print("-" * 35)
print("Match Score:", result["match_score"], "%")
print("Score Type:", result["score_type"])
print("Note:", result["message"])
print("\nDEBUG CHECK")
print("Resume contains Python:", "python" in resume_text.lower())
print("Resume contains FastAPI:", "fastapi" in resume_text.lower())
print("Resume contains Docker:", "docker" in resume_text.lower())
print("Resume contains AWS:", "aws" in resume_text.lower())