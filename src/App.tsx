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
    () => personas.find((p) => p.id === activeId) ?? personas[0],
    [activeId]
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  const handlePersonaSelect = (id: typeof activeId) => {
    if (id === activeId) return;
    requestVersion.current += 1;
    setActiveId(id);
    setMessages([]);
    setInput("");
    setIsLoading(false);
  };

  const sendMessage = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isLoading) return;

    const version = requestVersion.current;
    const personaId = activePersona.id;

    const userMessage: ChatMessage = { id: createId(), role: "user", content: trimmed };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages: ApiMessage[] = nextMessages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const response = await sendChatMessage({ personaId, messages: apiMessages });
      if (requestVersion.current !== version) return;
      setMessages([...nextMessages, { id: createId(), role: "assistant", content: response }]);
    } catch (error) {
      if (requestVersion.current !== version) return;
      const msg = error instanceof Error ? error.message : "Something went wrong.";
      setMessages([
        ...nextMessages,
        { id: createId(), role: "assistant", content: msg, status: "error" }
      ]);
    } finally {
      if (requestVersion.current === version) setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[100svh] flex-col bg-paper">

      {/* ── Header - page-native, warm background ───────── */}
      <header className="shrink-0">

        {/* Mobile: title left, select right */}
        <div className="flex items-center justify-between px-5 py-4 sm:hidden">
          <span className="font-display text-sm font-bold text-ink">
            3 Musketeers <span className="font-normal text-[#9a8f7e]">of SST</span>
          </span>
          <PersonaTabs
            personas={personas}
            activeId={activeId}
            onSelect={handlePersonaSelect}
            variant="select"
          />
        </div>

        {/* Desktop: 3-col grid - title left, tabs DEAD CENTRE, spacer right */}
        <div className="hidden grid-cols-[1fr_auto_1fr] items-center px-10 py-5 sm:grid">
          <span className="font-display text-sm font-bold text-ink">
            3 Musketeers <span className="font-normal text-[#9a8f7e]">of SST</span>
          </span>
          <PersonaTabs
            personas={personas}
            activeId={activeId}
            onSelect={handlePersonaSelect}
            variant="tabs"
          />
          <div />
        </div>
      </header>

      {/* ── Messages - on the page, not in a box ─────────── */}
      <ChatContainer
        messages={messages}
        isLoading={isLoading}
        endRef={endRef}
        personaName={activePersona.name}
        personaTitle={activePersona.title}
        personaImage={activePersona.image}
        suggestions={activePersona.suggestions}
        onSuggestion={(s) => sendMessage(s)}
      />

      {/* ── Input - floating card, no border-t needed ──── */}
      <div className="shrink-0 px-5 pb-5 pt-2 sm:px-10">
        <div className="mx-auto w-full max-w-[960px]">
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={() => sendMessage(input)}
            disabled={isLoading}
          />
        </div>
      </div>

    </div>
  );
}
