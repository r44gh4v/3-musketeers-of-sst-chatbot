import type { RefObject } from "react";
import type { ChatMessage } from "../types/chat";
import ChatMessageBubble from "./ChatMessage";
import SuggestionChips from "./SuggestionChips";
import TypingIndicator from "./TypingIndicator";

interface ChatContainerProps {
  messages: ChatMessage[];
  isLoading: boolean;
  endRef?: RefObject<HTMLDivElement>;
  personaName: string;
  personaTitle: string;
  personaImage: string;
  suggestions: string[];
  onSuggestion: (text: string) => void;
}

export default function ChatContainer({
  messages,
  isLoading,
  endRef,
  personaName,
  personaTitle,
  personaImage,
  suggestions,
  onSuggestion
}: ChatContainerProps) {
  return (
    <main className="flex-1 overflow-y-auto">
      {messages.length === 0 ? (

        /* ── Empty state ───────────────────────────────── */
        <div className="flex h-full flex-col items-center justify-center gap-8 px-6 text-center">

          {/* Persona photo */}
          <div className="flex flex-col items-center gap-3">
            <img
              src={personaImage}
              alt={personaName}
              className="h-20 w-20 rounded-full object-cover shadow-md ring-4 ring-white"
            />
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#b0a48e]">
                talking to
              </p>
              <h2 className="font-display text-2xl font-bold text-ink">{personaName}</h2>
              <p className="mt-0.5 text-xs text-[#8a7f6e]">{personaTitle}</p>
            </div>
          </div>

          {/* Suggestion cards */}
          <SuggestionChips
            suggestions={suggestions}
            onSelect={onSuggestion}
            disabled={isLoading}
          />
        </div>

      ) : (

        /* ── Conversation ──────────────────────────────── */
        <div className="mx-auto flex w-full max-w-[960px] flex-col gap-3 px-5 py-6 sm:px-10">
          {messages.map((message) => (
            <ChatMessageBubble
              key={message.id}
              message={message}
              personaImage={personaImage}
              personaName={personaName}
            />
          ))}
          {isLoading && <TypingIndicator personaImage={personaImage} personaName={personaName} />}
          <div ref={endRef} />
        </div>

      )}
    </main>
  );
}
