from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

FAQS = [
    ("admission", "For admission, review the current prospectus, eligibility, required documents, deadline, and official application instructions. Confirm programme details with the admissions office."),
    ("course", "Course details such as departments, syllabus, credits, electives, duration, and programme outcomes are published by each academic department."),
    ("fee", "Use the official student portal or accounts office for current tuition, examination, hostel, transport, payment deadlines, refunds, and late-fee information."),
    ("attendance", "Attendance requirements are governed by the latest academic regulations. Check the student portal and submit approved medical or leave documents promptly."),
    ("exam", "Check the examination cell notice and student portal for registration, timetable, hall ticket, seating plan, permitted materials, and result dates."),
    ("result", "Results, marksheets, transcripts, revaluation, and supplementary exam notices are handled by the examination cell through the official portal."),
    ("timetable", "Check the student portal or department notice board for the latest class timetable, room allocation, academic calendar, holidays, and changes."),
    ("library", "Check the library portal for current opening hours, borrowing limits, renewal rules, due dates, fines, online databases, and reading-room access."),
    ("hostel", "Hostel applications normally require the prescribed form, student ID or admission proof, identity documents, photographs, and fee payment. Check the hostel office for room and mess rules."),
    ("transport", "Ask the transport office for current bus routes, stops, timings, passes, fees, holiday schedules, safety rules, and parking arrangements."),
    ("scholarship", "Check the scholarship cell for merit, income, category, disability, sport, and government schemes, including eligibility, documents, deadlines, and renewal rules."),
    ("bonafide", "The student services or registrar office can issue bonafide, student ID, enrollment, character, transfer, migration, transcript, and duplicate-document requests."),
    ("placement", "The placement and career cell publishes eligibility, company drives, internships, registration deadlines, resume guidance, tests, interviews, and offer procedures."),
    ("club", "Student clubs, societies, sports, cultural events, competitions, and student council activities are announced by the student affairs office."),
    ("medical", "For urgent danger or a medical emergency, contact local emergency services and campus security immediately. For routine support, use the campus clinic or counsellor."),
    ("wifi", "For Wi-Fi, student email, LMS, portal, password, or computer-lab access, use the official IT helpdesk. Never share your password or one-time password."),
    ("grievance", "Use the official grievance, anti-ragging, equal opportunity, or student welfare channel. Keep the report factual, include dates and evidence, and request a reference number."),
]


def generate_answer(question):
    q = " ".join(question.lower().split())
    matching_faqs = [(keyword, answer) for keyword, answer in FAQS if keyword in q]

    if matching_faqs:
        return max(matching_faqs, key=lambda item: len(item[0]))[1]

    return "I could not find this in the college knowledge base. Try asking about admissions, courses, fees, attendance, exams, results, timetable, library, hostel, transport, scholarships, documents, placements, student life, IT support, health, or grievances."

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question", "")

    return jsonify({
        "answer": generate_answer(question)
    })

if __name__ == "__main__":
    app.run(port=8000, debug=True)
