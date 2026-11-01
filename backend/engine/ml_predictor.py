
import logging
import importlib
import re
from pathlib import Path

logger = logging.getLogger(__name__)

# Locate the model relative to the backend directory
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "jobify_scam_detector.joblib"
_model = None


def load_model():
    global _model

    if _model is None:
        if not MODEL_PATH.exists():
            raise FileNotFoundError(
                f"Scam detection model not found: {MODEL_PATH}"
            )

        try:
            joblib = importlib.import_module("joblib")
        except ModuleNotFoundError as exc:
            if exc.name == "joblib":
                raise RuntimeError(
                    "The scam detection model requires the 'joblib' package."
                ) from exc
            raise

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

def explain_scam_prediction(message: str, top_n: int = 8) -> dict:
    """
    Explain the Logistic Regression prediction using
    TF-IDF feature contributions.

    Contributions are additive contributions to the
    classifier's fraud-vs-legitimate decision score.
    They are not fraud probabilities.
    """
    import numpy as np

    if not isinstance(message, str) or not message.strip():
        raise ValueError("Message must not be empty.")

    if not isinstance(top_n, int) or top_n < 1:
        raise ValueError("top_n must be a positive integer.")

    model = load_model()

    vectorizer = model.named_steps["tfidf"]
    classifier = model.named_steps["classifier"]

    cleaned_message = prepare_message(message)
    features = vectorizer.transform([cleaned_message])

    # Locate the coefficient for the fraudulent class.
    fraud_index = list(classifier.classes_).index(1)
    coefficients = (
    classifier.coef_[0]
    if len(classifier.classes_) == 2
    else classifier.coef_[fraud_index]
)

    # Each feature's contribution to the fraud decision score.
    contributions = features.multiply(coefficients).toarray()[0]

    feature_names = vectorizer.get_feature_names_out()

    # Positive = pushes toward fraud.
    # Negative = pushes toward legitimate.
    fraud_indices = np.where(contributions > 0)[0]
    legitimate_indices = np.where(contributions < 0)[0]

    fraud_indices = sorted(
        fraud_indices,
        key=lambda i: contributions[i],
        reverse=True
    )[:top_n]

    legitimate_indices = sorted(
        legitimate_indices,
        key=lambda i: contributions[i]
    )[:top_n]

    fraud_contributors = [
        {
            "feature": str(feature_names[i]),
            "contribution": round(float(contributions[i]), 6)
        }
        for i in fraud_indices
    ]

    legitimate_contributors = [
        {
            "feature": str(feature_names[i]),
            "contribution": round(float(contributions[i]), 6)
        }
        for i in legitimate_indices
    ]

    return {
        "fraud_contributors": fraud_contributors,
        "legitimate_contributors": legitimate_contributors,
        "explanation_method": "TF-IDF feature contributions with Logistic Regression",
        "interpretation": (
            "Positive contributions push the classifier toward fraud; "
            "negative contributions push it toward legitimate. "
            "These are model decision-score contributions, not probabilities "
            "or proof of fraud."
        )
    }
