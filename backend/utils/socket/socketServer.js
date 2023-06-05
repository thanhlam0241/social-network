const http = require('http');
const { Server } = require("socket.io");
const authenticateTokenSocket = require('../../middleware/authenTokenSocket');
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

    io.on("connection", (socket) => {
        if (socket.recovered) {
            console.log("recovered");
            // recovery was successful: socket.id, socket.rooms and socket.data were restored
        }
        else {
            io.use(authenticateTokenSocket);

            socket.on("setup", (userData) => {
                socket.join(userData._id);
                socket.emit("connected");
            });

            socket.on('join-room', (room) => {
                socket.join(room);
            });

            socket.on("typing", (room) => socket.in(room).emit("typing"));

            socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

            // {
            //     chat: {
            //         users: [User],
            //             chatId: number
            //     },
            //     sender: {
            //         _id: string,
            //     }
            // }
            socket.on("chat message", (messageInfor) => {
                const chat = messageInfor.chat;

                if (!chat?.users) return console.log("chat.users not defined");

                chat.users.forEach((user) => {
                    if (user._id == messageInfor.sender._id) return;
                    socket.in(user._id).emit("message recieved", messageInfor);
                });
            });

            socket.off("setup", () => {
                console.log("USER DISCONNECTED");
                socket.leave(userData._id);
            });

            socket.on('disconnect', () => {
                console.log('disconnected');
            });
        }
    });
    return { server, io };
}

module.exports = createServerSocket;