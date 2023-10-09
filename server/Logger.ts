import config from "../config/config";
import { configType } from "../config/types";
import winston from "winston";

const { dev: _config } = config;

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
      filename: `${_config.logFolder}/error.log`,
      level: "error",
    }),
    new winston.transports.File({
      filename: `${_config.logFolder}/combined.log`,
    }),
  ],
});

export default Logger;
