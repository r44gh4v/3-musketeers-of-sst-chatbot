export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-400" aria-live="polite">
      <span className="sr-only">Assistant is thinking</span>
      <div className="flex items-center gap-1">
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-slate-300"
          style={{ animationDelay: "-0.2s" }}
        />
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-slate-300"
          style={{ animationDelay: "-0.1s" }}
        />
        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300" />
      </div>
      <span>Thinking...</span>
    </div>
  );
}
