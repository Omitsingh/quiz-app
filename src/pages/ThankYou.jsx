import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, questions, answers } = location.state || {};

  useEffect(() => {
    if (!questions) {
      navigate("/"); // redirect if someone opens /thankyou directly
    }
  }, [questions, navigate]);

  return (
    <div className="text-center p-8 bg-white/30 backdrop-blur-md rounded shadow max-w-lg mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">🎉 Thank You!</h1>
      <p className="text-slate-700 mb-4 text-lg">
        You've completed the quiz. Your score has been recorded.
      </p>
      <p className="text-xl font-semibold mb-6 text-indigo-800">
        Your Score: {score} / {questions?.length}
      </p>
      <button
        onClick={() =>
          navigate("/results", {
            state: { score, questions, answers },
          })
        }
        className="bg-indigo-600 text-white px-6 py-3 rounded font-semibold hover:bg-indigo-700 transition"
      >
        View Detailed Results
      </button>
    </div>
  );
}
