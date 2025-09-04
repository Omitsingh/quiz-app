import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";
import About from "./pages/About.jsx";
import ThankYou from "./pages/ThankYou.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("quizUser");
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem("quizUser", username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("quizUser");
    setUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home user={user} onLogin={handleLogin} />} />
          <Route path="/about" element={<About />} />

          {/* Protected quiz routes */}
          <Route
            path="/quiz"
            element={user ? <QuizPage /> : <Navigate to="/" />}
          />
          <Route
            path="/thankyou"
            element={user ? <ThankYou /> : <Navigate to="/" />}
          />
          <Route
            path="/results"
            element={user ? <ResultsPage /> : <Navigate to="/" />}
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
