import { useState , useEffect} from "react";

function StudentDashboard() {
  const [active, setActive] = useState("");
  const [search, setSearch] = useState("");
  const [materials, setMaterials] = useState([]);
  const [videos, setVideos] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [doubt, setDoubt] = useState("");
  const [answer, setAnswer] = useState("");
  const searchMaterials = async () => {
    const res = await fetch(`http://127.0.0.1:5000/search_materials?query=${search}`);
    const data = await res.json();
    setMaterials(data);
  };
  const askDoubt = async () => {
  const res = await fetch("http://127.0.0.1:5000/ask_doubt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: doubt
    })
  });

  const data = await res.json();
  setAnswer(data.answer);
};
  const searchVideos = async () => {
  const res = await fetch(
    `http://127.0.0.1:5000/search_videos?query=${search}`
  );
  const data = await res.json();
  setVideos(data);
};

  const searchQuizzes = async () => {
    const res = await fetch(`http://127.0.0.1:5000/search_quizzes?query=${search}`);
    const data = await res.json();
    setQuizzes(data);
  };
  useEffect(() => {
  if (active === "videos") {
    searchVideos();
  }

  if (active === "materials") {
    searchMaterials();
  }

  if (active === "quiz") {
    searchQuizzes();
  }
}, [active]);
  const getEmbedUrl = (url) => {
  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }

  if (url.includes("youtu.be/")) {
    return url.replace("youtu.be/", "www.youtube.com/embed/");
  }

  return url;
};
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
      padding: "10px",
      width: "300px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginRight: "10px"
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
      background: "white",
      padding: "15px",
      marginTop: "15px",
      borderRadius: "10px"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2>Student</h2>
        <p style={styles.menu} onClick={() => setActive("materials")}>📄 Materials</p>
        <p style={styles.menu} onClick={() => setActive("videos")}>🎥 Videos</p>
        <p style={styles.menu} onClick={() => setActive("quiz")}>📝 Attempt Quiz</p>
       <p style={styles.menu} onClick={() => window.location.href = "/student-profile"}>👤 View Profile</p>
       <p style={styles.menu} onClick={() => setActive("doubt")}>🤖 AI Doubt Solver</p>
      </div>

      <div style={styles.main}>
        {active === "materials" && (
          <>
            <h2>Search Materials</h2>
            <input
              style={styles.input}
              placeholder="Search material"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button style={styles.button} onClick={searchMaterials}>Search</button>

            {materials.map((m, i) => (
              <div key={i} style={styles.card}>
                <p>{m.filename}</p>
                <a
                  href={`http://127.0.0.1:5000/uploads/${m.filename}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Material
                </a>
              </div>
            ))}
          </>
        )}

        {active === "videos" && (
          <>
            <h2>Search Videos</h2>
            <input
              style={styles.input}
              placeholder="Search video"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button style={styles.button} onClick={searchVideos}>Search</button>

            {videos.map((v, i) => (
              <div key={i} style={styles.card}>
                <iframe
                  width="400"
                  height="250"
                  src={getEmbedUrl(v.url)}
                  title="video"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </>
        )}

        {active === "quiz" && (
          <>
            <h2>Search Quiz</h2>
            <input
              style={styles.input}
              placeholder="Search quiz topic"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button style={styles.button} onClick={searchQuizzes}>Search</button>

            {quizzes.map((q, i) => (
              <div key={i} style={styles.card}>
                <h4>{q.topic}</h4>
                <button
                  style={styles.button}
                  onClick={() => window.location.href = `/attempt-quiz/${q.id}`}
                >
                  Attempt Quiz
                </button>
              </div>
            ))}
          </>
        )}
        {active === "doubt" && (
  <>
    <h2>AI Doubt Solver</h2>

    <textarea
      style={{
        width: "100%",
        height: "120px",
        padding: "10px"
      }}
      placeholder="Ask your doubt..."
      value={doubt}
      onChange={(e) => setDoubt(e.target.value)}
    />

    <button
      style={styles.button}
      onClick={askDoubt}
    >
      Ask AI
    </button>

    {answer && (
      <div style={styles.card}>
        <h4>Answer:</h4>
        <p>{answer}</p>
      </div>
    )}
  </>
)}
      </div>
    </div>
  );
}

export default StudentDashboard;