
from engine.gemini_analyzer import analyze_with_gemini

message = """
Earn Rs 5000 daily.
Pay Rs 999 registration fee.
Recharge your account to unlock premium tasks.
"""

local_result = {
    "rule_score": 75,
    "risk_level": "HIGH",
    "category": "TASK_SCAM"
}

result = analyze_with_gemini(message, local_result)

print("\n--- SCAMSHIELD GEMINI TEST ---")
print("Gemini enabled:", result["enabled"])
print("Explanation:", result["explanation"])
