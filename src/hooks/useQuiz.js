import { useEffect, useState } from "react"
import { fetchQuestionsAPI } from "../services/triviaApi"

export default function useQuiz(amount = 5) {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)

  // ⏳ timer states
  const [timeLeft, setTimeLeft] = useState(30)
  const [timeUp, setTimeUp] = useState(false)

  useEffect(() => {
    fetchQuestionsAPI(amount).then(qs => {
      setQuestions(qs)
      setLoading(false)
    })
  }, [amount])

  const q = questions[current]

  // ⏳ countdown effect
  useEffect(() => {
    if (!q) return
    setTimeLeft(30)
    setTimeUp(false)

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setTimeUp(true) // freeze options
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [current, q])

  // Save answer if selected
  function saveAnswer() {
    if (selected !== null) {
      const newAnswers = [...answers]
      newAnswers[current] = selected
      setAnswers(newAnswers)
      if (selected === q.correctIndex) {
        setScore(s => s + 1)
      }
    }
  }

  function next() {
    saveAnswer()
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1)
      setSelected(null)
    }
  }

  // Called when timer ends
  function autoNextOrSubmit() {
    saveAnswer()
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1)
      setSelected(null)
    } else {
      // 🟢 reached last question → auto-submit
      setTimeUp(true)
    }
  }

  return {
    questions, q, current, selected, setSelected,
    next, score, answers, loading,
    timeLeft, timeUp, autoNextOrSubmit
  }
}
