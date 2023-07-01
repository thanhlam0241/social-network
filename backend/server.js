require('dotenv').config({ override: true });
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
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

app.get('/test/users', (req, res) => {
    res.json([
        {
            name: 'test',
            age: 20
        },
        {
            name: 'test2',
            age: 21
        }
    ])
})


app.get('/chatpage', (req, res) => {
    res.sendFile(__dirname + '/views' + '/index.html');
});

const PORT = process.env.PORT || 3500;

connect();

//app.use(helmet());
//app.use(morgan('common'));

//custom middleware logger
//app.use(logger);

//middlerware cors option
app.use(cors(corsOptions));

app.use(cookieParser())

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
app.use('api/static', express.static('static'));

app.use('/api/avatar', (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
}
    , express.static('uploads/avatar'));
app.use('/api/background', (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
}
    , express.static('uploads/background'));
app.use('/api/', require('./routes/root'))

app.use('/node_modules', express.static('node_modules'));

app.use('/api/face', require('./routes/api/face'));

app.use('/api/images/avatar', require('./routes/api/Account/avatar'));

app.use('/api/images/background', require('./routes/api/Account/background'));

// middleware to authenticate token
app.use(authenticateToken);

app.use('/api/users', require('./routes/api/Account/users'));
app.use('/api/todo', require('./routes/api/todo'));
app.use('/api/chat', require('./routes/api/Social/chat'));
app.use('/api/social/friend', require('./routes/api/Social/friend'));
app.use('/api/social/people', require('./routes/api/Social/people'));


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

const createServerSocket = require('./utils/socket/socketServer');

const { server } = createServerSocket(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

server.listen(3001, () => console.log(`Socket server running on port 3001`));