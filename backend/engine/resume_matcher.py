
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def clean_text(text: str) -> str:
    """Normalize text before comparison."""
    text = text.lower()
    text = re.sub(r"[^a-z0-9+#.\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def calculate_resume_match(
    resume_text: str,
    job_description: str
) -> dict:
    """Calculate textual similarity between a resume and job description."""

    if not resume_text or not resume_text.strip():
        raise ValueError("Resume text cannot be empty.")

    if not job_description or not job_description.strip():
        raise ValueError("Job description cannot be empty.")

    resume_clean = clean_text(resume_text)
    job_clean = clean_text(job_description)

    vectorizer = TfidfVectorizer(
        stop_words="english",
        ngram_range=(1, 2)
    )

    tfidf_matrix = vectorizer.fit_transform(
        [resume_clean, job_clean]
    )

    similarity = cosine_similarity(
        tfidf_matrix[0:1],
        tfidf_matrix[1:2]
    )[0][0]

    match_score = round(float(similarity) * 100, 2)

    return {
        "match_score": match_score,
        "score_type": "textual_similarity",
        "message": "This score measures text similarity, not hiring probability."
    }
