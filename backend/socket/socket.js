// socket/socket.js

import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chatapplication-96ig.onrender.com",
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
