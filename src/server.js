import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import authRoutes from "./routes/api/auth.routes";

const app = express();
const server = http.createServer(app);

// express server settings
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

// Socket.io Server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Sockets.
io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    io.emit("disconnected", { socketId: socket.id });
  });

  socket.on("message", ({ room, username, message }) => {
    io.to(`game-${room}`).emit("response", { username, message });
  });

  socket.on("join-room", ({ room, username }) => {
    io.emit("disconnected", socket.id);
    socket.join(`game-${room}`);
    io.to(`game-${room}`).emit("connected", { socketId: socket.id, username });
  });

  socket.on("wave", ({ username, room }) => {
    io.to(`game-${room}`).emit("wave", { socketId: socket.id, username });
  });
});

export default {
  server,
  port: app.get("port"),
};
