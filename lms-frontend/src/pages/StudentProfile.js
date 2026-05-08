import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    fetch(`http://127.0.0.1:5000/student_profile?email=${email}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  if (!profile) {
    return <div style={{ padding: "30px" }}>Loading profile...</div>;
  }

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh"
      }}
    >
      {/* Profile Header */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "30px"
        }}
      >
        <h1>Student Profile</h1>

        <p>
          <strong>Username:</strong> {profile.username}
        </p>

        <p>
          <strong>Tests Attempted:</strong> {profile.tests_attempted}
        </p>
      </div>

      {/* Test-wise Performance */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px"
        }}
      >
        {profile.quiz_history.map((test, index) => {
          const accuracy = (
            (test.score / test.total) *
            100
          ).toFixed(1);

          const pieData = [
            {
              name: "Correct",
              value: test.score
            },
            {
              name: "Wrong",
              value: test.total - test.score
            }
          ];

          return (
            <div
              key={index}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px"
              }}
            >
              <h2>Test {index + 1}</h2>

              <p>
                <strong>Topic:</strong> {test.topic}
              </p>

              <p>
                <strong>Score:</strong> {test.score}/{test.total}
              </p>

              <p>
                <strong>Accuracy:</strong> {accuracy}%
              </p>

              <div style={{ width: "100%", height: "300px" }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      label
                    >
                      <Cell fill="#22c55e" />
                      <Cell fill="#ef4444" />
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}