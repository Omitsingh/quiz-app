export default function Controls({ onNext, disabled, isLast, onSubmit }) {
  return (
    <div className="mt-4">
      {!isLast ? (
        <button
          onClick={onNext}
          disabled={disabled}
          className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      ) : (
        <button
          onClick={onSubmit}
          disabled={disabled}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
        >
          Submit
        </button>
      )}
    </div>
  )
}
