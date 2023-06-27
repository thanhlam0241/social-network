require('dotenv-flow').config({ override: true });
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const morgan = require('morgan');
// const createError = require('http-errors');

const { logger } = require('./middleware/logEvents');
const { errorHandler } = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOption');
const { connect } = require('./config/db');

// const clientRedis = require('./utils/database/connection_redis');
const authenticateToken = require('./middleware/authenToken');
// require('./utils/connection_mongodb');

const app = express();

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

app.use('/api/', require('./routes/root'))

// // middleware to authenticate token
// app.use(authenticateToken);

app.use('/users', authenticateToken, require('./routes/api/users'));
app.use('/images/avatar', authenticateToken, require('./routes/api/avatar'));
app.use('/todo', authenticateToken, require('./routes/api/todo'));


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


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));