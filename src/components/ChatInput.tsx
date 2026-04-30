import { useEffect, useRef } from "react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [value]);

  return (
    /*
     * Outer: rounded-2xl (16px) + px-4 (16px) py-3 (12px)
     * Send button: rounded-lg (8px) - inner_r ≈ outer_r − min(pad_x, pad_y) = 16 − 8 ≈ 8
     */
    <div className="rounded-2xl border border-[#d5ccba] bg-white px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.07)]">
      <form
        className="flex items-center gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
      >
        <textarea
          ref={ref}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Ask anything…"
          className="flex-1 resize-none overflow-hidden bg-transparent py-0 text-sm leading-relaxed text-ink outline-none placeholder:text-[#b8a88a]"
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="shrink-0 rounded-lg bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:opacity-80 disabled:opacity-30"
          aria-label="Send"
        >
          Send
        </button>
      </form>
    </div>
  );
}
