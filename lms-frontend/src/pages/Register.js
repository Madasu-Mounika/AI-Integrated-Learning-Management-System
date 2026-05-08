import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();

  // 🎨 Glass UI styles
  const styles = {
  container: {
    height: "100vh",
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

  const handleRegister = async () => {
    const res = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, role })
    });

    const data = await res.json();

    alert(data.message);

    // 👉 Redirect to login after register
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>

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

        <select
          style={styles.select}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button style={styles.button} onClick={handleRegister}>
          Register
        </button>

        <p style={styles.link}>
          <Link to="/">Already have an account? Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;