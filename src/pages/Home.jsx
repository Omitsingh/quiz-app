import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Landing page with login & start quiz
export default function Home({ user, onLogin }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle login logic
  const handleLogin = () => {
    if (!usernameInput.trim() || !passwordInput) {
      setError("Please enter username and password");
      return;
    }

    const isPasswordNumeric = /^\d+$/.test(passwordInput);

    if (!isPasswordNumeric) {
      setError("Password must contain only numbers");
      return;
    }

    onLogin(usernameInput.trim()); // save login
    setUsernameInput("");
    setPasswordInput("");
    setError(null);
    setShowLoginForm(false);
  };

  const startQuiz = () => {
    navigate("/quiz"); // Navigate to quiz page
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/30 backdrop-blur-md shadow-xl rounded-xl p-8 max-w-md w-full text-center border border-white/40">
        {!user ? (
          !showLoginForm ? (
            <>
              <h2 className="text-3xl font-bold mb-6 text-indigo-700">
                Welcome to QuizMaster!
              </h2>
              <h2 className="text-xl font-bold mb-2">
                Play To Gain Your Knowledge
              </h2>
              <p className="text-gray-600 mb-8">
                Challenge yourself with fun quizzes and test how much you really
                know. Click below to begin and see your score instantly!
              </p>

              <p className="mb-6 text-slate-700">
                Test your knowledge and challenge yourself.
              </p>
              <button
                onClick={() => setShowLoginForm(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4 text-indigo-700">
                Login to Start Quiz
              </h2>

              <input
                type="text"
                placeholder="Username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="border border-gray-300 p-2 w-full mb-4 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="border border-gray-300 p-2 w-full mb-4 rounded"
              />

              {error && (
                <p className="text-red-600 mb-4 text-sm font-semibold">
                  {error}
                </p>
              )}

              <button
                onClick={handleLogin}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full mb-3"
              >
                Login
              </button>

              <button
                onClick={() => setShowLoginForm(false)}
                className="text-indigo-600 hover:underline text-sm"
              >
                Cancel
              </button>
            </>
          )
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">
              Welcome, {user}!
            </h2>
            <p className="mb-6 text-gray-600">Ready to start your quiz?</p>
            <button
              onClick={startQuiz}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition font-semibold"
            >
              Start Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}
