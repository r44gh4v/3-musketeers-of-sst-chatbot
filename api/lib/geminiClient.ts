interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatCompletionOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

const DEFAULT_MODEL = process.env.GEMINI_MODEL ?? "gemini-3-flash-preview";
const DEFAULT_API_URL =
  process.env.GEMINI_API_URL ??
  "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
const DEFAULT_MAX_TOKENS = Number(process.env.GEMINI_MAX_TOKENS ?? 400);

const REQUEST_TIMEOUT_MS = 30000;

function getApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY. Set it in the environment.");
  }
  return apiKey;
}

export async function createChatCompletion(
  messages: ChatMessage[],
  options: ChatCompletionOptions = {}
): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const response = await fetch(DEFAULT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getApiKey()}`
    },
    body: JSON.stringify({
      model: options.model ?? DEFAULT_MODEL,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? DEFAULT_MAX_TOKENS,
      stream: false
    }),
    signal: controller.signal
  });

  clearTimeout(timeout);

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Rate limit reached. Please wait a moment and try again.");
    }
    const raw = await response.text().catch(() => "");
    let message = `Request failed with status ${response.status}`;
    try {
      const errorPayload = JSON.parse(raw) as { error?: { message?: string } };
      message = errorPayload.error?.message ?? message;
    } catch {
      if (raw) message = raw;
    }
    throw new Error(message);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  return data.choices?.[0]?.message?.content ?? "";
}
