import express from 'express'
import dotenv from "dotenv"
import connectDb from './config/db.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
import messageRouter from './routes/message.routes.js'
import { app, server } from './socket/socket.js'

dotenv.config()

const port = process.env.PORT || 5000



app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// middleware
app.use(express.json())
app.use(cookieParser())

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