import dotEnv from "dotenv";
import winston from "winston";

dotEnv.config();

const Logger = winston.createLogger({
  level: "info",
  levels: winston.config.npm.levels,
  format: winston.format.json(),
  //   defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: `${process.env.LOG_FOLDER}/error.log`,
      level: "error",
    }),
    new winston.transports.File({
      filename: `${process.env.LOG_FOLDER}/combined.log`,
    }),
    new winston.transports.Console(),
  ],
});

export default Logger;
