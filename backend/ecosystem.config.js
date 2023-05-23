module.exports = {
    apps: [
        {
            name: "server",
            script: "./server.js",
            watch: true,
            env_development: {
                "NODE_ENV": "development",
                "PORT": 3500,
                "DATABASE_URL": "mongodb://localhost:27017/express_start",
            },
            env_production: {
                "NODE_ENV": "production",
                "PORT": 3500,
                "DATABASE_URL": "mongodb://localhost:27017/express_start",
            },
        }],
}