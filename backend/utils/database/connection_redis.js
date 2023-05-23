const redis = require('redis');

const client = redis.createClient(
    {
        port: 6379,
        host: '127.0.0.1'
    }
);
client.on('error', err => console.log('Redis Client Error', err));

client.connect();

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('ready', () => {
    console.log('Redis client ready');
});

module.exports = client;