
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


def analyze_text(message: str) -> dict:
    """Run the complete ScamShield fraud detection pipeline."""

    if not isinstance(message, str):
        raise ValueError("Input must be text.")

    message = message.strip()

    if len(message) < 10:
        raise ValueError(
            "Message must contain at least 10 characters."
        )

    if len(message) > 5000:
        raise ValueError(
            "Message cannot exceed 5000 characters."
        )

    # 1. Rule-based detection
    local_result = analyze_rules(message)

    # 2. ML prediction
    ml_score = predict_scam(message)

    # 3. Combined risk score
    score = calculate_risk(
        local_result["rule_score"],
        ml_score
    )

    risk_level = get_risk_level(score)

    # 4. AI explanation
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

    # 6. Structured response
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


@router.post("/analyze")
def analyze_message(request: AnalyzeRequest):
    return analyze_text(request.text)
