import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import session from "express-session"; //TODO: Get a better understanding of what combinations of require/import ts/js I can use in here.  Whether I need *.d.ts files for .js...
import getHealth from "./routes/health";
import paintRouter from "./routes/paint";
import adminPaintRouter from "./routes/admin/paint";
import Connect from "./data/mongooseConnection";
import { HydrateModels } from "./data/models";
import loginRouter from "./routes/login";
import path from "path";
import config from "../config/config";
import { configType } from "../config/types";
import {
  ACCESS_TOKEN_LIFESPAN,
  AUTH_COOKIE_LIFESPAN,
  REFRESH_TOKEN_LIFESPAN,
} from "./constants";

dotenv.config();
const _config: configType = config.dev;

const app: Express = express();
app.use(bodyParser.json());
app.use(
  session({
    secret: _config.oauthLoginSecret,
    saveUninitialized: true,
    cookie: { maxAge: AUTH_COOKIE_LIFESPAN },
    resave: false,
  })
);
const port = process.env.PORT;

process.env.SECRET = _config.oauthLoginSecret;

Connect()
  .then((mg) => {
    HydrateModels(mg);
    app.use(express.static(path.join(__dirname, "public")));

    app.get("/", (_: Request, res: Response) => {
      res.send("Express + TypeScript Server");
    });
    app.use("/api/login", loginRouter);
    app.get("/api/health", getHealth);
    app.use("/api/paints", paintRouter);
    app.use("/api/admin/paints", adminPaintRouter);

    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    });

    app.listen(port, () => {
      console.log(
        `⚡️[server]: web server is running on http://localhost:${port}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
