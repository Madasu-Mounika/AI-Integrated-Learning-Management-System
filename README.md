# 🤖 AI Integrated Learning Management System

An AI-powered Learning Management System (LMS) that enhances the teaching-learning process by integrating Artificial Intelligence into a traditional LMS. The system enables teachers to manage learning resources efficiently while providing students with an interactive learning experience through AI-powered features.

---

## 📌 Features

### 👨‍🏫 Teacher Module
- Secure Teacher Login & Registration
- Upload Study Materials (PDF, PPT, DOC, DOCX)
- Delete Uploaded Materials
- Upload Educational Video Links
- Delete Uploaded Videos
- AI-Based Quiz Generation
- Save Generated Quizzes
- AI-Based PowerPoint Generation
- View Student Performance Analytics

### 👨‍🎓 Student Module
- Secure Student Login & Registration
- Search and View Study Materials
- Search and Watch Educational Videos
- Search and Attempt Quizzes
- View Quiz Results with Correct Answers
- Student Profile with Performance Analytics
- AI Doubt Solver Chatbot

---

## 🤖 AI Features

### 📝 AI Quiz Generation
Automatically generates multiple-choice questions from study content using Natural Language Processing (NLTK).

### 📊 AI PowerPoint Generation
Automatically converts study content into PowerPoint presentations using the **python-pptx** library, reducing manual effort for teachers.

### 💬 AI Doubt Solver
An AI chatbot powered by **Google FLAN-T5** that answers students' academic questions in natural language.

### 📈 Student Performance Analytics
Tracks quiz attempts, calculates scores and accuracy, and visualizes student performance.

---

## 🛠️ Technology Stack

### Frontend
- React.js
- HTML
- CSS
- JavaScript

### Backend
- Python
- Flask
- Flask-CORS
- Flask-SQLAlchemy

### Database
- SQLite

### AI & NLP
- NLTK
- Hugging Face Transformers
- Google FLAN-T5
- python-pptx

---

## 📂 Project Structure

```
AI-Integrated-Learning-Management-System
│
├── lms-backend
│   ├── app.py
│   ├── uploads
│   ├── requirements.txt
│   └── ...
│
├── lms-frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/AI-Integrated-Learning-Management-System.git
```

---

### 2. Backend Setup

```bash
cd lms-backend
```

Create a virtual environment (optional)

```bash
python -m venv venv
```

Activate

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run Flask

```bash
python app.py
```

---

### 3. Frontend Setup

```bash
cd lms-frontend
```

Install packages

```bash
npm install
```

Run React

```bash
npm start
```

The application will open at

```
http://localhost:3000
```

---

## 📖 How It Works

### Teacher Workflow

1. Register/Login
2. Upload study materials
3. Upload educational videos
4. Generate AI quiz
5. Save quiz
6. Generate AI PowerPoint
7. Monitor student performance

### Student Workflow

1. Register/Login
2. Search study materials
3. Watch educational videos
4. Attempt quizzes
5. View quiz results
6. Analyze performance
7. Ask doubts to AI chatbot

---



## 🎯 Future Enhancements

- Assignment Submission Module
- Email & Push Notifications
- Live Online Classes
- Advanced AI Chatbot using LLMs
- Personalized Learning Recommendations
- Attendance Management
- Certificate Generation

---

## 👩‍💻 Authors

- **M. Mounika**
- **S. Dahika**
- **P. V. Mohitha**
