
import logging

from fastapi import APIRouter, UploadFile, File, HTTPException

from engine.resume_parser import (
    extract_resume_text,
    ResumeParsingError,
    MAX_FILE_SIZE,
    SUPPORTED_FORMATS
)

from routes.analyze import analyze_text

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/document",
    tags=["Document Analysis"]
)


@router.post("/analyze")
async def analyze_document(file: UploadFile = File(...)):
    """
    Accept PDF, DOCX, PNG, JPG and JPEG files.
    Extract text and run the ScamShield fraud detection pipeline.
    """

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Please upload a document."
        )

    file_extension = "." + file.filename.rsplit(".", 1)[-1].lower()

    if file_extension not in SUPPORTED_FORMATS:
        raise HTTPException(
            status_code=415,
            detail="Supported formats: PDF, DOCX, PNG, JPG and JPEG."
        )

    try:
        file_bytes = await file.read(MAX_FILE_SIZE + 1)

        if len(file_bytes) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail="File exceeds the 5 MB size limit."
            )

        extracted_text = extract_resume_text(
            file.filename,
            file_bytes
        )

        result = analyze_text(extracted_text)

        return {
            "success": True,
            "filename": file.filename,
            "extraction": {
                "method": (
                    "ocr"
                    if file_extension in {".png", ".jpg", ".jpeg"}
                    else "document_parser"
                ),
                "extracted_text": extracted_text,
                "character_count": len(extracted_text)
            },
            "analysis": result
        }

    except ResumeParsingError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    except ValueError as error:
        raise HTTPException(
            status_code=422,
            detail=str(error)
        )

    except Exception:
        logger.exception("Document analysis failed")

        raise HTTPException(
            status_code=500,
            detail="Unable to analyze this document."
        )

    finally:
        await file.close()
