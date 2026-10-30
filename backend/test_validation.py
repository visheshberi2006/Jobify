
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

# Test 1: Normal message
response = client.post(
    "/api/analyze",
    json={"text": "We are hiring a Python developer."}
)
print("Normal message:", response.status_code)

# Test 2: Exactly 5000 characters
response = client.post(
    "/api/analyze",
    json={"text": "A" * 5000}
)
print("5000 characters:", response.status_code)

# Test 3: 5001 characters
response = client.post(
    "/api/analyze",
    json={"text": "A" * 5001}
)
print("5001 characters:", response.status_code)

# Test 4: Whitespace only
response = client.post(
    "/api/analyze",
    json={"text": " " * 20}
)
print("Whitespace:", response.status_code)
