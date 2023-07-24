const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "../..", "jwtRS256.key");
const PRIVATE_KEY = fs.readFileSync(pathToKey, "utf-8");

const issueJwt = ({ id }) => {
  const expiresIn = "1w";

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIVATE_KEY, {
    expiresIn,
    algorithm: "RS256",
  });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
};

module.exports = issueJwt;
