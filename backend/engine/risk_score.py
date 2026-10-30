
# def calculate_risk(rule_score: float, ml_score: float = None) -> float:
#     """
#     Combines rule-based and ML scores.
#     Both scores must be between 0 and 100.
#     """

#     if not 0 <= rule_score <= 100:
#         raise ValueError("Rule score must be between 0 and 100.")

#     if ml_score is None:
#         return round(rule_score, 2)

#     if not 0 <= ml_score <= 100:
#         raise ValueError("ML score must be between 0 and 100.")

#     combined = (0.6 * rule_score) + (0.4 * ml_score)

#     return round(combined, 2)


# def get_risk_level(score: float) -> str:
#     if not 0 <= score <= 100:
#         raise ValueError("Risk score must be between 0 and 100.")

#     if score >= 60:
#         return "HIGH"
#     elif score >= 30:
#         return "MEDIUM"

#     return "LOW"
def calculate_risk(rule_score: float, ml_score: float = None) -> float:
    if not 0 <= rule_score <= 100:
        raise ValueError("Rule score must be between 0 and 100.")

    if ml_score is None:
        return round(rule_score, 2)

    if not 0 <= ml_score <= 100:
        raise ValueError("ML score must be between 0 and 100.")

    combined = (0.6 * rule_score) + (0.4 * ml_score)
    return round(combined, 2)


def get_risk_level(score: float) -> str:
    if not 0 <= score <= 100:
        raise ValueError("Risk score must be between 0 and 100.")

    if score >= 60:
        return "HIGH"
    elif score >= 30:
        return "MEDIUM"

    return "LOW"