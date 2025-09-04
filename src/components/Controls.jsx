// Next / Submit / Previous buttons
export default function Controls({
  onNext,
  onPrevious,
  onSubmit,
  disabled,
  isLast,
  isFirst
}) {
  return (
    <div className="mt-4 flex gap-4">
      {/* Show Previous only if not first question */}
      {!isFirst && (
        <button
          onClick={onPrevious}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Previous
        </button>
      )}

      {/* Next or Submit */}
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
  );
}
