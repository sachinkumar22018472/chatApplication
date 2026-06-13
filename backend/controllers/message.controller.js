import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { io, getReceiverSocketId } from "../socket/socket.js";
export const sendMessage = async (req, res) => {

    try {

        let sender = req.userId
        let { receiver } = req.params
        let { message } = req.body

        let image;
        if (req.file) {

            console.log("FILE:", req.file);

            const uploadedImage = await uploadOnCloudinary(req.file.path);

            console.log("CLOUDINARY RESPONSE:", uploadedImage);

            image = uploadedImage;
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] }
        })

        let newMessage = await Message.create({
            sender,
            receiver,
            message,
            image
        })

        if (!conversation) {

            conversation = await Conversation.create({
                participants: [sender, receiver],
                messages: [newMessage._id]
            })

        } else {

            conversation.messages.push(newMessage._id)

            await conversation.save()

        }

        const receiverSocketId = getReceiverSocketId(receiver);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage)

    } catch (error) {
        console.log("SEND MESSAGE ERROR:", error);

        return res.status(500).json({
            message: `send Message error ${error.message}`
        });
    }
}

export const getMessages = async (req, res) => {
    

    try {

        const sender = req.userId;
        const { receiver } = req.params;

        const conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] }
        }).populate("messages");

        // Conversation nahi mila to empty array bhejo
        if (!conversation) {
            return res.status(200).json([]);
        }

        return res.status(200).json(conversation.messages);

    } catch (error) {

        console.log("GET MESSAGE ERROR:", error);

        return res.status(500).json({
            message: `get Message error ${error.message}`
        });

    }

}