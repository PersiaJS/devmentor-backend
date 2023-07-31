const send = require("./send");

async function routes(fastify, options) {
  fastify.post(
    "/contact/send",
    {
      schema: {
        tags: ["contact"],
        summary: "Send Contact",
        body: {
          type: "object",
          properties: {
            firstName: { type: "string" },
            lastName: { type: "string" },
            section: { type: "string" },
            email: { type: "string" },
            message: { type: "string" },
            website: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "boolean" },
            },
          },
        },
      },
    },
    send
  );
}

module.exports = routes;
