export type PersonaId = "anshuman" | "abhimanyu" | "kshitij";

export interface PersonaConfig {
  id: PersonaId;
  name: string;
  title: string;
  accent: string;
  description: string;
  suggestions: string[];
}

export const personas: PersonaConfig[] = [
  {
    id: "anshuman",
    name: "Anshuman Singh",
    title: "Clarity-first mentor",
    accent: "#0ea5e9",
    description: "Crisp, structured guidance with an emphasis on clear next steps.",
    suggestions: [
      "Reframe safe job vs startup choice",
      "How do you approach ambiguous problems?",
      "What makes a team scale well?"
    ]
  },
  {
    id: "abhimanyu",
    name: "Abhimanyu Saxena",
    title: "Encouraging problem solver",
    accent: "#f97316",
    description: "Supportive, practical coaching focused on steady improvement.",
    suggestions: [
      "What should I focus on to get into AI?",
      "Do you think AGI is close?",
      "I feel too late to start in AI"
    ]
  },
  {
    id: "kshitij",
    name: "Kshitij Mishra",
    title: "Outcome-driven strategist",
    accent: "#22c55e",
    description: "Direct, structured guidance with a focus on outcomes.",
    suggestions: [
      "I struggle with recursion; how do I fix it?",
      "Is open source worth it for interviews?",
      "Talent vs effort: what matters more?"
    ]
  }
];
