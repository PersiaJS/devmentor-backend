const fastifyPassport = require("@fastify/passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../models");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

fastifyPassport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await db.User.findOne({
        where: { id: payload.sub },
        attributes: {
          exclude: ["password", "securityHash"],
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
