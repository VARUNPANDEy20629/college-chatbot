# AI College Chatbot

An AI-powered college assistant built with React, Node.js/Express, and a Python AI service.

## Features
- College FAQ chatbot
- REST API backend
- Python AI service
- Simple React chat interface
- Easy to extend with RAG, PDFs, MongoDB, and an LLM API

## Run

### 1. Backend
```bash
cd backend
npm install
node server.js
```

### 2. AI service
```bash
cd ai
pip install -r requirements.txt
python chatbot.py
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend at `http://localhost:5000`.
