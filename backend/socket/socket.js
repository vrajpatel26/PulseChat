import http from "http"
import express from "express"
import { Server } from "socket.io"
import User from "../models/user.model"

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "https://pulsechat-ytwt.onrender.com"
    }
})

const userSocketMap = {}

export const getReceiverSocketId = (receiver) => {
    return userSocketMap[receiver]
}

io.on("connection", (socket) => {

    const userId = socket.handshake.query.userId

    if (userId != undefined) {
        // console.log(userId , socket.id);
        userSocketMap[userId] = socket.id
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap))


    //for typing..
    socket.on("typing", ({ receiverId, senderName }) => {

        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("userTyping", {
                senderName
            });
        }

    });

    socket.on("stopTyping", ({ receiverId }) => {

        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("userStopTyping");
        }

    });

    socket.on("disconnect", async () => {
        delete userSocketMap[userId]

        await User.findByIdAndUpdate(userId, {
            lastSeen: new Date()
        })

        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})


export { app, server, io }
