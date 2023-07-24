const register = require("./register");

async function routes(fastify) {
  fastify.post(
    "/auth/register",
    {
      schema: {
        tags: ["auth"],
        summary: "Register",
        body: {
          type: "object",
          properties: {
            firstName: { type: "string" },
            lastName: { type: "string" },
            password: { type: "string" },
            email: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "boolean" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    register
  );
}

module.exports = routes;
