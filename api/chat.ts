import { createChatCompletion } from "./lib/geminiClient";
import { getPersonaPrompt } from "./lib/personas";

interface ClientMessage {
  role: "user" | "assistant";
  content: string;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: { message: "Method not allowed." } });
  }

  const { personaId, messages } = (req.body ?? {}) as {
    personaId?: string;
    messages?: ClientMessage[];
  };

  if (!personaId || !Array.isArray(messages)) {
    return res.status(400).json({ error: { message: "Missing personaId or messages." } });
  }

  const prompt = getPersonaPrompt(personaId);
  if (!prompt) {
    return res.status(400).json({ error: { message: "Unknown persona selected." } });
  }

  const normalizedMessages = messages.filter(
    (message) =>
      (message.role === "user" || message.role === "assistant") &&
      typeof message.content === "string" &&
      message.content.trim().length > 0
  );

  if (normalizedMessages.length === 0) {
    return res.status(400).json({ error: { message: "No valid messages provided." } });
  }

  try {
    const responseText = await createChatCompletion([
      { role: "system", content: prompt },
      ...normalizedMessages
    ]);

    return res.status(200).json({
      message: {
        role: "assistant",
        content: responseText
      }
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "The assistant is unavailable right now.";
    return res.status(500).json({ error: { message } });
  }
}
