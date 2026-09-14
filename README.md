# Clyvora College Assistant

An AI-powered college assistant built with React/Vite, Node.js/Express, and an optional Python AI service. Clyvora helps students find guidance about admissions, courses, fees, attendance, exams, results, timetables, library, hostel, scholarships, placements, and campus services.

## Features

- Premium responsive Clyvora dashboard with dark/light themes
- Conversation history, new chat, delete chat, search, notifications, and quick actions
- Copy, feedback, regenerate, attachment, voice input, and typing states
- College FAQ REST API with broad student-support topics
- Optional Python AI service and document-ready knowledge base

## Run

### Backend

```bash
cd backend
npm install
node server.js
```

The API runs at `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on the Vite development URL and expects the backend at `http://localhost:5000`.

### Optional AI service

```bash
cd ai
pip install -r requirements.txt
python chatbot.py
```

## Project Structure

```text
ai/          Optional Python service and college document guidance
backend/     Node.js/Express chatbot API
frontend/    React/Vite Clyvora interface
```

Add official college documents, dates, fees, contacts, and policies under `ai/documents` before publishing institution-specific answers.
