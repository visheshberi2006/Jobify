
from engine.ai_provider import generate_ai_response

prompt = """
Return exactly:
ScamShield AI fallback is working.
"""

result = generate_ai_response(prompt)

print("\nPROVIDER FALLBACK TEST")
print("---------------------------")
print("Success:", result["success"])
print("Provider used:", result["provider"])
print("Response:", result["content"])
