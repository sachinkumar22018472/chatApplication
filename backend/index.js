import express from 'express'
import dotenv from "dotenv"
import connectDb from './config/db.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
import messageRouter from './routes/message.routes.js'
import { app, server } from './socket/socket.js'

import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = process.env.PORT || 5000

const allowedOrigins = [
    "http://localhost:5173",
    "https://chatapplication-96ig.onrender.com"
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}))

// middleware
app.use(express.json())
app.use(cookieParser())
app.use("/public", express.static(path.join(__dirname, "public")))


// routes
app.get("/", (req, res) => {
    res.send("hello")
})

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/message", messageRouter)


// server
server.listen(port, () => {
    connectDb()
    console.log(`server started on port ${port}`)
})
