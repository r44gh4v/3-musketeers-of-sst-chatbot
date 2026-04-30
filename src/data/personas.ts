export type PersonaId = "anshuman" | "abhimanyu" | "kshitij";

export interface PersonaConfig {
  id: PersonaId;
  name: string;
  shortName: string;
  title: string;
  image: string;
  suggestions: string[];
}

export const personas: PersonaConfig[] = [
  {
    id: "anshuman",
    name: "Anshuman Singh",
    shortName: "Anshuman",
    title: "Co-founder · Strategy & Execution",
    image: "/personas/anshuman_singh.jpg",
    suggestions: [
      "Safe job vs startup - how do I decide?",
      "AI is changing jobs. What should I focus on?",
      "I feel lost in my career. Where do I start?"
    ]
  },
  {
    id: "abhimanyu",
    name: "Abhimanyu Saxena",
    shortName: "Abhimanyu",
    title: "Co-founder · Builder & AI",
    image: "/personas/abhimanyu_saxena.jpg",
    suggestions: [
      "What should I build to get into AI?",
      "Am I too late to start in AI?",
      "What's your take on AGI?"
    ]
  },
  {
    id: "kshitij",
    name: "Kshitij Mishra",
    shortName: "Kshitij",
    title: "Head of Instructors",
    image: "/personas/kshitij_mishra.jpg",
    suggestions: [
      "Recursion never clicks for me. Help.",
      "Is open source worth the effort?",
      "Will AI replace software engineers?"
    ]
  }
];
