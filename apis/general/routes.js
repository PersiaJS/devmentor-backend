const info = require("./info");

async function routes(fastify) {
  fastify.get(
    "/",
    {
      schema: {
        tags: ["general"],
        summary: "Get API info",
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    info
  );
}

module.exports = routes;
