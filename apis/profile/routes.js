const updateImage = require("./update-image");
const update = require("./update");
const get = require("./get");
const protectedMiddleware = require("../../utils/protectedMiddleware");

async function routes(fastify, options) {
  fastify.get(
    "/profile/get",
    {
      preValidation: protectedMiddleware,
      schema: {
        tags: ["profile"],
        summary: "Get Profile",
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "boolean" },
              user: {
                type: "object",
                properties: {
                  firstName: { type: "string" },
                  lastName: { type: "string" },
                  email: { type: "string" },
                  verified: { type: "boolean" },
                  username: { type: "string" },
                  verified: { type: "boolean" },
                  description: { type: "string" },
                  image: { type: "string" },
                  website: { type: "string" },
                  facebook: { type: "string" },
                  twitter: { type: "string" },
                  linkedin: { type: "string" },
                  telegram: { type: "string" },
                  lastLogged: { type: "string" },
                  role: { type: "string" },
                  status: { type: "string" },
                  newsletter: { type: "boolean" },
                },
              },
            },
          },
        },
      },
    },
    get
  );
  fastify.put(
    "/profile/update/image",
    {
      preValidation: protectedMiddleware,
      schema: {
        tags: ["profile"],
        summary: "Update Profile Image",
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
        },
        body: {
          type: "object",
          properties: {
            image: { type: "string" },
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
    updateImage
  );
  fastify.put(
    "/profile/update",
    {
      preValidation: protectedMiddleware,
      schema: {
        tags: ["profile"],
        summary: "Update Profile",
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
        },
        body: {
          type: "object",
          properties: {
            firstName: { type: "string" },
            lastName: { type: "string" },
            username: { type: "string" },
            description: { type: "string" },
            website: { type: "string" },
            facebook: { type: "string" },
            twitter: { type: "string" },
            linkedin: { type: "string" },
            telegram: { type: "string" },
            newsletter: { type: "boolean" },
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
    update
  );
}

module.exports = routes;
