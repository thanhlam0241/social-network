const http = require('http');
const { Server } = require("socket.io");
const authenticateTokenSocket = require('../../middleware/authenTokenSocket');
const messageSchema = require('../../models/Chat/message')
const createServerSocket = (app) => {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
        connectionStateRecovery: {
            // the backup duration of the sessions and the packets
            maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
            // whether to skip middlewares upon successful recovery
            skipMiddlewares: true, // 0.1 second
        }
    });
    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
        global.chatSocket = socket;
        if (socket.recovered) {
            console.log("recovered");
            // recovery was successful: socket.id, socket.rooms and socket.data were restored
        }
        else {
            io.use(authenticateTokenSocket);

            // socket.on("setup", (userData) => {
            //     socket.join(userData._id);
            //     socket.emit("connected", userData._id);
            // });

            socket.on('join-room', (room) => {
                if (room) socket.join(room);
                //socket.in(room).emit('connected', socket.id);
            });

            socket.on("typing", (room) => socket.in(room).emit("typing"));

            socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

            socket.on("send-message", async (messageInfor) => {
                try {
                    console.log(messageInfor)
                    const newMessage = new messageSchema({
                        conversation: messageInfor.room,
                        sender: messageInfor.sender,
                        text: messageInfor.text,
                    });
                    const isSuccess = await newMessage.save();
                    if (isSuccess) {
                        const chatId = messageInfor.room;
                        io.to(chatId).emit("receive-message", messageInfor);
                    }
                } catch (error) {
                    console.log(error);
                }
            });

            socket.off("join-room", () => {
                console.log("USER DISCONNECTED");
                socket.leave('Leave room', room);
            });

            socket.on('disconnect', () => {
                console.log('disconnected');
            });
        }
    });
    return { server, io };
}

module.exports = createServerSocket;