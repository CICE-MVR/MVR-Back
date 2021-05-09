import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || 4000);

app.get("/", (req, res) => {
  res.send("hello env:" + process.env.NODE_ENV);
});

export default {
  server,
  port: app.get("port"),
};
