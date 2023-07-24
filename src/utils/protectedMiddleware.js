const fastifyPassport = require("@fastify/passport");
const fs = require("fs");
const { Strategy, ExtractJwt } = require("passport-jwt");
const pathToKey = require("path").join(__dirname, "../../jwtRS256.key");
const SECRET_OR_KEY = fs.readFileSync(pathToKey, "utf-8");
const db = require("../../models");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_OR_KEY,
  algorithms: ["RS256"],
};

fastifyPassport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await db.user.findOne({
        where: { id: payload.sub },
        attributes: {
          exclude: ["password", "security_hash"],
        },
      });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = fastifyPassport.authenticate("jwt", {
  session: false,
  failWithError: true,
});
