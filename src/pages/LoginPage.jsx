import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Simple login page
export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem("quizUser", username); // save user
      onLogin(username);
      navigate("/"); // ⬅ Redirect to Home instead of /quiz
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded w-full max-w-sm mb-4"
      />
      <button
        onClick={handleLogin}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Continue
      </button>
    </div>
  );
}
