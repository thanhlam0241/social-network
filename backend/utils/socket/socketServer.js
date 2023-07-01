const http = require('http');
const { Server } = require("socket.io");

const bodyParser = require('body-parser');

const authenticateTokenSocket = require('../../middleware/authenTokenSocket');
const messageSchema = require('../../models/Chat/message')
const conversationSchema = require('../../models/Chat/conversation')

const createServerSocket = (app) => {
    const server = http.createServer();

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
    console.log("createServerSocket")
    global.onlineUsers = new Map();

    //io.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    //io.use(bodyParser.json());


    io.on("connection", (socket) => {
        global.chatSocket = socket;
        if (socket.recovered) {
            console.log("recovered");
            // recovery was successful: socket.id, socket.rooms and socket.data were restored
        }
        else {
            console.log("connected");
            //io.use(authenticateTokenSocket);
            //console.log(socket.client)
            socket.on("setup", (userId) => {
                socket.join(userId);
                io.to(userId).emit("connected");
            });

            socket.on('join-room', (room) => {
                console.log('join-room', room)
                if (room && (typeof room === 'string')) {
                    console.log('Hello', room)
                    socket.join(room);
                    console.log(socket.rooms)
                    io.in(room).emit('connected', socket.id);
                }
            });

            socket.on("typing", (room) => socket.in(room).emit("typing"));

            socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

            socket.on("send-message", async (messageInfor) => {
                console.log(socket.rooms)
                try {
                    //const messageInfor = JSON.parse(message);
                    const chatId = messageInfor.room;
                    const newMessage = new messageSchema({
                        conversation: chatId,
                        sender: messageInfor.sender,
                        text: messageInfor.text,
                    });
                    const isSuccess = await newMessage.save();
                    if (isSuccess) {
                        //console.log("send-message", messageInfor);
                        await conversationSchema.findOneAndUpdate({ _id: chatId }, {
                            lastMessage: messageInfor.text,
                        });
                        //socket.emit("receive-message", messageInfor);
                        io.to(chatId).emit("receive-message", messageInfor);

                        //io.to(chatId).emit("last-message", { message: messageInfor.text, room: chatId });
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