import express from "express";
import http from "http";
import cors from "cors";

import authRoutes from "./routes/api/auth.routes";

const app = express();
const server = http.createServer(app);

app.use(express.json());
//allow cors
app.use(cors());
app.options("*", cors());

app.set("port", process.env.PORT || 4000);

app.get("/", (req, res) => {
  res.send("hello env:" + process.env.NODE_ENV);
});

// API
app.use("/api/auth", authRoutes); // backend

export default {
  server,
  port: app.get("port"),
};
