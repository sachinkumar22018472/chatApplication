import express from "express"
import { getMessages, sendMessage } from "../controllers/message.controller.js"
import isAuth from "../middlewares/isAuth.js"
import upload from "../middlewares/multer.js"

const messageRouter = express.Router()

// Send Message
messageRouter.post(
    "/send/:receiver",
    isAuth,
    upload.single("image"),
    sendMessage
)

// Get Messages
messageRouter.get(
    "/get/:receiver",
    isAuth,
    getMessages
)

export default messageRouter