import type { ChatMessage } from "../types/chat";

interface ChatMessageProps {
  message: ChatMessage;
  personaImage?: string;
  personaName?: string;
}

export default function ChatMessageBubble({ message, personaImage, personaName }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isError = message.status === "error";

  if (isUser) {
    return (
      <div className="flex justify-end animate-fade-in">
        {/* w-fit shrinks bubble to content width; max-w caps it */}
        <div className="w-fit max-w-[72%] rounded-2xl rounded-tr-sm bg-ink px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm">
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-start gap-2.5 animate-fade-in">
        {personaImage && (
          <img src={personaImage} alt={personaName} className="mt-0.5 h-7 w-7 shrink-0 rounded-full object-cover" />
        )}
        <div className="w-fit max-w-[72%] rounded-2xl rounded-tl-sm border border-red-100 bg-red-50 px-4 py-2.5 text-sm leading-relaxed text-red-600">
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5 animate-fade-in">
      {personaImage && (
        <img src={personaImage} alt={personaName} className="mt-0.5 h-7 w-7 shrink-0 rounded-full object-cover shadow-sm" />
      )}
      <div className="w-fit max-w-[72%] rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 text-sm leading-relaxed text-ink shadow-sm ring-1 ring-[#e8e0d0]">
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </div>
  );
}
