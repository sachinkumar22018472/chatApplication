// socket/socket.js

import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      const allowed = [
        "http://localhost:5173",
        "https://chatapplication-96ig.onrender.com",
        "https://chat-application-woad-five.vercel.app"
      ];
      if (!origin || allowed.includes(origin) || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  },
});

 const userSocketMap = {};

 export const getReceiverSocketId = (receiver) => {
  return userSocketMap[receiver]
 }

io.on("connection", (socket) => {

  const userId = socket.handshake.query.userId;

  

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Sabko online users bhejo
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {

    console.log("User Disconnected:", userId);

    if (userId) {
      delete userSocketMap[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
