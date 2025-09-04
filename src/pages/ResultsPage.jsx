import { Link, useLocation } from "react-router-dom";

export default function ResultsPage() {
  const location = useLocation();
  const { score, questions, answers } = location.state || {};

  if (!questions) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">No Results</h1>
        <p className="mb-4">You haven’t completed a quiz yet.</p>
        <Link
          to="/quiz"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Start Quiz
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Detailed Results</h1>
      <p className="text-lg">
        You scored{" "}
        <span className="font-semibold text-indigo-700">
          {score}
        </span>{" "}
        out of {questions.length}
      </p>

      <div className="space-y-4">
        {questions.map((q, i) => {
          const yourAnswer = answers[i];
          const isCorrect = yourAnswer === q.correctIndex;
          return (
            <div
              key={q.id || i}
              className={`p-4 border rounded ${
                isCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"
              }`}
            >
              <h2 className="font-semibold mb-2">{q.question}</h2>
              <p>
                Your Answer:{" "}
                <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                  {yourAnswer !== null
                    ? q.options[yourAnswer]
                    : "Not answered"}
                </span>
              </p>
              {!isCorrect && (
                <p>
                  Correct Answer:{" "}
                  <span className="text-green-600">
                    {q.options[q.correctIndex]}
                  </span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      <Link
        to="/quiz"
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Restart Quiz
      </Link>
    </div>
  );
}
