const info = require("./info");

async function routes(fastify) {
  fastify.get("/", info);
}

module.exports = routes;
