import { useEffect, useMemo, useRef, useState } from "react";
import ChatContainer from "./components/ChatContainer";
import ChatInput from "./components/ChatInput";
import PersonaTabs from "./components/PersonaTabs";
import { personas } from "./data/personas";
import { sendChatMessage } from "./lib/apiClient";
import type { ApiMessage, ChatMessage } from "./types/chat";

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function App() {
  const [activeId, setActiveId] = useState(personas[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const requestVersion = useRef(0);

  const activePersona = useMemo(
    () => personas.find((persona) => persona.id === activeId) ?? personas[0],
    [activeId]
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  const handlePersonaSelect = (id: typeof activeId) => {
    if (id === activeId) {
      return;
    }
    setActiveId(id);
    setMessages([]);
    setInput("");
    setIsLoading(false);
    requestVersion.current += 1;
  };

  const sendMessage = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const version = requestVersion.current;
    const personaId = activePersona.id;

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: trimmed
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages: ApiMessage[] = nextMessages.map((message) => ({
        role: message.role,
        content: message.content
      }));

      const response = await sendChatMessage({
        personaId,
        messages: apiMessages
      });

      if (requestVersion.current !== version) {
        return;
      }

      setMessages([
        ...nextMessages,
        {
          id: createId(),
          role: "assistant",
          content: response
        }
      ]);
    } catch (error) {
      if (requestVersion.current !== version) {
        return;
      }
      const message = error instanceof Error ? error.message : "Sorry, something went wrong.";
      setMessages([
        ...nextMessages,
        {
          id: createId(),
          role: "assistant",
          content: message,
          status: "error"
        }
      ]);
    } finally {
      if (requestVersion.current === version) {
        setIsLoading(false);
      }
    }
  };

  const handleSend = () => sendMessage(input);
  const handleSuggestion = (suggestion: string) => sendMessage(suggestion);

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex h-[100svh] w-full max-w-[1200px] flex-col gap-4 px-4 py-4 sm:px-6">
        <header className="flex flex-col items-center gap-2 text-center sm:gap-3">
          <h1 className="whitespace-nowrap text-lg font-semibold text-ink sm:text-xl">
            3 Musketeers of SST
          </h1>
          <div className="hidden sm:flex">
            <PersonaTabs
              personas={personas}
              activeId={activeId}
              onSelect={handlePersonaSelect}
              variant="tabs"
            />
          </div>
          <div className="flex sm:hidden">
            <PersonaTabs
              personas={personas}
              activeId={activeId}
              onSelect={handlePersonaSelect}
              variant="select"
            />
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-3">
          <ChatContainer
            messages={messages}
            isLoading={isLoading}
            endRef={endRef}
            suggestions={activePersona.suggestions}
            onSuggestion={handleSuggestion}
          />

          <ChatInput value={input} onChange={setInput} onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}
