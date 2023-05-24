const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const methodString = (s) => {
    if (!s) {
        s = 'undefinded'
    }
    let astring = '';
    for (let i = 0; i < 10 - s.length; i++) {
        astring += ' ';
    }
    return s + astring;
}

const originString = (s) => {
    if (!s) {
        s = 'undefinded'
    }
    let astring = '';
    for (let i = 0; i < 20 - s.length; i++) {
        astring += ' ';
    }
    return s + astring;
}

const urlString = (s) => {
    if (!s) {
        s = 'undefinded'
    }
    let astring = '';
    for (let i = 0; i < 20 - s.length; i++) {
        astring += ' ';
    }
    return s + astring;
}

const ipString = (s) => {
    if (!s) {
        s = 'undefinded'
    }
    let astring = '';
    for (let i = 0; i < 20 - s.length; i++) {
        astring += ' ';
    }
    return s + astring;
}

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'utils', 'logs'))) {
            await fsPromises.
                mkdir(path.join(__dirname, '..', 'utils', 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'utils', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${methodString(req.method)}\t\t${originString(req.headers.origin)}\t${urlString(req.url)}\t${ipString(req.ip)}`, 'reqLog.txt');
    console.log(`${req.method} ${req.url}`)
    next();
}

module.exports = { logEvents, logger };