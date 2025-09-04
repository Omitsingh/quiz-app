import questions from "../data/questions.json"

// fallback: load local JSON
export async function fetchQuestionsLocal() {
  return questions
}

// API: OpenTriviaDB
export async function fetchQuestionsAPI(amount = 5) {
  try {
    const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&type=multiple`)
    const data = await res.json()

    return data.results.map((q, idx) => {
      const options = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
      return {
        id: idx + 1,
        question: q.question,
        options,
        correctIndex: options.indexOf(q.correct_answer)
      }
    })
  } catch (err) {
    console.warn("API failed, using local:", err)
    return fetchQuestionsLocal()
  }
}
