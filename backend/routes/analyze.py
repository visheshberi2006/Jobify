
from fastapi import APIRouter
from pydantic import BaseModel, Field, field_validator

from engine.scam_rules import analyze_rules
from engine.risk_score import calculate_risk, get_risk_level
from engine.gemini_analyzer import analyze_with_gemini
from engine.ml_predictor import predict_scam

router = APIRouter()


class AnalyzeRequest(BaseModel):
    text: str = Field(max_length=5000)

    @field_validator("text")
    @classmethod
    def validate_text(cls, value):
        value = value.strip()

        if len(value) < 10:
            raise ValueError(
                "Message must contain at least 10 characters."
            )

        return value


@router.post("/analyze")
def analyze_message(request: AnalyzeRequest):

    message = request.text

    # 1. Rule-based detection
    local_result = analyze_rules(message)

    # 2. ML prediction
    ml_score = predict_scam(message)

    # 3. Combine rule and ML scores (60/40)
    score = calculate_risk(
        local_result["rule_score"],
        ml_score
    )

    risk_level = get_risk_level(score)

    # 4. Gemini explanation
    gemini_result = analyze_with_gemini(
        message,
        local_result
    )

    # 5. Safety recommendation
    if risk_level == "HIGH":
        recommendation = (
            "High risk: Do not pay money or share sensitive "
            "information. Verify the employer independently."
        )

    elif risk_level == "MEDIUM":
        recommendation = (
            "Exercise caution. Verify the employer, job details "
            "and payment requirements before proceeding."
        )

    else:
        recommendation = (
            "No obvious scam indicators detected. This does not "
            "guarantee legitimacy. Verify the employer independently."
        )

    # 6. Structured API response
    return {
        "project": "ScamShield AI",
        "risk_score": score,
        "risk_level": risk_level,
        "rule_score": local_result["rule_score"],
        "ml_score": ml_score,
        "category": local_result["category"],
        "indicators": local_result["indicators"],
        "recommendation": recommendation,
        "gemini_analysis": gemini_result
    }
