const express = require("express");
const os = require("os");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const startedAt = Date.now();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "devops-dashboard",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/status", (req, res) => {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();

  res.json({
    status: "running",
    service: "devops-dashboard",
    hostname: os.hostname(),
    platform: `${os.type()} ${os.release()}`,
    nodeVersion: process.version,
    uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
    memory: {
      totalMb: Math.round(totalMemory / 1024 / 1024),
      freeMb: Math.round(freeMemory / 1024 / 1024),
      usedPercent: Math.round(((totalMemory - freeMemory) / totalMemory) * 100)
    },
    checkedAt: new Date().toISOString()
  });
});

app.get("/api/pipeline", (req, res) => {
  res.json({
    name: "Local Docker CI Pipeline",
    stages: [
      { name: "Source", detail: "Project files are available", status: "complete" },
      { name: "Build", detail: "Docker image is built with docker compose", status: "manual" },
      { name: "Test", detail: "Node.js automated tests run in GitHub Actions", status: "automated" },
      { name: "Deploy", detail: "Container runs locally with Docker Compose", status: "manual" }
    ]
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`DevOps Dashboard listening on port ${PORT}`);
});

module.exports = app;
