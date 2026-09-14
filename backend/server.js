const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const faqs = [
  {
    category: "General",
    keywords: ["hello", "hi", "hey", "what can you do"],
    answer: "I can help with admissions, courses, fees, attendance, exams, results, timetable, library, hostel, transport, scholarships, placements, student services, campus facilities, and college notices. Ask a specific question or name a topic."
  },
  {
    category: "Admissions",
    keywords: ["admission", "apply", "application", "eligibility", "entrance", "enrollment", "enrolment", "registration"],
    answer: "For admission, review the current prospectus and complete the official application before the published deadline. Keep your identity proof, recent photographs, qualifying exam marksheets, transfer or migration certificate, category certificate if applicable, and payment receipt ready. Eligibility, entrance requirements, dates, and available seats vary by programme, so confirm them with the admissions office."
  },
  {
    category: "Courses",
    keywords: ["course", "program", "programme", "department", "branch", "subject", "curriculum", "syllabus", "major", "minor"],
    answer: "Course details such as departments, eligibility, syllabus, credits, electives, duration, and programme outcomes are published by each academic department. Check the latest department prospectus or speak with the department office before selecting a programme."
  },
  {
    category: "Fees",
    keywords: ["fee", "fees", "tuition", "payment", "refund", "installment", "installment", "financial"],
    answer: "Use the official student portal or accounts office for the current tuition, examination, hostel, transport, and other charges. Save the payment receipt. Ask the accounts office about payment deadlines, instalments, refunds, late fees, and correction of a failed transaction."
  },
  {
    category: "Attendance",
    keywords: ["attendance", "absent", "absence", "medical leave", "shortage", "leave"],
    answer: "Attendance requirements are governed by the latest academic regulations and may differ by programme. Check your attendance on the student portal, inform your faculty about planned absence, and submit approved medical or leave documents promptly. Contact your department if you see an incorrect attendance record."
  },
  {
    category: "Examinations",
    keywords: ["exam", "examination", "semester exam", "midterm", "internal", "hall ticket", "admit card", "backlog", "supplementary"],
    answer: "Check the examination cell notice board and student portal for the timetable, registration deadline, fee, seating plan, hall ticket, permitted materials, and result date. Carry your college ID and hall ticket. For a clash, missed paper, backlog, or supplementary exam, contact the examination cell immediately."
  },
  {
    category: "Results",
    keywords: ["result", "results", "marks", "grade", "transcript", "revaluation", "rechecking", "remarking", "back paper"],
    answer: "Results, marksheets, transcripts, revaluation, and supplementary exam notices are handled by the examination cell through the official portal. Verify your enrollment details, download the result, and follow the published deadline if you need revaluation or correction."
  },
  {
    category: "Timetable",
    keywords: ["timetable", "time table", "schedule", "class timing", "room", "lecture", "academic calendar", "holiday"],
    answer: "The latest class timetable, room allocation, academic calendar, holidays, and changes should be checked on the student portal or department notice board. Timetables can change, so check before attending an important class or examination."
  },
  {
    category: "Library",
    keywords: ["library", "book", "journal", "database", "borrow", "return", "renew", "fine", "reading room"],
    answer: "The library provides textbooks, reference books, journals, online databases, borrowing, renewals, and a reading room. Check the library portal or notice for current opening hours, borrowing limits, renewal rules, due dates, fines, holidays, and access credentials."
  },
  {
    category: "Hostel",
    keywords: ["hostel", "accommodation", "dorm", "room", "warden", "mess", "hostel admission"],
    answer: "Hostel applications normally require the prescribed form, student ID or admission proof, identity documents, photographs, and fee payment. The hostel office publishes room allocation, check-in dates, mess details, visitor rules, quiet hours, maintenance contacts, leave rules, and refund conditions."
  },
  {
    category: "Transport",
    keywords: ["transport", "bus", "route", "bus pass", "pickup", "drop", "shuttle", "parking"],
    answer: "Ask the transport office for current bus routes, stops, timings, passes, fees, holiday schedules, safety rules, and parking arrangements. Carry a valid pass and report a route or safety issue to the transport coordinator."
  },
  {
    category: "Scholarships",
    keywords: ["scholarship", "financial aid", "grant", "fellowship", "fee waiver", "bursary", "concession"],
    answer: "Scholarships and fee support may depend on merit, income, category, disability, sport, or government schemes. Check the scholarship cell for eligibility, required certificates, application dates, renewal rules, bank details, and verification requirements."
  },
  {
    category: "Documents",
    keywords: ["document", "certificate", "bonafide", "bonafide certificate", "migration", "transfer certificate", "id card", "identity card", "duplicate"],
    answer: "The student services or registrar office can issue bonafide, student ID, enrollment, character, transfer, migration, transcript, and duplicate-document requests. Carry your enrollment number, identity proof, photographs, application, and payment receipt where required."
  },
  {
    category: "Placements",
    keywords: ["placement", "job", "internship", "career", "recruitment", "company", "resume", "interview", "alumni"],
    answer: "The placement and career cell publishes eligibility, company drives, internship opportunities, registration deadlines, resumes, aptitude tests, interviews, and offer procedures. Keep your CV, academic records, ID, and verified contact details updated on the placement portal."
  },
  {
    category: "Student Life",
    keywords: ["club", "society", "event", "festival", "sports", "gym", "activity", "student council", "competition"],
    answer: "Student clubs, societies, sports, cultural events, competitions, and student council activities are announced by the student affairs office. Check eligibility, registration dates, venue, permissions, and equipment requirements before participating."
  },
  {
    category: "Health and Safety",
    keywords: ["medical", "health", "doctor", "clinic", "counselling", "counseling", "emergency", "security", "accident", "safety"],
    answer: "For urgent danger or a medical emergency, contact local emergency services and campus security immediately. For routine support, use the campus clinic, counsellor, student welfare office, or grievance channel listed in your college handbook. Do not wait for the chatbot during an emergency."
  },
  {
    category: "Technology",
    keywords: ["wifi", " wi-fi", "portal", "password", "email", "lms", "online class", "computer", "it support", "login"],
    answer: "For Wi-Fi, student email, LMS, portal, password, or computer-lab access, use the official IT helpdesk. Never share your password or one-time password. Include your enrollment number, device, error message, and screenshot when raising a support request."
  },
  {
    category: "Grievances",
    keywords: ["complaint", "grievance", "harassment", "ragging", "discrimination", "issue", "feedback", "appeal"],
    answer: "Use the official grievance, anti-ragging, equal opportunity, or student welfare channel for a complaint. Keep the report factual, include dates and evidence, and request a reference number. For immediate safety concerns, contact campus security or emergency services first."
  },
  {
    category: "Contact",
    keywords: ["contact", "phone number", "email address", "office", "helpdesk", "principal", "registrar", "address", "location"],
    answer: "For official phone numbers, email addresses, office hours, campus address, and department contacts, use the college website, handbook, or latest notice. This prototype does not contain institution-specific contact details yet; add them to the knowledge base before publishing it to students."
  }
];

function containsKeyword(question, keyword) {
  const escapedKeyword = keyword
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\s+/g, "\\s+");

  return new RegExp(`\\b${escapedKeyword}\\b`, "i").test(question);
}

function getAnswer(question) {
  const q = question.toLowerCase().replace(/\s+/g, " ");
  let bestMatch = null;
  let bestMatchLength = 0;

  for (const faq of faqs) {
    for (const keyword of faq.keywords) {
      if (containsKeyword(q, keyword) && keyword.length > bestMatchLength) {
        bestMatch = faq;
        bestMatchLength = keyword.length;
      }
    }
  }

  if (bestMatch) {
    return bestMatch.answer;
  }

  return "I do not have that answer in the college knowledge base yet. Try asking about admissions, courses, fees, attendance, exams, results, timetable, library, hostel, transport, scholarships, documents, placements, student life, IT support, health, or grievances. For official dates, fees, contacts, and rules, please verify the latest college notice.";
}

app.get("/", (req, res) => {
  res.json({ message: "AI College Chatbot API is running" });
});

app.get("/api/topics", (req, res) => {
  res.json({ topics: [...new Set(faqs.map(faq => faq.category))] });
});

app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  const answer = getAnswer(message);

  res.json({
    question: message,
    answer
  });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
