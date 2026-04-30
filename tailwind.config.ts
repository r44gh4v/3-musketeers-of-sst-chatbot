import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        body: ["Work Sans", "ui-sans-serif", "system-ui"]
      },
      colors: {
        ink: "#0b0f14",
        paper: "#f8f3e8",
        shell: "#ffffff",
        accent: "#ff7a18",
        mint: "#35c9a5",
        sun: "#f4b83f",
        berry: "#e95d6a"
      },
      boxShadow: {
        soft: "0 20px 60px -40px rgba(15, 23, 42, 0.45)"
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" }
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "0.2", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(-3px)" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out",
        "float-slow": "float 4s ease-in-out infinite",
        "pulse-dot": "pulse-dot 1s ease-in-out infinite"
      }
    }
  },
  plugins: []
} satisfies Config;
