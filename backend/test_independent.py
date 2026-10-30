
# Independent evaluation dataset for ScamShield AI
# Keep these examples separate from test_evaluation.py.

TEST_CASES = [
    # 1. Genuine job offers (expected label: 0)
    {"category": "GENUINE", "label": 0, "text": "We are hiring a junior Python developer to work on our internal software projects. Applicants should know Python, SQL and Git."},
    {"category": "GENUINE", "label": 0, "text": "Our company is looking for a customer support executive. The role involves answering customer queries and maintaining service records."},
    {"category": "GENUINE", "label": 0, "text": "We invite applications for a software engineering internship. Selected candidates will work with our development team for three months."},
    {"category": "GENUINE", "label": 0, "text": "A full-time accountant is required. Candidates should have knowledge of GST, Excel and basic bookkeeping."},
    {"category": "GENUINE", "label": 0, "text": "We are recruiting a graphic designer with experience in Photoshop and Illustrator. Please submit your portfolio."},
    {"category": "GENUINE", "label": 0, "text": "The selected employee will receive a monthly salary, paid leave and health insurance according to company policy."},
    {"category": "GENUINE", "label": 0, "text": "Candidates can apply through our official careers portal. Shortlisted applicants will be contacted by the HR department."},
    {"category": "GENUINE", "label": 0, "text": "We are seeking a data analyst familiar with SQL, Python and Power BI. The position is based in Chandigarh."},
    {"category": "GENUINE", "label": 0, "text": "The company provides free onboarding and job-related training to all newly selected employees."},
    {"category": "GENUINE", "label": 0, "text": "Please attend the scheduled interview with your updated resume and academic certificates."},
    {"category": "GENUINE", "label": 0, "text": "A remote technical writer is required to prepare documentation for our software products. Previous writing samples are welcome."},
    {"category": "GENUINE", "label": 0, "text": "Applicants must have a bachelor's degree and at least one year of experience in sales."},
    {"category": "GENUINE", "label": 0, "text": "Our summer internship program includes mentorship, weekly assignments and a completion certificate."},
    {"category": "GENUINE", "label": 0, "text": "The position offers a fixed monthly salary and performance-based incentives. Salary details will be discussed during the interview."},
    {"category": "GENUINE", "label": 0, "text": "We are hiring a network administrator to maintain office servers, troubleshoot connectivity and manage system backups."},
    {"category": "GENUINE", "label": 0, "text": "Interested candidates should email their resume to the recruitment address listed on our official website."},
    {"category": "GENUINE", "label": 0, "text": "The employer will issue an employee identity card after the joining formalities are completed."},
    {"category": "GENUINE", "label": 0, "text": "This part-time tutoring role requires teaching mathematics to school students for two hours each evening."},
    {"category": "GENUINE", "label": 0, "text": "Employees may work remotely after completing the standard interview and background verification process."},
    {"category": "GENUINE", "label": 0, "text": "The company reimburses approved travel expenses after employees submit receipts through the finance portal."},

    # 2. Registration and upfront-fee scams (expected label: 1)
    {"category": "JOB_FEE_SCAM", "label": 1, "text": "Congratulations, you have been selected. Pay a registration fee of Rs 1500 to confirm your job."},
    {"category": "JOB_FEE_SCAM", "label": 1, "text": "Your application is approved. Transfer Rs 800 for recruitment processing before receiving your appointment letter."},
    {"category": "JOB_FEE_SCAM", "label": 1, "text": "A refundable security deposit of Rs 3000 is required before you can start working from home."},
    {"category": "JOB_FEE_SCAM", "label": 1, "text": "Pay Rs 500 for your employee identity card. Your job activation will happen after payment."},
    {"category": "JOB_FEE_SCAM", "label": 1, "text": "Send the training deposit today to reserve your position in our guaranteed placement program."},
    {"category": "JOB_FEE_SCAM", "label": 1, "text": "You must pay a verification charge before HR can release your joining documents."},
    {"category": "JOB_FEE_SCAM", "label": 1, "text": "Deposit Rs 1200 into the company account to activate your employment profile."},
    {"category": "JOB_FEE_SCAM", "label": 1, "text": "Your interview is successful. Pay the refundable joining fee immediately to secure the vacancy."},
    {"category": "JOB_FEE_SCAM", "label": 1, "text": "The company requires candidates to pay a document processing fee before issuing offer letters."},
    {"category": "JOB_FEE_SCAM", "label": 1, "text": "Transfer money for background verification and your appointment will be confirmed."},
    {"category": "JOB_FEE_SCAM", "label": 1, "text": "Pay Rs 999 for mandatory recruitment registration. No payment means no job."},
    {"category": "JOB_FEE_SCAM", "label": 1, "text": "Your employee account will be activated once you deposit the refundable employment security fee."},
    {"category": "JOB_FEE_SCAM", "label": 1, "text": "We need an advance payment for your company ID card before you can join."},
    {"category": "JOB_FEE_SCAM", "label": 1, "text": "Send Rs 2000 as a training and certification deposit to receive your work allocation."},
    {"category": "JOB_FEE_SCAM", "label": 1, "text": "Pay the placement confirmation charge today. Only paid candidates will receive an offer letter."},

    # 3. Task and recharge scams (expected label: 1)
    {"category": "TASK_SCAM", "label": 1, "text": "Earn Rs 4000 daily by rating products online. Recharge your task wallet to unlock the next level."},
    {"category": "TASK_SCAM", "label": 1, "text": "Complete five free tasks and then deposit Rs 1000 to unlock premium tasks with higher commissions."},
    {"category": "TASK_SCAM", "label": 1, "text": "Your withdrawal is pending. Add funds to your merchant account to release your earnings."},
    {"category": "TASK_SCAM", "label": 1, "text": "You have earned Rs 2500. Upgrade your task package by depositing money to withdraw your balance."},
    {"category": "TASK_SCAM", "label": 1, "text": "Like videos and subscribe to channels for payment. Recharge your account to receive more tasks."},
    {"category": "TASK_SCAM", "label": 1, "text": "Your account is frozen. Transfer Rs 1500 to restore task access and withdraw profits."},
    {"category": "TASK_SCAM", "label": 1, "text": "Complete online product orders and add money to your wallet to unlock higher commission tasks."},
    {"category": "TASK_SCAM", "label": 1, "text": "You must upgrade your task account before the withdrawal function becomes available."},
    {"category": "TASK_SCAM", "label": 1, "text": "Recharge Rs 2000 now to complete the VIP task package and receive your accumulated earnings."},
    {"category": "TASK_SCAM", "label": 1, "text": "Your task commission is ready. Pay a release deposit before withdrawing it."},
    {"category": "TASK_SCAM", "label": 1, "text": "Join our Telegram group, complete rating tasks and deposit funds to unlock your daily task quota."},
    {"category": "TASK_SCAM", "label": 1, "text": "The system requires an additional top-up before you can receive your task rewards."},
    {"category": "TASK_SCAM", "label": 1, "text": "Make a small recharge to activate your account and access the next batch of paid tasks."},
    {"category": "TASK_SCAM", "label": 1, "text": "Your earnings are locked. Add Rs 500 to your wallet to process the withdrawal."},
    {"category": "TASK_SCAM", "label": 1, "text": "Complete product reviews for commission. Higher earning tasks require an account upgrade payment."},

    # 4. Credential theft scams (expected label: 1)
    {"category": "CREDENTIAL_THEFT", "label": 1, "text": "Send your bank account password and OTP to our recruiter to complete salary registration."},
    {"category": "CREDENTIAL_THEFT", "label": 1, "text": "Share your UPI PIN with the HR executive to verify your identity for the job."},
    {"category": "CREDENTIAL_THEFT", "label": 1, "text": "Enter your card number, CVV and OTP on this form to receive your joining bonus."},
    {"category": "CREDENTIAL_THEFT", "label": 1, "text": "Our recruiter needs your internet banking credentials to process your first salary."},
    {"category": "CREDENTIAL_THEFT", "label": 1, "text": "Reply with the verification OTP sent to your phone so we can activate your employee account."},
    {"category": "CREDENTIAL_THEFT", "label": 1, "text": "Provide your debit card PIN to confirm the bank account linked to your job application."},
    {"category": "CREDENTIAL_THEFT", "label": 1, "text": "Share your banking password with the payroll team for salary verification."},
    {"category": "CREDENTIAL_THEFT", "label": 1, "text": "Send the OTP you received to complete your recruitment verification."},
    {"category": "CREDENTIAL_THEFT", "label": 1, "text": "Enter your UPI PIN and card CVV to receive the work from home payment."},
    {"category": "CREDENTIAL_THEFT", "label": 1, "text": "The HR department requests your bank password and one-time password to release your salary."},
    {"category": "CREDENTIAL_THEFT", "label": 1, "text": "Give the recruiter your account login credentials to finish employee onboarding."},
    {"category": "CREDENTIAL_THEFT", "label": 1, "text": "Submit your card security code and OTP through this chat for payroll activation."},

    # 5. Ambiguous cases (no binary fraud label; keep separate)
    {"category": "AMBIGUOUS", "label": None, "text": "Remote data entry work available with flexible timings. Salary depends on completed assignments."},
    {"category": "AMBIGUOUS", "label": None, "text": "Earn extra income through online surveys. Payment is based on the number of completed surveys."},
    {"category": "AMBIGUOUS", "label": None, "text": "No experience required for our part-time work from home opportunity. Apply to learn more."},
    {"category": "AMBIGUOUS", "label": None, "text": "We offer weekly payments for freelance typing work. Contact our coordinator for details."},
    {"category": "AMBIGUOUS", "label": None, "text": "Online marketing role with commission based on sales performance. Flexible working hours."},
    {"category": "AMBIGUOUS", "label": None, "text": "Immediate openings for data entry operators. Salary will be discussed after reviewing your profile."},
    {"category": "AMBIGUOUS", "label": None, "text": "Work remotely and earn based on your productivity. Training details will be shared after application."},
    {"category": "AMBIGUOUS", "label": None, "text": "A delivery partner role is available with incentives for meeting daily targets."},
    {"category": "AMBIGUOUS", "label": None, "text": "Freelance content writing opportunity with payment per approved article."},
    {"category": "AMBIGUOUS", "label": None, "text": "Join our online customer support team. Flexible shifts and performance bonuses are available."},
]

