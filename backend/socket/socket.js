// socket/socket.js

import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {  

    const userId = socket.handshake.query.userId

    if(userId != undefined) {
        console.log(userId)
    }

  socket.on("disconnect", () => {
    
  });
});

export { app, server, io };