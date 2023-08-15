const fs = require("fs");
const jsonwebtoken = require("jsonwebtoken");
const pathToKey = require("path").join(__dirname, "../../jwtRS256.key");
const SECRET_OR_KEY = fs.readFileSync(pathToKey, "utf-8");
const db = require("../../models");

const userMiddleware = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jsonwebtoken.verify(token, SECRET_OR_KEY);
    const user = await db.user.findOne({
      where: { id: payload.sub },
      attributes: {
        exclude: ["password", "securityHash"],
      },
    });

    req.user = user;
  }

  next();
};
module.exports = userMiddleware;
