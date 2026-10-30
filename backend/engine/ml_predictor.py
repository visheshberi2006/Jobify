
import logging
import re
from pathlib import Path

import joblib

logger = logging.getLogger(__name__)

# Locate the model relative to the backend directory
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "emscad_scam_detector.joblib"

_model = None


def load_model():
    global _model

    if _model is None:
        if not MODEL_PATH.exists():
            raise FileNotFoundError(
                f"Scam detection model not found: {MODEL_PATH}"
            )

        _model = joblib.load(MODEL_PATH)

        if not hasattr(_model, "predict_proba"):
            raise TypeError("Loaded model does not support predict_proba.")

        if 1 not in _model.classes_:
            raise ValueError(
                "Model does not contain the fraudulent class (1)."
            )

        logger.info("Scam detection ML model loaded successfully.")

    return _model


def prepare_message(message: str) -> str:
    """
    Reproduce the original seven-field training format.

    The five-field API message is placed in the description
    position. The other two unused fields are empty.
    """
    fields = [
        "",          # title
        "",          # location
        "",          # department
        "",          # company_profile
        message,     # description
        "",          # requirements
        ""           # benefits
    ]

    combined_text = " ".join(fields)
    combined_text = re.sub(r"<[^>]+>", " ", combined_text)
    combined_text = re.sub(r"\s+", " ", combined_text)

    return combined_text.strip()


def predict_scam(message: str) -> float:
    """
    Return the model's estimated fraud score from 0 to 100.

    This is a model score, not a calibrated probability
    of real-world fraud.
    """
    if not isinstance(message, str) or not message.strip():
        raise ValueError("Message must not be empty.")

    model = load_model()
    cleaned_message = prepare_message(message)

    probabilities = model.predict_proba([cleaned_message])[0]

    fraud_index = list(model.classes_).index(1)
    fraud_score = float(probabilities[fraud_index]) * 100

    return round(fraud_score, 2)
