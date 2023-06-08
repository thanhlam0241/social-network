require('dotenv').config();
const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(process.env.DATABASE_URL
            , {
                useNewUrlParser: true,
                //useUnifiedTopology: true,
                //useCreateIndex: true,
                serverSelectionTimeoutMS: 3000,
            }
        );
        console.log("Connect successfully");
    } catch (error) {
        console.log("Connect to the database failed", error);
    }
}

module.exports = { connect };