import { useState } from "react";

function TeacherDashboard() {
  const [active, setActive] = useState("");
  const [material, setMaterial] = useState(null);
  const [video, setVideo] = useState("");
  const [content, setContent] = useState("");
  const [topicName, setTopicName] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [performance, setPerformance] = useState([]);

  // 🔥 Generate Quiz
  const generateQuiz = async () => {
    if (!content) {
      alert("Please enter content");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/generate_quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: content })
      });

      const data = await res.json();

      if (data.questions) {
        setQuizQuestions(data.questions);
      } else {
        alert(data.error);
      }

    } catch (err) {
      console.error(err);
      alert("Failed to generate quiz");
    }

    setLoading(false);
  };

  // ❌ Delete Question
  const deleteQuestion = (index) => {
    const updated = quizQuestions.filter((_, i) => i !== index);
    setQuizQuestions(updated);
  };
  const getPerformance = async () => {
  const res = await fetch("http://127.0.0.1:5000/student_performance");
  const data = await res.json();
  setPerformance(data);
};

  // 💾 Save Quiz
  const saveQuiz = async () => {
    if (!topicName) {
      alert("Enter topic name");
      return;
    }

    if (quizQuestions.length === 0) {
      alert("No questions to save");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/save_quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          topic: topicName,
          questions: quizQuestions
        })
      });

      const data = await res.json();
      alert(data.message);

      setQuizQuestions([]);
      setContent("");
      setTopicName("");

    } catch (err) {
      alert("Save failed");
    }
  };

  // 📊 Generate PPT
  const generatePPT = async () => {
    if (!content) {
      alert("Enter content first");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/generate_ppt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: content })
      });

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${topicName || "presentation"}.pptx`;
      a.click();

    } catch (err) {
      alert("PPT generation failed");
    }
  };

  // 📄 Upload Material
  const uploadMaterial = async () => {
    if (!material) {
      alert("Select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", material);

    try {
      const res = await fetch("http://127.0.0.1:5000/upload_material", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      alert(data.message || data.error);

    } catch {
      alert("Upload failed");
    }
  };

  // 🎥 Upload Video
  const uploadVideo = async () => {
    if (!video) {
      alert("Enter video link");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/upload_video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: video })
      });

      const data = await res.json();
      alert(data.message || data.error);

      setVideo("");

    } catch {
      alert("Failed to add video");
    }
  };

  // 🎨 Styles
  const styles = {
    container: { display: "flex", height: "100vh" },
    sidebar: {
      width: "250px",
      backgroundColor: "#0f172a",
      color: "white",
      padding: "20px"
    },
    menu: { cursor: "pointer", margin: "15px 0" },
    main: { flex: 1, padding: "40px", backgroundColor: "#f4f6f8" },
    input: {
      display: "block",
      padding: "10px",
      width: "300px",
      marginBottom: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc"
    },
    textarea: {
      display: "block",
      padding: "10px",
      width: "500px",
      height: "120px",
      marginBottom: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc"
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#0f172a",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    },
    card: {
      background: "#f8fafc",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "15px"
    },
    deleteBtn: {
      background: "red",
      color: "white",
      border: "none",
      padding: "5px 10px",
      marginTop: "10px",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2>Teacher</h2>

        <p style={styles.menu} onClick={() => setActive("material")}>📄 Upload Material</p>
        <p style={styles.menu} onClick={() => setActive("video")}>🎥 Add Video</p>
        <p style={styles.menu} onClick={() => setActive("quiz")}>🤖 Generate Quiz</p>
        <p style={styles.menu} onClick={() => setActive("ppt")}>📊 Generate PPT</p>
        <p style={styles.menu} onClick={() => {setActive("performance"); getPerformance();}}> 📈 Student Performance</p>
      </div>

      {/* Main */}
      <div style={styles.main}>

        {active === "" && <h2>Welcome to AI LMS</h2>}

        {/* MATERIAL */}
        {active === "material" && (
          <>
            <h2>Upload Material</h2>

            <input type="file" onChange={(e) => setMaterial(e.target.files[0])} />

            <br /><br />

            <button style={styles.button} onClick={uploadMaterial}>
              Upload
            </button>
          </>
        )}

        {/* VIDEO */}
        {active === "video" && (
          <>
            <h2>Add Video</h2>

            <input
              type="text"
              placeholder="Enter YouTube link"
              style={styles.input}
              value={video}
              onChange={(e) => setVideo(e.target.value)}
            />

            <button style={styles.button} onClick={uploadVideo}>
              Add Video
            </button>
          </>
        )}

        {/* QUIZ */}
        {active === "quiz" && (
          <>
            <h2>Generate Quiz</h2>

            <input
              placeholder="Enter Topic Name"
              style={styles.input}
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
            />

            <textarea
              placeholder="Paste content..."
              style={styles.textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button style={styles.button} onClick={generateQuiz}>
              {loading ? "Generating..." : "Generate Quiz"}
            </button>

            {quizQuestions.length > 0 && (
              <>
                <h3>Preview</h3>

                {quizQuestions.map((q, i) => (
                  <div key={i} style={styles.card}>
                    <b>Q{i + 1}: {q.question}</b>

                    {q.options.map((opt, idx) => (
                      <p key={idx}>• {opt}</p>
                    ))}

                    <p style={{ color: "green" }}>Answer: {q.answer}</p>

                    <button style={styles.deleteBtn} onClick={() => deleteQuestion(i)}>
                      Delete
                    </button>
                  </div>
                ))}

                <button style={styles.button} onClick={saveQuiz}>
                  Save Quiz
                </button>
              </>
            )}
          </>
        )}

        {/* PPT */}
        {active === "ppt" && (
          <>
            <h2>Generate PPT</h2>

            <input
              placeholder="Enter Topic (optional)"
              style={styles.input}
              onChange={(e) => setTopicName(e.target.value)}
            />

            <textarea
              placeholder="Paste content..."
              style={styles.textarea}
              onChange={(e) => setContent(e.target.value)}
            />

            <button style={styles.button} onClick={generatePPT}>
              Generate PPT
            </button>
          </>
        )}
        {active === "performance" && (
  <>
    <h2>Student Performance</h2>

    {performance.map((student, i) => (
      <div key={i} style={styles.card}>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Tests Attempted:</strong> {student.tests_attempted}</p>
        <p><strong>Average Score:</strong> {student.average_score}%</p>
        <p><strong>Status:</strong> {student.status}</p>
      </div>
    ))}
  </>
)}

      </div>
    </div>
  );
}

export default TeacherDashboard;