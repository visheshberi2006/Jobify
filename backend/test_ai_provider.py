
from engine.ai_provider import _generate_with_openrouter

prompt = """
Return exactly this JSON:
{"status": "working", "project": "ScamShield AI"}
"""

try:
    response = _generate_with_openrouter(
        prompt,
        json_mode=True
    )

    print("\nOPENROUTER TEST")
    print("---------------------------")
    print("Provider: OpenRouter")
    print("Response:", response)

except Exception as error:
    print("\nOPENROUTER TEST FAILED")
    print(str(error))
