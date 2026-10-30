
import json
import logging
import urllib.request
import urllib.error

from google import genai
from config import settings

logger = logging.getLogger(__name__)


def _generate_with_gemini(prompt: str, json_mode: bool = False):
    """Try Gemini as the primary AI provider."""

    if not settings.GEMINI_API_KEY:
        raise RuntimeError("Gemini API key is not configured.")

    client = genai.Client(
        api_key=settings.GEMINI_API_KEY
    )

    config = None

    if json_mode:
        config = {
            "response_mime_type": "application/json"
        }

    response = client.models.generate_content(
        model=settings.GEMINI_MODEL,
        contents=prompt,
        config=config
    )

    if not response.text:
        raise RuntimeError("Gemini returned an empty response.")

    return response.text


def _generate_with_openrouter(
    prompt: str,
    json_mode: bool = False
):
    """Use OpenRouter as the backup provider."""

    api_key = settings.OPENROUTER_API_KEY

    if not api_key:
        raise RuntimeError("OpenRouter API key is not configured.")

    payload = {
        "model": "openrouter/free",
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    if json_mode:
        payload["response_format"] = {
            "type": "json_object"
        }

    request = urllib.request.Request(
        url="https://openrouter.ai/api/v1/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost",
            "X-Title": "ScamShield AI"
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(
            request,
            timeout=45
        ) as response:
            result = json.loads(
                response.read().decode("utf-8")
            )

    except urllib.error.HTTPError as error:
        error_body = error.read().decode(
            "utf-8",
            errors="replace"
        )
        logger.error(
            "OpenRouter error %s: %s",
            error.code,
            error_body[:1000]
        )
        raise RuntimeError(
            f"OpenRouter request failed with HTTP {error.code}."
        ) from error

    choices = result.get("choices", [])

    if not choices:
        raise RuntimeError("OpenRouter returned no response.")

    content = choices[0].get("message", {}).get("content")

    if not isinstance(content, str) or not content.strip():
        raise RuntimeError("OpenRouter returned empty content.")

    return content


def generate_ai_response(
    prompt: str,
    json_mode: bool = False
) -> dict:
    """
    Try Gemini first.
    If Gemini fails, automatically try OpenRouter.
    """

    try:
        result = _generate_with_gemini(
            prompt,
            json_mode
        )

        return {
            "success": True,
            "provider": "gemini",
            "content": result
        }

    except Exception as error:
        logger.warning(
            "Gemini unavailable (%s). Switching to OpenRouter.",
            type(error).__name__
        )

    try:
        result = _generate_with_openrouter(
            prompt,
            json_mode
        )

        return {
            "success": True,
            "provider": "openrouter",
            "content": result
        }

    except Exception:
        logger.exception("OpenRouter fallback failed")

        return {
            "success": False,
            "provider": None,
            "content": (
                "All AI providers are currently unavailable."
            )
        }
