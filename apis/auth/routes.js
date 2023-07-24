const register = require("./register");

async function routes(fastify, options) {
  fastify.post("/auth/register", register);
}

module.exports = routes;
