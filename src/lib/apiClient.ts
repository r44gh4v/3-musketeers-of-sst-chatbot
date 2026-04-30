import type { ApiMessage } from "../types/chat";

interface ChatRequest {
  personaId: string;
  messages: ApiMessage[];
}

interface ChatResponse {
  message?: { role: "assistant"; content: string };
  error?: { message: string };
}

export async function sendChatMessage(request: ChatRequest): Promise<string> {
  const baseUrl = import.meta.env.VITE_API_BASE?.replace(/\/$/, "") ?? "";
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });

  const payload = (await response.json().catch(() => ({}))) as ChatResponse;

  if (!response.ok || payload.error) {
    const message = payload.error?.message ?? "Sorry, the assistant is unavailable right now.";
    throw new Error(message);
  }

  const content = payload.message?.content?.trim();
  if (!content) {
    throw new Error("The assistant returned an empty response.");
  }

  return content;
}
