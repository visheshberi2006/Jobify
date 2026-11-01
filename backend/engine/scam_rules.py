
import re

SCAM_RULES = [
    {
        "name": "Upfront employment payment",
        "pattern": re.compile(
            r"\b(registration\s+(?:fee|charges?)|"
            r"security\s+deposit|joining\s+fee|"
            r"processing\s+fee|recruitment\s+fee|"
            r"training\s+deposit|refundable\s+deposit|"
            r"verification\s+fee|employee\s+id\s+fee|"
            r"pay\s+to\s+join|deposit\s+(?:rs\.?\s*)?\d+|"
            r"transfer\s+(?:rs\.?\s*)?\d+)\b",
            re.IGNORECASE
        ),
        "weight": 35,
        "category": "JOB_FEE_SCAM",
        "severity": "HIGH",
        "explanation": "The message mentions a registration, joining or employment-related payment."
    },
    {
        "name": "Task recharge or account funding",
        "pattern": re.compile(
            r"\b(recharge|top.?up|merchant\s+wallet|"
            r"unlock\s+tasks?|add\s+funds|"
            r"deposit\s+money|deposit\s+funds|"
            r"add\s+money|upgrade\s+(?:your\s+)?account|"
            r"unlock\s+premium\s+earning)\b",
            re.IGNORECASE
        ),
        "weight": 30,
        "category": "TASK_SCAM",
        "severity": "HIGH",
        "explanation": "The message refers to funding or recharging an account to access tasks or earnings."
    },
    {
        "name": "Unrealistic earnings",
        "pattern": re.compile(
            r"\b(earn|make)\s*(₹|rs\.?|inr)?\s*[\d,]+\s*(daily|per\s+day|a\s+day)\b",
            re.IGNORECASE
        ),
        "weight": 15,
        "category": "JOB_SCAM",
        "severity": "MEDIUM",
        "explanation": "The message advertises a daily earning amount that may warrant verification."
    },
    {
        "name": "Urgency or pressure",
        "pattern": re.compile(
            r"\b(limited\s+slots|act\s+now|immediately|"
            r"urgent|hurry|expires\s+soon|today\s+only)\b",
            re.IGNORECASE
        ),
        "weight": 10,
        "category": "SUSPICIOUS_RECRUITMENT",
        "severity": "LOW",
        "explanation": "The message uses urgency or pressure to encourage a quick decision."
    },
    {
        "name": "Sensitive information requested",
        "pattern": re.compile(
            r"\b(share|send|provide|enter|submit|"
            r"give|entering)\s+(?:your\s+)?"
            r"(?:internet\s+banking\s+credentials|"
            r"banking\s+credentials|bank\s+credentials|"
            r"bank\s+password|bank\s+pin|"
            r"upi\s+pin|banking\s+pin|"
            r"card\s+cvv|cvv|otp|password|"
            r"verification\s+otp|"
            r"account\s+password)\b|"
            r"\b(share\s+your\s+otp|"
            r"upi\s+pin|banking\s+pin|"
            r"bank\s+password|card\s+cvv)\b",
            re.IGNORECASE
        ),
        "weight": 40,
        "category": "CREDENTIAL_THEFT",
        "severity": "HIGH",
        "explanation": "The message appears to request sensitive banking or account credentials."
    },
    {
        "name": "Payment required to withdraw earnings",
        "pattern": re.compile(
            r"\b(pay|deposit|recharge|upgrade|"
            r"add\s+money|add\s+funds|transfer)\b"
            r".{0,120}\b(withdraw|withdrawal|"
            r"release\s+(?:your\s+)?earnings|"
            r"unlock\s+payment|receive\s+your\s+"
            r"(?:earnings|profits))\b|"
            r"\b(withdrawal|withdraw)\b"
            r".{0,100}\b(pay|deposit|recharge|"
            r"transfer|add\s+money)\b",
            re.IGNORECASE
        ),
        "weight": 35,
        "category": "TASK_SCAM",
        "severity": "HIGH",
        "explanation": "The message links payment or deposits to withdrawing earnings."
    },
    {
        "name": "Guaranteed income promise",
        "pattern": re.compile(
            r"\b(guaranteed\s+income|easy\s+money|"
            r"no\s+experience\s+required)\b",
            re.IGNORECASE
        ),
        "weight": 10,
        "category": "SUSPICIOUS_RECRUITMENT",
        "severity": "MEDIUM",
        "explanation": "The message makes unusually easy or guaranteed earning claims."
    },
    {
        "name": "Money required to activate employment",
        "pattern": re.compile(
            r"\b(pay|deposit|transfer|send)\b"
            r".{0,100}\b(activate|activation|"
            r"confirm|verification|joining|"
            r"employment|employee\s+account)\b",
            re.IGNORECASE
        ),
        "weight": 25,
        "category": "JOB_FEE_SCAM",
        "severity": "HIGH",
        "explanation": "The message connects a payment with activating or confirming employment."
    },
    {
        "name": "Refundable security or employment fee",
        "pattern": re.compile(
            r"\b(refundable\s+security\s+fee|"
            r"refundable\s+training\s+deposit|"
            r"security\s+fee|"
            r"employee\s+id\s+card\s+fee)\b",
            re.IGNORECASE
        ),
        "weight": 40,
        "category": "JOB_FEE_SCAM",
        "severity": "HIGH",
        "explanation": "The message describes an employment-related security or refundable fee."
    },
    {
        "name": "Payment for employee identification",
        "pattern": re.compile(
            r"\b(pay|send|deposit|transfer)\b"
            r".{0,60}\b(employee\s+id|"
            r"employee\s+card|id\s+card)\b",
            re.IGNORECASE
        ),
        "weight": 40,
        "category": "JOB_FEE_SCAM",
        "severity": "HIGH",
        "explanation": "The message connects payment with employee identification."
    },
    {
        "name": "Payment to upgrade task account",
        "pattern": re.compile(
            r"\b(product\s+rating|"
            r"rating\s+tasks?|"
            r"online\s+tasks?|"
            r"task\s+package)\b"
            r".{0,100}\b(upgrade|"
            r"add\s+funds|add\s+money|"
            r"deposit|recharge)\b",
            re.IGNORECASE
        ),
        "weight": 40,
        "category": "TASK_SCAM",
        "severity": "HIGH",
        "explanation": "The message connects task packages or ratings with additional payments."
    }
]


def analyze_rules(message: str) -> dict:
    indicators = []
    total_score = 0
    categories = []

    for rule in SCAM_RULES:
        matches = list(rule["pattern"].finditer(message))

        if matches:
            evidence = list(dict.fromkeys(
                match.group(0) for match in matches
            ))

            indicators.append({
                "name": rule["name"],
                "weight": rule["weight"],
                "category": rule["category"],
                "severity": rule["severity"],
                "explanation": rule["explanation"],
                "evidence": evidence
            })

            total_score += rule["weight"]
            categories.append(rule["category"])

    score = min(total_score, 100)

    if "CREDENTIAL_THEFT" in categories:
        category = "CREDENTIAL_THEFT"
    elif "TASK_SCAM" in categories:
        category = "TASK_SCAM"
    elif "JOB_FEE_SCAM" in categories:
        category = "JOB_FEE_SCAM"
    elif categories:
        category = categories[0]
    else:
        category = "NO_OBVIOUS_INDICATORS"

    return {
        "rule_score": score,
        "category": category,
        "indicators": indicators
    }
