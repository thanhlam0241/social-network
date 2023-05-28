require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const morgan = require('morgan');
// const createError = require('http-errors');


const { logger } = require('./middleware/logEvents');
const { errorHandler } = require('./middleware/errorHandler');
const corsOptions = require('./utils/config/corsOption');
const { connect } = require('./utils/config/db');


// const resIdentify = require('./utils/proto/clientNode')

// const clientRedis = require('./utils/database/connection_redis');
const authenticateToken = require('./middleware/authenToken');
// require('./utils/connection_mongodb');

const app = express();



app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/views' + '/index.html');
});

const PORT = process.env.PORT || 3500;

connect();

app.use(helmet());
app.use(morgan('common'));

//custom middleware logger
app.use(logger);

//middlerware cors option
app.use(cors(corsOptions));

//built-in middleware to handler urlencoded data
// in other word, form data:
//'content-type': application/x-www-form-urlencoded
// app.use(express.urlencoded({
//     extended: false
// }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// built-in middleware for json
app.use(express.json());

//built-in middleware to serve static file
app.use('/static', express.static('static'));
// app.use('/avatar', express.static('uploads/avatar'));
app.use('/node_modules', express.static('node_modules'));

app.use('/', require('./routes/root'))

app.use('/face', require('./routes/api/face'));

app.get('/identify', async (req, res) => {
    const message = await resIdentify.identifycationByVideo('C:/Users/HP PAVILION/Pictures/Camera Roll/WIN_20230523_13_43_24_Pro.mp4')
    res.json(message)
})
// middleware to authenticate token
app.use(authenticateToken);

app.use('/users', require('./routes/api/users'));
app.use('/images/avatar', require('./routes/api/avatar'));
app.use('/todo', require('./routes/api/todo'));


// Route handlers
app.all('/*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({
            error: '404 NOT FOUND',
        })
    }
    else {
        res.type('txt').send('404 NOT FOUND');
    }
});

// middleware handles error
app.use(errorHandler);

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});
io.on("connection", (socket) => {
    console.log("We are live and connected");
    console.log(socket.id);

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('create-something', (msg) => {
        console.log(msg);
        socket.emit('foo', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



server.listen(PORT, () => console.log(`Server running on port ${PORT}`));