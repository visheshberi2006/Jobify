"""
Train Jobify's scam detector from backend/dataset/fake_job_postings.csv.

Run from the backend directory:
    python training/train_model.py

The script evaluates on a stratified 20% holdout, then fits the final
pipeline on all rows and saves models/jobify_scam_detector.joblib.
"""
from pathlib import Path
import json
import re
import joblib
import pandas as pd
import sklearn
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    classification_report, confusion_matrix, roc_auc_score,
    average_precision_score
)
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline

BACKEND_DIR = Path(__file__).resolve().parents[1]
DATASET_PATH = BACKEND_DIR / "dataset" / "fake_job_postings.csv"
MODEL_DIR = BACKEND_DIR / "models"
MODEL_PATH = MODEL_DIR / "jobify_scam_detector.joblib"
METRICS_PATH = MODEL_DIR / "evaluation_metrics.json"

TEXT_COLUMNS = [
    "title", "location", "department", "company_profile",
    "description", "requirements", "benefits"
]

def build_pipeline():
    return Pipeline([
        ("tfidf", TfidfVectorizer(
            max_features=40000,
            ngram_range=(1, 2),
            min_df=2,
            max_df=0.98,
            sublinear_tf=True,
            strip_accents="unicode"
        )),
        ("classifier", LogisticRegression(
            max_iter=1000,
            class_weight="balanced",
            C=2.0
        ))
    ])

def main():
    if not DATASET_PATH.exists():
        raise FileNotFoundError(
            f"Dataset not found: {DATASET_PATH}\\n"
            "Place fake_job_postings.csv in backend/dataset/"
        )

    df = pd.read_csv(DATASET_PATH)
    required = set(TEXT_COLUMNS + ["fraudulent"])
    missing = required.difference(df.columns)
    if missing:
        raise ValueError(f"Dataset is missing columns: {sorted(missing)}")

    df = df.dropna(subset=["fraudulent"]).copy()
    df["fraudulent"] = pd.to_numeric(df["fraudulent"], errors="raise").astype(int)
    if not set(df["fraudulent"].unique()).issubset({0, 1}):
        raise ValueError("The fraudulent column must contain only 0 and 1.")

    X = (
        df[TEXT_COLUMNS].fillna("").astype(str).agg(" ".join, axis=1)
        .str.replace(r"<[^>]+>", " ", regex=True)
        .str.replace(r"\\s+", " ", regex=True)
        .str.strip()
    )
    y = df["fraudulent"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )

    evaluation_model = build_pipeline()
    evaluation_model.fit(X_train, y_train)
    predictions = evaluation_model.predict(X_test)
    probabilities = evaluation_model.predict_proba(X_test)[:, 1]
    report = classification_report(
        y_test, predictions, output_dict=True, zero_division=0
    )

    metrics = {
        "dataset_rows": int(len(df)),
        "train_rows": int(len(X_train)),
        "test_rows": int(len(X_test)),
        "class_distribution": {
            str(int(k)): int(v) for k, v in y.value_counts().sort_index().items()
        },
        "fraud_class_precision": report["1"]["precision"],
        "fraud_class_recall": report["1"]["recall"],
        "fraud_class_f1": report["1"]["f1-score"],
        "accuracy": report["accuracy"],
        "roc_auc": roc_auc_score(y_test, probabilities),
        "average_precision": average_precision_score(y_test, probabilities),
        "confusion_matrix_labels_0_1": confusion_matrix(
            y_test, predictions
        ).tolist(),
        "sklearn_version": sklearn.__version__,
        "random_state": 42
    }

    # Refit after evaluation so the deployed model can use all available rows.
    final_model = build_pipeline()
    final_model.fit(X, y)

    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(final_model, MODEL_PATH, compress=3)
    METRICS_PATH.write_text(json.dumps(metrics, indent=2), encoding="utf-8")

    print("\\n=== Jobify model evaluation (held-out test set) ===")
    print(classification_report(y_test, predictions, digits=4, zero_division=0))
    print("Confusion matrix [[TN, FP], [FN, TP]]:")
    print(confusion_matrix(y_test, predictions))
    print(f"ROC-AUC: {metrics['roc_auc']:.4f}")
    print(f"Average precision: {metrics['average_precision']:.4f}")
    print(f"\\nFinal model trained on {len(X)} rows.")
    print(f"Model saved to: {MODEL_PATH}")
    print(f"Metrics saved to: {METRICS_PATH}")

if __name__ == "__main__":
    main()
