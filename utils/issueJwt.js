const jsonwebtoken = require("jsonwebtoken");

const issueJwt = ({ id }) => {
  const expiresIn = "1w";

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const secretKey = process.env.SECRET_KEY || "secret";
  const signedToken = jsonwebtoken.sign(payload, secretKey, {
    expiresIn: expiresIn,
  });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
};

module.exports = issueJwt;
