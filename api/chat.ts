import express from "express";
import { createChatCompletion } from "./lib/geminiClient";
import { getPersonaPrompt } from "./lib/personas";

interface ClientMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  personaId?: string;
  messages?: ClientMessage[];
}

const app = express();
app.use(express.json({ limit: "64kb" }));

const handler = async (req: express.Request, res: express.Response) => {
  const { personaId, messages } = (req.body ?? {}) as ChatRequestBody;

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
};

app.post("/", handler);
app.post("/api/chat", handler);

export default app;
