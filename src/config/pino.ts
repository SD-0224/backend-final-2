import path from "path";
import fs from "fs";
import pino from "pino";
//Define the logging  configuration  interface
interface PinoConfig {
  level: string;
  dest: string;
}

const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

//Define the path of log file
const logFile = path.join(logDir, "app.log");

//Define the logging configuration object

export const config: PinoConfig = {
  level: "info",
  dest: logFile,
};

export const logger = pino(config);
