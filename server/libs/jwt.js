const jwt = require("jsonwebtoken");

const redisClient = require("../database/redis");
const libUtilities = require("../utilities/libUtilities");
const CONSTANTS = require("../properties/constants");

const createAccessToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "1m",
  });
  return token;
};
module.exports.createAccessToken = createAccessToken;

module.exports.createRefreshToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
    expiresIn: "7d",
  });
  return token;
};

module.exports.verifyAccessToken = (req, res, next) => {
  // extract access token from the request header from the client
  const authHeader = req.headers["authorization"];
  // authorization is in form ==> "BEARER ACCESS_TOKEN"
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    res
      .status(CONSTANTS.responseFlags.UNAUTHORIZED_REQUEST)
      .json(libUtilities.accessTokenMissing({ error: "Access token missing" }));
  } else {
    jwt.verify(accessToken, process.env.JWT_PRIVATE_KEY, (err, payload) => {
      console.log({ err, payload });
      return err
        ? res
            .status(CONSTANTS.responseFlags.ACCESS_FORBIDDEN)
            .json(
              libUtilities.accessTokenExpired({ error: "Invalid access token" })
            )
        : ((req.payload = payload), next());
    });
  }
};

module.exports.verifyRefreshToken = (req, res, next) => {
  const { refreshToken } = req.body;
  console.log({ refreshTokenFromReqBody: refreshToken });
  if (!refreshToken) {
    return res.status(CONSTANTS.responseFlags.UNAUTHORIZED_REQUEST).json(
      libUtilities.accessTokenMissing({
        error: "Refresh token missing from request body.",
      })
    );
  }

  return jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_KEY,
    (err, decryptedRefreshToken) => {
      console.log({ err, decryptedRefreshToken });
      if (err) {
        return res.status(CONSTANTS.responseFlags.ACCESS_FORBIDDEN).json(
          libUtilities.accessTokenExpired({
            error: "Error in verifying the refresh token",
          })
        );
      }

      const { id } = decryptedRefreshToken;
      redisClient.get(id, (err, refreshTokenFromRedis) => {
        if (err) {
          return res.status(CONSTANTS.responseFlags.UNAUTHORIZED_REQUEST).json(
            libUtilities.accessTokenMissing({
              error: "Refresh token not found in Redis",
            })
          );
        }

        if (refreshToken === refreshTokenFromRedis) {
          const accessToken = createAccessToken({ id });
          console.log({ newAccessTokenGenerated: accessToken });

          return res
            .status(CONSTANTS.responseFlags.ACTION_COMPLETE)
            .json({ accessToken: accessToken });
        }
      });
    }
  );
};
