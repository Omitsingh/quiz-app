export default function OptionsList({ options, selected, onSelect, disabled }) {
  return (
    <div className="space-y-2">
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          disabled={disabled}
          className={`block w-full text-left px-4 py-2 border rounded 
            ${selected === i ? "bg-indigo-600 text-white" : "bg-white"}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
