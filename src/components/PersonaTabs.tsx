import type { PersonaConfig, PersonaId } from "../data/personas";

interface PersonaTabsProps {
  personas: PersonaConfig[];
  activeId: PersonaId;
  onSelect: (id: PersonaId) => void;
  variant?: "tabs" | "select";
}

export default function PersonaTabs({ personas, activeId, onSelect, variant = "tabs" }: PersonaTabsProps) {
  if (variant === "select") {
    return (
      <div className="relative w-full max-w-[320px]">
        <select
            className="h-11 w-full appearance-none rounded-full border border-slate-200 bg-white px-4 pr-10 text-sm font-semibold text-ink shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          value={activeId}
          onChange={(event) => onSelect(event.target.value as PersonaId)}
          aria-label="Choose persona"
        >
          {personas.map((persona) => (
            <option key={persona.id} value={persona.id}>
              {persona.name}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
      {personas.map((persona) => {
        const isActive = persona.id === activeId;
        return (
          <button
            key={persona.id}
            type="button"
            onClick={() => onSelect(persona.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 ${
              isActive
                ? "bg-ink text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
            aria-pressed={isActive}
          >
            <span>{persona.name}</span>
          </button>
        );
      })}
    </div>
  );
}
