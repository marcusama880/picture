const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.get("/image.png", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ua = req.headers["user-agent"];
  const log = `[${new Date().toISOString()}] IP: ${ip} | UA: ${ua}\n`;

  fs.appendFileSync("log.txt", log);
  console.log(log);

  res.sendFile(path.join(__dirname, "1x1.png"));
});

app.get("/", (req, res) => {
  res.send("🟢 Logger is running.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server on port ${port}`));
