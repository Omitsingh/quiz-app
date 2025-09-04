import { useEffect, useState } from "react";
import { fetchQuestionsAPI } from "../services/triviaApi";

// Custom quiz hook: fetch questions, handle current question, timer, score
export default function useQuiz(amount = 5) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // ⏳ timer states
  const [timeLeft, setTimeLeft] = useState(30);
  const [timeUp, setTimeUp] = useState(false);

  // Fetch questions from API
  useEffect(() => {
    fetchQuestionsAPI(amount).then(qs => {
      setQuestions(qs);
      setLoading(false);
    });
  }, [amount]);

  const q = questions[current];

  // Countdown timer per question
  useEffect(() => {
    if (!q) return;
    setTimeLeft(30);
    setTimeUp(false);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeUp(true); // freeze options when time up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [current, q]);

  // Save selected answer & update score
  function saveAnswer() {
    if (selected !== null) {
      const newAnswers = [...answers];
      newAnswers[current] = selected;
      setAnswers(newAnswers);

      // Recalculate score correctly (important when navigating back and forth)
      // This prevents adding score multiple times for the same question
      let newScore = 0;
      newAnswers.forEach((answer, idx) => {
        if (questions[idx] && answer === questions[idx].correctIndex) {
          newScore++;
        }
      });
      setScore(newScore);
    }
  }

  // Go to next question
  function next() {
    saveAnswer();
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
      // Restore previously selected answer or reset to null
      setSelected(answers[current + 1] ?? null);
    }
  }

  // Go to previous question
  function previous() {
    saveAnswer();
    if (current > 0) {
      setCurrent(c => c - 1);
      setSelected(answers[current - 1] ?? null);
    }
  }

  // Auto move next or finish quiz when timer ends
  function autoNextOrSubmit() {
    saveAnswer();
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
      setSelected(answers[current + 1] ?? null);
    } else {
      setTimeUp(true); // last question → freeze
    }
  }

  return {
    questions,
    q,
    current,
    selected,
    setSelected,
    next,
    previous,  // <-- NEW
    score,
    answers,
    loading,
    timeLeft,
    timeUp,
    autoNextOrSubmit,
  };
}
