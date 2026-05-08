import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ MOVE styles here
  const styles = {
  container: {
    height: "calc(100vh - 80px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.85)" // soft white glass
  },

  card: {
    width: "320px",
    padding: "30px",
    borderRadius: "15px",
    backdropFilter: "blur(12px)",
    background: "rgba(255, 255, 255, 0.85)", // soft white glass
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.3)",
    textAlign: "center",
    color: "#1e293b" // dark text
  },

  title: {
    marginBottom: "20px",
    color: "#0f172a"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    outline: "none",
    background: "#f8fafc"
  },

  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    background: "#f8fafc"
  },

  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#0f172a", // dark blue button
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  link: {
    marginTop: "10px",
    color: "#1e293b"
  }
};

  const handleLogin = async () => {
    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.role === "student") {
  localStorage.setItem("userEmail", email);
  navigate("/student");
}
    else if (data.role === "teacher") {
  localStorage.setItem("userEmail", email);
  navigate("/teacher");
}
    else alert("Invalid login");
  };

 return (
  <>
    {/* Top Title Bar */}
    <div
      style={{
        width: "100%",
        backgroundColor: "#1976d2",
        color: "white",
        padding: "25px",
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "bold",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
      }}
    >
      AI Integrated Learning Management System
    </div>

    {/* Existing Login Card */}
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <input
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.link}>
          <Link to="/register">New user? Register</Link>
        </p>
      </div>
    </div>
  </>
);
}

export default Login;