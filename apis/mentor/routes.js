const protectedMiddleware = require("../../utils/protectedMiddleware");
const create = require("./create");
const list = require("./list");

async function routes(fastify) {
  fastify.post(
    "/mentor/create",
    {
      schema: {
        preValidation: protectedMiddleware,
        tags: ["mentor"],
        summary: "Create mentor",
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
        },
        body: {
          type: "object",
          properties: {
            company: { type: "string" },
            job: { type: "string" },
            location: { type: "string" },
            category: { type: "string" },
            skills: { type: "string" },
            bio: { type: "string" },
            intro: { type: "string" },
            why: { type: "string" },
            achievement: { type: "string" },
            twitter: { type: "string" },
            linkedin: { type: "string" },
            website: { type: "string" },
            article: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "boolean" },
              message: { type: "string" },
              data: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  company: { type: "string" },
                  job: { type: "string" },
                  location: { type: "string" },
                  category: { type: "string" },
                  skills: { type: "string" },
                  bio: { type: "string" },
                  intro: { type: "string" },
                  why: { type: "string" },
                  achievement: { type: "string" },
                  twitter: { type: "string" },
                  linkedin: { type: "string" },
                  website: { type: "string" },
                  article: { type: "string" },
                  user_id: { type: "string" },
                  createdAt: { type: "string" },
                  updatedAt: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    create
  );

  fastify.get(
    "/mentor/list",
    {
      schema: {
        tags: ["mentor"],
        summary: "List mentors",
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "boolean" },
              message: { type: "string" },
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    company: { type: "string" },
                    job: { type: "string" },
                    location: { type: "string" },
                    category: { type: "string" },
                    skills: { type: "string" },
                    bio: { type: "string" },
                    intro: { type: "string" },
                    why: { type: "string" },
                    achievement: { type: "string" },
                    twitter: { type: "string" },
                    linkedin: { type: "string" },
                    website: { type: "string" },
                    article: { type: "string" },
                    user_id: { type: "string" },
                    createdAt: { type: "string" },
                    updatedAt: { type: "string" },
                    user: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        firstName: { type: "string" },
                        lastName: { type: "string" },
                        image: { type: "string" },
                        email: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    list
  );
}

module.exports = routes;
