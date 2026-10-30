
from sklearn.metrics import classification_report, confusion_matrix

from engine.scam_rules import analyze_rules
from engine.risk_score import calculate_risk, get_risk_level
from engine.ml_predictor import predict_scam


# Format: (message, expected_label)
# 0 = Genuine, 1 = Fraudulent

TEST_CASES = {
    "LEGITIMATE": [
        ("We are hiring a Python developer. Apply through our official careers portal.", 0),
        ("Our company is recruiting a junior software engineer. Salary based on experience.", 0),
        ("Full-time accountant required. Submit your CV through our company website.", 0),
        ("Marketing executive vacancy. Two years of experience preferred. Apply online.", 0),
        ("We are looking for a registered nurse. Interviews will be conducted at our hospital.", 0),
        ("Software internship available for final-year students. Apply through the university placement portal.", 0),
        ("Customer support associate required. Monthly salary and benefits discussed during interview.", 0),
        ("Mechanical engineer required for our manufacturing facility. Relevant degree is mandatory.", 0),
        ("Data analyst vacancy. Candidates should have knowledge of SQL and Python.", 0),
        ("Teaching position available at our school. Send your resume to the official recruitment email.", 0),
    ],

    "REGISTRATION_FEE_SCAMS": [
        ("Pay Rs 999 registration fee to confirm your work from home job.", 1),
        ("Your job application is approved. Deposit Rs 1500 as a refundable security fee.", 1),
        ("Pay a processing fee before receiving your appointment letter.", 1),
        ("Registration charges are mandatory before joining our online data entry project.", 1),
        ("Transfer Rs 2000 for verification and job confirmation.", 1),
        ("You must pay a joining fee today to reserve your employment position.", 1),
        ("Send Rs 500 for your employee ID card before starting work.", 1),
        ("Pay the refundable training deposit to activate your employment account.", 1),
        ("Your interview is successful. Pay the recruitment fee to receive your offer letter.", 1),
        ("Limited vacancies. Pay the security deposit immediately to secure your job.", 1),
    ],

    "TASK_RECHARGE_SCAMS": [
        ("Like YouTube videos and earn Rs 5000 daily. Recharge your wallet to unlock tasks.", 1),
        ("Complete online tasks and deposit money to unlock premium earning levels.", 1),
        ("Your earnings are frozen. Recharge your merchant wallet to withdraw your money.", 1),
        ("Complete product rating tasks. Upgrade your account by adding funds.", 1),
        ("Earn commissions by liking products. Pay to unlock the next task package.", 1),
        ("Your withdrawal is pending. Deposit Rs 3000 to release your earnings.", 1),
        ("Join our Telegram task group. Recharge your account to receive higher-paying tasks.", 1),
        ("Complete simple tasks and deposit funds to unlock your daily commission.", 1),
        ("You need to add money to your account before withdrawing your task earnings.", 1),
        ("Pay the upgrade amount to unlock tasks and receive your accumulated profits.", 1),
    ],

    "CREDENTIAL_THEFT": [
        ("Share your OTP and banking PIN to verify your job application.", 1),
        ("Send your UPI PIN to our recruitment officer for salary activation.", 1),
        ("We need your bank password and OTP to process your employee registration.", 1),
        ("Provide your card CVV and OTP to receive your joining bonus.", 1),
        ("Send your internet banking credentials to verify your salary account.", 1),
        ("Our HR department requires your UPI PIN to release your first payment.", 1),
        ("Share your account password and verification OTP immediately.", 1),
        ("Enter your card CVV and banking OTP into this recruitment verification form.", 1),
        ("Send your OTP to confirm your identity and activate your employment account.", 1),
        ("Provide your banking PIN to complete salary verification.", 1),
    ],
}

