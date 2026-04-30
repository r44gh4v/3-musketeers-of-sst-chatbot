# The 3 Musketeers of SST - Persona Chatbot

A persona-based chatbot featuring Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra - the three founders and instructors behind Scaler School of Technology.

## Tech stack

- React + Vite + TypeScript
- Tailwind CSS
- Express (serverless API via Vercel functions)
- Gemini OpenAI-compatible API

## Getting started

1. Install dependencies:
   ```
   npm install
   ```

2. Create your environment file:
   ```
   cp .env.example .env
   ```

3. Add your Gemini API key to `.env`:
   ```
   GEMINI_API_KEY=your_key_here
   ```

4. Run locally (frontend + API server together):
   ```
   npm run dev
   ```
   Frontend runs on http://localhost:5173. API runs on http://localhost:8787.

To emulate Vercel's serverless environment locally, install the Vercel CLI and run:
```
npm run vercel:dev
```

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `GEMINI_API_KEY` | Yes | — | Your Gemini API key |
| `GEMINI_MODEL` | No | `gemini-3-flash-preview` | Model to use |
| `GEMINI_API_URL` | No | Google's OpenAI-compat endpoint | API endpoint |
| `GEMINI_MAX_TOKENS` | No | `900` | Max response tokens |
| `LOCAL_API_PORT` | No | `8787` | Port for the local API server |
| `VITE_API_BASE` | No | — | Custom API base URL (for local testing) |

## Deployment (Vercel)

1. Create a Vercel project from the repo root
2. Set `GEMINI_API_KEY` in Vercel environment variables
3. Build command: `npm run build`
4. Output directory: `dist`

Both the React frontend and the Express API (`/api` folder) are deployed as a single Vercel project.
