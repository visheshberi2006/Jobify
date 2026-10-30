
from engine.ml_predictor import predict_scam

messages = [
    "We are hiring a Python developer. Apply through our official company careers portal.",
    "Earn Rs 5000 daily by liking YouTube videos. Contact us on Telegram.",
    "Pay a registration fee of Rs 999 and recharge your wallet to unlock tasks and withdraw earnings."
]

for message in messages:
    score = predict_scam(message)
    print(f"\nMessage: {message}")
    print(f"ML fraud score: {score}/100")
