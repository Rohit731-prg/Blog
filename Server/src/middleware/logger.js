import fs from "fs";
import path from "path";

const logFilePath = path.join(process.cwd(), "logs", "requests.log");

export const logger = (req, res, next) => {
  const now = new Date();
  const localTime = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const user = req.user?.name || "Guest";
  const log = `${localTime} - ${user} - ${req.method} ${req.originalUrl}\n`;

  const logsDir = path.dirname(logFilePath);
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  fs.appendFile(logFilePath, log, (err) => {
    if (err) console.error("Error writing to log file", err);
  });
  console.log("middleware log:", log.trim());
  next();
};
