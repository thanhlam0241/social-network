const http = require('http');
const { Server } = require("socket.io");

const authenticateTokenSocket = require('../../middleware/authenTokenSocket');
const messageSchema = require('../../models/Chat/message')
const conversationSchema = require('../../models/Chat/conversation')

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

            socket.on("setup", (userId) => {
                socket.join(userId);
                socket.to(userId).emit("connected");
            });

            socket.on('join-room', (room) => {
                if (room) socket.join(room);
                //socket.in(room).emit('connected', socket.id);
            });

            socket.on("typing", (room) => socket.in(room).emit("typing"));

            socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

            socket.on("send-message", async (messageInfor) => {
                try {
                    const chatId = messageInfor.room;
                    const newMessage = new messageSchema({
                        conversation: chatId,
                        sender: messageInfor.sender,
                        text: messageInfor.text,
                    });
                    const isSuccess = await newMessage.save();
                    if (isSuccess) {
                        io.to(chatId).emit("receive-message", messageInfor);
                        const conversation = await conversationSchema.findById(chatId);

                        conversation.lastMessage = messageInfor.text;
                        const saveConversation = await conversation.save();
                        if (saveConversation) io.to(chatId).emit("last-message", { message: messageInfor.text, room: chatId });
                    }
                } catch (error) {
                    console.log(error);
                }
            });

            socket.off("setup", () => {
                console.log("USER DISCONNECTED");
                socket.leave(userId);
            });

            socket.off("join-room", () => {
                console.log("USER DISCONNECTED");
                socket.leave(room);
            });

            socket.on('disconnect', () => {
                console.log('disconnected');
            });
        }
    });
    return { server, io };
}

module.exports = createServerSocket;