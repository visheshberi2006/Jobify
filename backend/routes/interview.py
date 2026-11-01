from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, ConfigDict

from services.interview_service import (
    start_interview, submit_answer, get_interview_session,
    get_interview_report, get_interview_history
)

router = APIRouter(prefix="/interview", tags=["AI Mock Interview"])


class StartInterviewRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    target_job: str = Field(..., min_length=2, max_length=150)
    interview_type: str = Field(default="both", pattern="^(technical|hr|both)$")
    difficulty: str = Field(default="adaptive", pattern="^(beginner|intermediate|advanced|adaptive)$")


class SubmitAnswerRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    session_id: str = Field(..., min_length=10, max_length=80)
    question_id: str = Field(..., min_length=10, max_length=80)
    question: str = Field(default="", max_length=2000)
    answer: str = Field(..., min_length=2, max_length=10000)


@router.post("/start")
def start(request: StartInterviewRequest):
    try:
        return start_interview(
            target_job=request.target_job,
            interview_type=request.interview_type,
            difficulty=request.difficulty
        )
    except Exception:
        raise HTTPException(status_code=503, detail="Could not start the interview. Check AI provider configuration and backend logs.")


@router.post("/answer")
def answer(request: SubmitAnswerRequest):
    try:
        return submit_answer(
            session_id=request.session_id,
            question_id=request.question_id,
            answer=request.answer
        )
    except LookupError as error:
        raise HTTPException(status_code=404, detail=str(error))
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))
    except Exception:
        raise HTTPException(status_code=500, detail="Unable to evaluate this answer.")


@router.get("/session/{session_id}")
def session(session_id: str):
    try:
        return get_interview_session(session_id)
    except LookupError as error:
        raise HTTPException(status_code=404, detail=str(error))


@router.get("/report/{session_id}")
def report(session_id: str):
    try:
        return get_interview_report(session_id)
    except LookupError as error:
        raise HTTPException(status_code=404, detail=str(error))
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.get("/history")
def history(limit: int = 20):
    if limit < 1 or limit > 100:
        raise HTTPException(status_code=422, detail="limit must be between 1 and 100.")
    return {"success": True, "sessions": get_interview_history(limit)}
