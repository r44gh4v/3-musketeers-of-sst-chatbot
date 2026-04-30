import type { RefObject } from "react";
import type { ChatMessage } from "../types/chat";
import ChatMessageBubble from "./ChatMessage";
import SuggestionChips from "./SuggestionChips";
import TypingIndicator from "./TypingIndicator";

interface ChatContainerProps {
  messages: ChatMessage[];
  isLoading: boolean;
  endRef?: RefObject<HTMLDivElement>;
  suggestions: string[];
  onSuggestion: (text: string) => void;
}

export default function ChatContainer({
  messages,
  isLoading,
  endRef,
  suggestions,
  onSuggestion
}: ChatContainerProps) {
  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-2xl border border-slate-200 bg-white">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-5 sm:px-6 [scroll-padding-bottom:24px]">
          {messages.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="flex max-w-md flex-col items-center gap-4 text-center">
                <p className="text-sm text-slate-500">Start with a suggestion or ask your own question.</p>
                <SuggestionChips
                  suggestions={suggestions}
                  onSelect={onSuggestion}
                  disabled={isLoading}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pb-6">
              {messages.map((message) => (
                <ChatMessageBubble key={message.id} message={message} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={endRef} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
