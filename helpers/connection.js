var redis = require("redis");

async function start() {
    var cacheHostName = "sisdis.redis.cache.windows.net";
    var cachePassword = "eDSh9bs30M6mnQOklgtcRNYlMZLy6kWkUAzCaAvlcIw=";
    var cacheConnection = redis.createClient({
        // rediss for TLS
        url: "rediss://" + cacheHostName + ":6380",
        password: cachePassword,
    });
    await cacheConnection.connect();
    console.log("Conexión establecida")
    return cacheConnection;
}

module.exports = start();