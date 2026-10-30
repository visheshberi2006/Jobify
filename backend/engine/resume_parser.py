
import io
import re
import zipfile
import logging
from pathlib import Path

import pdfplumber
import pytesseract
from PIL import Image, ImageOps, UnidentifiedImageError
from docx import Document


logger = logging.getLogger(__name__)

# File limits
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB
MAX_IMAGE_PIXELS = 20_000_000

SUPPORTED_FORMATS = {
    ".pdf",
    ".docx",
    ".png",
    ".jpg",
    ".jpeg"
}

# Windows Tesseract installation path
TESSERACT_PATH = Path(
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)

if TESSERACT_PATH.is_file():
    pytesseract.pytesseract.tesseract_cmd = str(TESSERACT_PATH)


class ResumeParsingError(Exception):
    """Raised when a document cannot be safely or correctly parsed."""
    pass


def extract_resume_text(filename: str, file_bytes: bytes) -> str:
    """
    Extract text from PDF, DOCX, PNG, JPG and JPEG files.

    Args:
        filename: Original uploaded filename.
        file_bytes: Uploaded file contents.

    Returns:
        Extracted and normalized text.

    Raises:
        ResumeParsingError: If the file is invalid, unsupported,
        too large, unreadable, or contains insufficient text.
    """

    if not filename or not file_bytes:
        raise ResumeParsingError("Please upload a valid file.")

    if len(file_bytes) > MAX_FILE_SIZE:
        raise ResumeParsingError(
            "File exceeds the 5 MB size limit."
        )

    extension = Path(filename).suffix.lower()

    if extension not in SUPPORTED_FORMATS:
        raise ResumeParsingError(
            "Unsupported format. Upload PDF, DOCX, PNG, JPG or JPEG."
        )

    try:
        if extension == ".pdf":
            if not file_bytes.startswith(b"%PDF-"):
                raise ResumeParsingError("Invalid PDF file.")

            text = extract_pdf_text(file_bytes)

        elif extension == ".docx":
            if not zipfile.is_zipfile(io.BytesIO(file_bytes)):
                raise ResumeParsingError("Invalid DOCX file.")

            text = extract_docx_text(file_bytes)

        else:
            text = extract_image_text(file_bytes)

        # Normalize whitespace
        text = re.sub(r"\s+", " ", text).strip()

        if len(text) < 20:
            raise ResumeParsingError(
                "Could not extract enough text from this document. "
                "It may be blank, unreadable or require better image quality."
            )

        return text

    except ResumeParsingError:
        raise

    except Exception as exc:
        logger.exception("Document parsing failed")

        raise ResumeParsingError(
            "Unable to read this file. Please check the document."
        ) from exc


def extract_pdf_text(file_bytes: bytes) -> str:
    """Extract text from all pages of a PDF."""

    extracted_pages = []

    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:

        if not pdf.pages:
            raise ResumeParsingError(
                "The PDF contains no pages."
            )

        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                extracted_pages.append(page_text)

    return "\n".join(extracted_pages)


def extract_docx_text(file_bytes: bytes) -> str:
    """Extract text from DOCX paragraphs and tables."""

    document = Document(io.BytesIO(file_bytes))
    extracted_text = []

    # Extract paragraphs
    for paragraph in document.paragraphs:
        if paragraph.text.strip():
            extracted_text.append(paragraph.text)

    # Extract tables
    for table in document.tables:
        for row in table.rows:
            for cell in row.cells:
                if cell.text.strip():
                    extracted_text.append(cell.text)

    return "\n".join(extracted_text)


def extract_image_text(file_bytes: bytes) -> str:
    """Extract text from PNG, JPG and JPEG using Tesseract OCR."""

    try:
        # Verify image integrity
        with Image.open(io.BytesIO(file_bytes)) as image:
            image.verify()

        # Reopen image after verification
        with Image.open(io.BytesIO(file_bytes)) as image:

            if image.format not in {"PNG", "JPEG"}:
                raise ResumeParsingError(
                    "Invalid image format. Use PNG, JPG or JPEG."
                )

            # Prevent oversized image processing
            if image.width * image.height > MAX_IMAGE_PIXELS:
                raise ResumeParsingError(
                    "Image dimensions exceed the allowed limit."
                )

            # Image preprocessing
            image = ImageOps.exif_transpose(image)
            image = ImageOps.grayscale(image)

            # OCR extraction
            extracted_text = pytesseract.image_to_string(
                image,
                config="--psm 6"
            )

            return extracted_text.strip()

    except UnidentifiedImageError as exc:
        raise ResumeParsingError(
            "Invalid or corrupted image file."
        ) from exc

    except pytesseract.TesseractNotFoundError as exc:
        raise ResumeParsingError(
            "Tesseract OCR is not installed or its executable "
            "cannot be found."
        ) from exc
