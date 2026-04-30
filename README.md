# Three Musketeers Persona Chatbot

A persona-based chatbot for Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra. Built with React, Tailwind, Express, and the Gemini OpenAI-compatible API. Deployed as a single Vercel project.

## Features
- Persona tabs with conversation reset
- Quick-start suggestion chips per persona
- Typing indicator and friendly error handling
- Config-driven UI and prompts

## Tech stack
- React + Vite + TypeScript
- Tailwind CSS
- Express serverless API in /api
- Gemini OpenAI-compatible API

## Getting started
1. Install dependencies:
   npm install
2. Create env file:
   cp .env.example .env
3. Add GEMINI_API_KEY to .env
4. Run locally (frontend + API together):
   npm run dev

If you want to emulate Vercel's serverless environment, install the Vercel CLI and run:
npm run vercel:dev

## Environment variables
- GEMINI_API_KEY (required)
- GEMINI_MODEL (optional, default: gemini-3-flash-preview)
- GEMINI_API_URL (optional)
- GEMINI_MAX_TOKENS (optional, default: 900)
- LOCAL_API_PORT (optional, default: 8787)
- VITE_API_BASE (optional, set to a full URL for local testing)

## Deployment
- Create a single Vercel project from the repo root
- Set GEMINI_API_KEY (and optionally GEMINI_MODEL) in Vercel environment variables
- Build command: npm run build
- Output directory: dist

## Docs
- prompts.md contains the three system prompts (draft placeholders)
- reflection.md contains the assignment reflection

## Screenshots
Add screenshots in /docs and link them here.
