from pathlib import Path

from engine.resume_parser import extract_resume_text, ResumeParsingError

image_path = Path("test_scam_screenshot.png")

if not image_path.exists():
    print("Please place a PNG screenshot named test_scam_screenshot.png in backend/")
else:
    try:
        image_bytes = image_path.read_bytes()

        extracted_text = extract_resume_text(
            image_path.name,
            image_bytes
        )

        print("\nOCR SUCCESS")
        print("-" * 40)
        print(extracted_text)

    except ResumeParsingError as error:
        print("OCR FAILED:", error)