if __name__ == "__main__":
    from collections import Counter
    from sklearn.metrics import classification_report, confusion_matrix

    from engine.scam_rules import analyze_rules
    from engine.ml_predictor import predict_scam
    from engine.risk_score import calculate_risk, get_risk_level

    labelled_cases = [case for case in TEST_CASES if case["label"] is not None]
    ambiguous_cases = [case for case in TEST_CASES if case["label"] is None]

    actual = []
    rules_predictions = []
    ml_predictions = []
    combined_predictions = []

    print("Total test cases:", len(TEST_CASES))
    print("Category counts:", Counter(case["category"] for case in TEST_CASES))
    print("\nRunning independent evaluation...\n")

    for case in labelled_cases:
        message = case["text"]

        rule_result = analyze_rules(message)
        ml_score = predict_scam(message)

        rule_score = rule_result["rule_score"]
        combined_score = calculate_risk(rule_score, ml_score)

        actual.append(case["label"])
        rules_predictions.append(int(rule_score >= 30))
        ml_predictions.append(int(ml_score >= 30))
        combined_predictions.append(int(combined_score >= 30))
        if case["label"] == 1 and combined_score < 30:
            print("\nMISSED SCAM:")
            print("Category:", case["category"])
            print("Text:", message)
            print("Rule score:", rule_score)
            print("ML score:", ml_score)
            print("Combined score:", combined_score)

    print("RULES-ONLY RESULTS")
    print(classification_report(actual, rules_predictions,
                                target_names=["Genuine", "Fraudulent"],
                                zero_division=0))
    print("Confusion matrix:")
    print(confusion_matrix(actual, rules_predictions))

    print("\nML-ONLY RESULTS")
    print(classification_report(actual, ml_predictions,
                                target_names=["Genuine", "Fraudulent"],
                                zero_division=0))
    print("Confusion matrix:")
    print(confusion_matrix(actual, ml_predictions))

    print("\nCOMBINED RESULTS")
    print(classification_report(actual, combined_predictions,
                                target_names=["Genuine", "Fraudulent"],
                                zero_division=0))
    print("Confusion matrix:")
    print(confusion_matrix(actual, combined_predictions))

    print("\nAMBIGUOUS CASES")
    print("\nFALSE POSITIVES:")
    for case in labelled_cases:
        if case["label"] == 0:
            rule_result = analyze_rules(case["text"])
            ml_score = predict_scam(case["text"])
            combined_score = calculate_risk(
                rule_result["rule_score"], ml_score
            )

            if combined_score >= 30:
                print("\nText:", case["text"])
                print("Rule score:", rule_result["rule_score"])
                print("ML score:", ml_score)
                print("Combined score:", combined_score)
    for case in ambiguous_cases:
        rule_result = analyze_rules(case["text"])
        ml_score = predict_scam(case["text"])
        combined_score = calculate_risk(rule_result["rule_score"], ml_score)

        print(
            f'{get_risk_level(combined_score):6} | '
            f'{combined_score:6.2f} | {case["text"]}'
        )
