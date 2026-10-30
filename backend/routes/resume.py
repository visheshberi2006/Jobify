
import logging

from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from engine.resume_parser import (
    extract_resume_text,
    ResumeParsingError
)
from engine.resume_matcher import calculate_resume_match
from engine.skill_gap import calculate_skill_match

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/resume",
    tags=["Resume Matcher"]
)

MAX_FILE_SIZE = 5 * 1024 * 1024


@router.post("/match")
async def match_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    """
    Analyze an uploaded resume against a job description.

    Returns:
    - TF-IDF textual similarity
    - Required skill coverage
    - Matched skills
    - Missing skills
    """

    if not job_description.strip():
        raise HTTPException(
            status_code=400,
            detail="Job description cannot be empty."
        )

    if len(job_description) > 10000:
        raise HTTPException(
            status_code=400,
            detail="Job description exceeds the 10,000 character limit."
        )

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Please upload a resume."
        )

    file_bytes = await file.read(MAX_FILE_SIZE + 1)

    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Resume exceeds the 5 MB size limit."
        )

    try:
        resume_text = extract_resume_text(
            file.filename,
            file_bytes
        )

        similarity_result = calculate_resume_match(
            resume_text,
            job_description
        )

        skill_result = calculate_skill_match(
            resume_text,
            job_description
        )

        return {
            "success": True,
            "filename": file.filename,
            "text_similarity": similarity_result,
            "skill_analysis": skill_result
        }

    except ResumeParsingError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    except RuntimeError as error:
        logger.exception("Resume AI analysis failed")

        raise HTTPException(
            status_code=503,
            detail=str(error)
        )

    except ValueError as error:
        raise HTTPException(
            status_code=422,
            detail=str(error)
        )

    except Exception:
        logger.exception("Unexpected resume analysis error")

        raise HTTPException(
            status_code=500,
            detail="Unable to analyze this resume."
        )

    finally:
        await file.close()
