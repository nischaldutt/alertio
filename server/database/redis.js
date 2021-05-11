const redis = require("redis");

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || "localhost",
  password: process.env.REDIS_PASSWORD,
  port: process.env.REDIS_PORT || 6376,
});

redisClient.on("connect", (err) => {
  console.log(`Redis connected at port ${process.env.REDIS_PORT}`);
});

redisClient.on("error", (error) => {
  console.log("Error occurred while connecting to redis database.");
  console.log(error);
});

module.exports = redisClient;
