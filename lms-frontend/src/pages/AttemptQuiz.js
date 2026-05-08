import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AttemptQuiz() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState({});

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/get_quiz/${quizId}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, [quizId]);

  const handleOptionChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const submitQuiz = async () => {
    const res = await fetch("http://127.0.0.1:5000/submit_quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
  quiz_id: quizId,
  student_email: localStorage.getItem("userEmail"),
  answers
})
    });

    const data = await res.json();
    setScore(data.score);
    setCorrectAnswers(data.correct_answers);
  };

  const styles = {
    container: { padding: "40px", backgroundColor: "#f4f6f8", minHeight: "100vh" },
    card: {
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "20px"
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#0f172a",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
      <h2>Attempt Quiz</h2>

      {questions.map((q) => (
        <div key={q.id} style={styles.card}>
          <h4>{q.question}</h4>

          {[q.option1, q.option2, q.option3, q.option4].map((opt, index) => (
            <div key={index}>
              <input
                type="radio"
                name={`question-${q.id}`}
                value={opt}
                onChange={() => handleOptionChange(q.id, opt)}
              />
              {opt}
            </div>
          ))}

          {/* Show correct answer after submit */}
          {score !== null && (
            <p style={{ color: "green", marginTop: "10px" }}>
              Correct Answer: {correctAnswers[q.id]}
            </p>
          )}
        </div>
      ))}

      {questions.length > 0 && score === null && (
        <button style={styles.button} onClick={submitQuiz}>
          Submit Quiz
        </button>
      )}

      {score !== null && (
        <h3>Your Score: {score} / {questions.length}</h3>
      )}
    </div>
  );
}

export default AttemptQuiz;