from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from engine.skill_gap import generate_skill_roadmap

router = APIRouter(
    prefix="/skill-coach",
    tags=["Skill Coach"]
)


class RoadmapRequest(BaseModel):
    target_job: str = Field(
        ...,
        min_length=2,
        max_length=150
    )

    missing_skills: list[str] = Field(
        ...,
        min_length=1,
        max_length=30
    )


@router.post("/roadmap")
async def create_roadmap(request: RoadmapRequest):
    try:
        result = generate_skill_roadmap(
            target_job=request.target_job,
            missing_skills=request.missing_skills
        )

        return {
            "success": True,
            "roadmap": result
        }

    except RuntimeError as error:
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
        raise HTTPException(
            status_code=500,
            detail="Unable to generate the learning roadmap."
        )