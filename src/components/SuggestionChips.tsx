interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (text: string) => void;
  disabled?: boolean;
}

export default function SuggestionChips({ suggestions, onSelect, disabled }: SuggestionChipsProps) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      {suggestions.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onSelect(s)}
          disabled={disabled}
          className="group flex items-center justify-between rounded-xl border border-[#ddd5c4] bg-white px-4 py-3 text-left text-sm font-medium text-[#5c5040] shadow-sm transition hover:border-[#c8bfb0] hover:bg-[#fdfaf6] hover:text-ink hover:shadow-md disabled:opacity-50"
        >
          <span>{s}</span>
          <span className="ml-3 shrink-0 text-[#b8a88a] transition group-hover:translate-x-0.5 group-hover:text-ink">→</span>
        </button>
      ))}
    </div>
  );
}
