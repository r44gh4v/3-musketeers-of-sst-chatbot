import "dotenv/config";
import app from "../api/chat";

const port = Number(process.env.LOCAL_API_PORT ?? 8787);

app.listen(port, () => {
  console.log(`Local API listening on http://localhost:${port}`);
});
