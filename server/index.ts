import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import getHealth from "./routes/health";
import { getPaints } from "./routes/paint";
import Connect from "./data/mongooseConnection";
import { HydrateModels } from "./data/models";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

Connect()
  .then((mg) => {
    HydrateModels(mg);
    app.get("/", (_: Request, res: Response) => {
      res.send("Express + TypeScript Server");
    });
    app.get("/api/health", getHealth);
    app.get("/api/paints", getPaints);

    app.listen(port, () => {
      console.log(
        `⚡️[server]: web server is running on http://localhost:${port}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
