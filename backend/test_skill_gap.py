
from pathlib import Path

from engine.resume_parser import extract_resume_text
from engine.skill_gap import calculate_skill_match

# Load sample resume
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
We are hiring a Junior Full Stack Developer.

Required skills:
Python, FastAPI, SQL, Docker, AWS,
React, MongoDB, Kubernetes and Java.

Responsibilities:
Develop full stack web applications,
build frontend interfaces using React,
manage MongoDB databases, deploy applications
using Kubernetes and AWS, and develop
backend services using Python and FastAPI.
"""

print("TESTING NEW JOB DESCRIPTION")
print(job_description)
result = calculate_skill_match(
    resume_text,
    job_description
)

print("\nSKILL MATCH RESULT")
print("-" * 35)
print("Skill Match Score:", result["skill_match_score"], "%")
print("Required Skills:", result["required_skills"])
print("Matched Skills:", result["matched_skills"])
print("Missing Skills:", result["missing_skills"])
