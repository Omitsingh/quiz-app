import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQuiz from "../hooks/useQuiz";
import ProgressBar from "../components/ProgressBar";
import OptionsList from "../components/OptionsList";
import Controls from "../components/Controls";

// Quiz page → show questions, options, timer
export default function QuizPage() {
  const navigate = useNavigate();
  const quiz = useQuiz(5);

  // Auto navigation when time is 0
  useEffect(() => {
    if (quiz.timeLeft === 0) {
      if (quiz.current + 1 === quiz.questions.length) {
        // Last question → go to ThankYou page
        navigate("/thankyou", {
          state: {
            score: quiz.score,
            questions: quiz.questions,
            answers: quiz.answers,
          },
        });
      } else {
        quiz.autoNextOrSubmit(); // Go to next question
      }
    }
  }, [quiz.timeLeft]);

  if (quiz.loading) return <p className="p-6">Loading questions...</p>;

  function handleSubmit() {
    const isLast = quiz.current + 1 === quiz.questions.length;

    if (!isLast) {
      quiz.autoNextOrSubmit();
      return;
    }

    navigate("/thankyou", {
      state: {
        score: quiz.score,
        questions: quiz.questions,
        answers: quiz.answers,
      },
    });
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <ProgressBar current={quiz.current} total={quiz.questions.length} />
        <span
          className={`font-bold ${
            quiz.timeLeft <= 5
              ? "text-red-600 animate-pulse"
              : "text-slate-700"
          }`}
        >
          ⏳ {quiz.timeLeft}s
        </span>
      </div>

      <h2 className="text-xl font-semibold mb-4">{quiz.q.question}</h2>

      <OptionsList
        options={quiz.q.options}
        selected={quiz.selected}
        onSelect={quiz.setSelected}
        disabled={quiz.timeUp}
      />

      <Controls
        onNext={quiz.next}
        onPrevious={quiz.previous} // ← NEW
        isFirst={quiz.current === 0} // ← NEW
        isLast={quiz.current + 1 === quiz.questions.length}
        disabled={quiz.selected === null}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
