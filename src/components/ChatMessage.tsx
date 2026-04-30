import type { ChatMessage } from "../types/chat";

interface ChatMessageProps {
  message: ChatMessage;
}

export default function ChatMessageBubble({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isError = message.status === "error";

  const containerClass = isUser ? "justify-end" : "justify-start";
  const bubbleBase = "max-w-[72%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm";
  const bubbleClass = isUser
    ? "bg-ink text-white"
    : isError
      ? "bg-red-50 text-red-700 border border-red-200"
      : "bg-slate-100 text-ink";

  return (
    <div className={`flex ${containerClass}`}>
      <div className={`${bubbleBase} ${bubbleClass}`}>
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </div>
  );
}
