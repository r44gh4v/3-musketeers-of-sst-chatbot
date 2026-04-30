interface TypingIndicatorProps {
  personaImage?: string;
  personaName?: string;
}

export default function TypingIndicator({ personaImage, personaName }: TypingIndicatorProps) {
  return (
    <div className="flex items-center gap-2.5 animate-fade-in" aria-live="polite">
      <span className="sr-only">{personaName ?? "Assistant"} is thinking…</span>
      {personaImage && (
        <img src={personaImage} alt={personaName} className="h-7 w-7 shrink-0 rounded-full object-cover shadow-sm" />
      )}
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-[#e8e0d0]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#b8a88a] animate-pulse-dot" style={{ animationDelay: "0ms" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-[#b8a88a] animate-pulse-dot" style={{ animationDelay: "150ms" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-[#b8a88a] animate-pulse-dot" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
