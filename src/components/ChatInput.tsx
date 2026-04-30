interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  return (
    <form
      className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center"
      onSubmit={(event) => {
        event.preventDefault();
        onSend();
      }}
    >
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ask a question or pick a suggestion"
        className="w-full flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
        disabled={disabled}
      />
      <button
        type="submit"
        className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        disabled={disabled || !value.trim()}
      >
        Send
      </button>
    </form>
  );
}
