import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import getHealth from "./routes/health";
import { get } from "http";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api/health", getHealth);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
