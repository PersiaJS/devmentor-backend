const register = require("./register");
const login = require("./login");
const confirm = require("./confirm");
const forget = require("./forget");
const reset = require("./reset");
const sendVerificationEmail = require("./send-verification-email");

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
  fastify.post(
    "/auth/login",
    {
      schema: {
        tags: ["auth"],
        summary: "Login",
        body: {
          type: "object",
          properties: {
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
              user: {
                type: "object",
                properties: {
                  firstName: { type: "string" },
                  lastName: { type: "string" },
                  verified: { type: "boolean" },
                },
              },
              jwt: {
                type: "object",
                properties: {
                  token: { type: "string" },
                  expiresIn: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    login
  );
  fastify.post(
    "/auth/confirm",
    {
      schema: {
        tags: ["auth"],
        summary: "Confirm",
        body: {
          type: "object",
          properties: {
            securityHash: { type: "string" },
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
    confirm
  );
  fastify.post(
    "/auth/forget",
    {
      schema: {
        tags: ["auth"],
        summary: "Forget",
        body: {
          type: "object",
          properties: {
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
    forget
  );
  fastify.post(
    "/auth/reset",
    {
      schema: {
        tags: ["auth"],
        summary: "Reset",
        body: {
          type: "object",
          properties: {
            securityHash: { type: "string" },
            password: { type: "string" },
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
    reset
  );
  fastify.post(
    "/auth/send-verification-email",
    {
      schema: {
        tags: ["auth"],
        summary: "Send Verification Email",
        body: {
          type: "object",
          properties: {
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
    sendVerificationEmail
  );
}

module.exports = routes;
