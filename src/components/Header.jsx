import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user from localStorage whenever location changes (route change)
  useEffect(() => {
    const savedUser = localStorage.getItem("quizUser");
    setUser(savedUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("quizUser");
    setUser(null);
    navigate("/");
  };

  const navLinkClass = (path) =>
    `text-sm font-medium transition-all duration-200 ${
      location.pathname === path
        ? "text-yellow-300 underline underline-offset-4"
        : "text-white hover:text-yellow-200"
    }`;

  return (
    <header className="bg-black/40 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extrabold text-white drop-shadow-sm tracking-wide"
        >
          QuizMaster
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>

          {/* Show Quiz and Results links only if user is logged in */}
          {user && (
            <>
              <Link to="/quiz" className={navLinkClass("/quiz")}>
                Quiz
              </Link>
              <Link to="/results" className={navLinkClass("/results")}>
                Results
              </Link>
            </>
          )}

          <Link to="/about" className={navLinkClass("/about")}>
            About
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-white text-sm hidden sm:inline-block">
                Welcome, <strong>{user}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="text-red-300 hover:text-red-100 text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white hover:text-yellow-200 text-sm font-semibold"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
