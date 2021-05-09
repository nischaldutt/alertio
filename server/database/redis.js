const redis = require("redis");

const redisClient = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.HOST,
});

redisClient.on("connect", (err) => {
  console.log(`Redis connected at port ${process.env.REDIS_PORT}`);
});

redisClient.on("error", (error) => {
  console.log("Error occurred while connecting to redis database.");
  console.log(error);
});

module.exports = redisClient;
