
from pathlib import Path

from engine.resume_parser import (
    extract_resume_text,
    ResumeParsingError
)

# Replace this with the path to an actual PDF or DOCX resume.
RESUME_PATH = Path("sample_resume.pdf")


def test_resume_parser():
    if not RESUME_PATH.exists():
        print("Please place a test resume at:", RESUME_PATH)
        return

    file_bytes = RESUME_PATH.read_bytes()

    try:
        text = extract_resume_text(
            RESUME_PATH.name,
            file_bytes
        )

        print("\nRESUME PARSED SUCCESSFULLY")
        print("-" * 40)
        print("Extracted characters:", len(text))
        print("\nExtracted text:")
        print(text[:2000])

    except ResumeParsingError as error:
        print("PARSING ERROR:", error)


if __name__ == "__main__":
    test_resume_parser()
