import type { PersonaConfig, PersonaId } from "../data/personas";

interface PersonaTabsProps {
  personas: PersonaConfig[];
  activeId: PersonaId;
  onSelect: (id: PersonaId) => void;
  variant?: "tabs" | "select";
}

export default function PersonaTabs({
  personas,
  activeId,
  onSelect,
  variant = "tabs"
}: PersonaTabsProps) {
  if (variant === "select") {
    return (
      <div className="relative">
        <select
          className="h-9 appearance-none rounded-xl border border-[#d8d0c2] bg-[#f0ebe0] pl-3 pr-8 text-xs font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
          value={activeId}
          onChange={(e) => onSelect(e.target.value as PersonaId)}
          aria-label="Choose persona"
        >
          {personas.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-[#8a7f6e]">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>
    );
  }

  return (
    /* Warm pill container — all three personas side by side */
    <div className="flex items-center gap-1 rounded-2xl bg-[#ece6d8] p-1.5">
      {personas.map((p) => {
        const isActive = p.id === activeId;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.id)}
            className={`flex items-center gap-2 rounded-[10px] px-3.5 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 ${
              isActive
                ? "bg-white text-ink shadow-sm"
                : "text-[#7a7060] hover:text-ink"
            }`}
            aria-pressed={isActive}
          >
            <img
              src={p.image}
              alt={p.shortName}
              className={`h-5 w-5 rounded-full object-cover transition-opacity ${isActive ? "opacity-100" : "opacity-50"}`}
            />
            {p.shortName}
          </button>
        );
      })}
    </div>
  );
}
