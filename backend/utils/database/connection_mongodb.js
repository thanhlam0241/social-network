require('dotenv').config();
const mongoose = require('mongoose');

const conn = mongoose.createConnection(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
        serverSelectionTimeoutMS: 3000,
    });

conn.on('connected', () => {
    console.log('Mongoose connection is open');
});

conn.on('disconnected', () => {
    console.log('Mongoose connection is disconnected');
});

conn.on('error', (err) => {
    console.log('Mongoose connection has occured ' + err + ' error');
});

// process.on('SIGINT', async () => {
//     await conn.close();
//     process.exit(0);
// });

module.exports = conn;