AMBIGUOUS_CASES = [
    "Work from home opportunity. Flexible timings. Contact us for more details.",
    "Immediate hiring for data entry operators. Salary depends on performance.",
    "Remote internship available. Training will be provided to selected candidates.",
    "Earn additional income by completing online surveys in your free time.",
    "We are hiring delivery partners. Contact our recruitment team for details.",
    "Online marketing opportunity. Commission depends on monthly performance.",
    "Part-time job available. No experience required. Apply for more information.",
    "Work remotely and receive weekly payments after completing assigned projects.",
    "Freelance typing work available. Contact the recruiter for project details.",
    "Online customer support opportunity. Flexible hours and performance incentives.",
]


def analyse_message(message):
    rule_result = analyze_rules(message)
    ml_score = predict_scam(message)

    final_score = calculate_risk(
        rule_result["rule_score"],
        ml_score
    )

    return {
        "rule_score": rule_result["rule_score"],
        "ml_score": ml_score,
        "risk_score": final_score,
        "risk_level": get_risk_level(final_score),
        "indicators": rule_result["indicators"]
    }


def main():
    actual_labels = []
    predicted_labels = []

    false_positives = []
    false_negatives = []

    print("=" * 65)
    print("SCAMSHIELD AI - 50 MESSAGE EVALUATION")
    print("=" * 65)

    for group, cases in TEST_CASES.items():
        print(f"\n\n### {group} ###")

        for index, (message, expected) in enumerate(cases, 1):
            result = analyse_message(message)

            # Medium and high risk are treated as flagged.
            predicted = int(result["risk_score"] >= 30)

            actual_labels.append(expected)
            predicted_labels.append(predicted)

            if predicted != expected:
                if predicted == 1:
                    false_positives.append(message)
                else:
                    false_negatives.append(message)

            status = "PASS" if predicted == expected else "FAIL"

            print(f"\n{index}. {status}")
            print(f"Message: {message}")
            print(
                f"Rule: {result['rule_score']} | "
                f"ML: {result['ml_score']} | "
                f"Final: {result['risk_score']} | "
                f"Level: {result['risk_level']}"
            )

    print("\n\n" + "=" * 65)
    print("EVALUATION SUMMARY")
    print("=" * 65)

    print("\nClassification report:")
    print(
        classification_report(
            actual_labels,
            predicted_labels,
            labels=[0, 1],
            target_names=["Genuine", "Fraudulent"],
            zero_division=0
        )
    )

    print("Confusion matrix:")
    print(confusion_matrix(actual_labels, predicted_labels, labels=[0, 1]))

    print("\nFalse positives:", len(false_positives))
    for message in false_positives:
        print("-", message)

    print("\nFalse negatives:", len(false_negatives))
    for message in false_negatives:
        print("-", message)

    print("\n### AMBIGUOUS MESSAGES - MANUAL REVIEW ###")

    for index, message in enumerate(AMBIGUOUS_CASES, 1):
        result = analyse_message(message)

        print(
            f"\n{index}. Score: {result['risk_score']} "
            f"| Level: {result['risk_level']}"
        )
        print(message)

    print("\nEvaluation completed.")


LEGITIMATE_PAYMENT_CASES = [
    "The company will provide an employee ID card free of charge.",
    "All recruitment and registration fees are paid by the employer.",
    "Training is provided free of cost to selected candidates.",
    "Your salary will be deposited directly into your bank account.",
    "Employee verification is completed through the official HR portal.",
    "Our company provides free product rating training to employees.",
    "No payment is required to apply for this position.",
    "The employee benefits package includes medical insurance.",
    "Your identification card will be issued after joining.",
    "The company will reimburse approved business expenses."
]

if __name__ == "__main__":
    
    main()
    
    print("\n### LEGITIMATE PAYMENT / BENEFIT TESTS ###")

    for index, message in enumerate(LEGITIMATE_PAYMENT_CASES, 1):
        result = analyse_message(message)

        print(
            f"\n{index}. Score: {result['risk_score']} "
            f"| Level: {result['risk_level']}"
        )
        print(message)

