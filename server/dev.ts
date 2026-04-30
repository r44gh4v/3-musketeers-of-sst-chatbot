import "dotenv/config";
import express from "express";
import handler from "../api/chat";

const app = express();
app.use(express.json({ limit: "64kb" }));

const port = Number(process.env.LOCAL_API_PORT ?? 8787);

app.post("/api/chat", handler);
app.post("/", handler);

app.listen(port, () => {
  console.log(`Local API listening on http://localhost:${port}`);
});
