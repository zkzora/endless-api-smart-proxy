import express from "express";
import dotenv from "dotenv";
import { receiptRouter } from "./routes/receipt";

dotenv.config();

const app = express();
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use(receiptRouter);

const port = Number(process.env.PORT || 8787);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Smart-Proxy API listening on http://localhost:${port}`);
});
