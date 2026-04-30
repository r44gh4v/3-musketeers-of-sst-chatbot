export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  status?: "error";
}

export interface ApiMessage {
  role: ChatRole;
  content: string;
}
