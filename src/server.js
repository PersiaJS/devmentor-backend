import path from "path";
require("dotenv").config({ path: path.join(__dirname, "/variables.env") });

import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});

fastify.get("/", async (request, reply) => {
  return { hello: "world v2" };
});

const start = async () => {
  try {
    await fastify.listen({
      port: process.env.PORT || 8080,
      host: "0.0.0.0",
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
