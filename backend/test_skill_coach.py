
from pathlib import Path

from engine.resume_parser import extract_resume_text
from engine.skill_gap import (
    calculate_skill_match,
    generate_skill_roadmap
)

# Load sample resume
resume_path = Path("sample_resume.pdf")

if not resume_path.exists():
    print("sample_resume.pdf not found!")
    raise SystemExit(1)

resume_text = extract_resume_text(
    resume_path.name,
    resume_path.read_bytes()
)

# Full Stack Developer job description
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

print("\n1. ANALYSING RESUME")
print("-" * 35)

# Extract and compare skills
match_result = calculate_skill_match(
    resume_text,
    job_description
)

print("Skill Match:", match_result["skill_match_score"], "%")
print("Matched Skills:", match_result["matched_skills"])
print("Missing Skills:", match_result["missing_skills"])

print("\n2. GENERATING LEARNING ROADMAP")
print("-" * 35)

# Generate roadmap
roadmap = generate_skill_roadmap(
    target_job="Junior Full Stack Developer",
    missing_skills=match_result["missing_skills"]
)

print("Roadmap Enabled:", roadmap["enabled"])
print(roadmap["roadmap"])
