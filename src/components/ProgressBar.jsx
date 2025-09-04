export default function ProgressBar({ current, total }) {
  return (
    <div className="w-full mb-4">
      <p className="text-sm mb-1">Question {current + 1} of {total}</p>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="h-2 bg-indigo-600 rounded"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  )
}
