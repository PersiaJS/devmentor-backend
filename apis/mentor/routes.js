const protectedMiddleware = require("../../utils/protectedMiddleware");
const create = require("./create");
const list = require("./list");
const get = require("./get");
const update = require("./update");
const getByUserId = require("./getByUserId");

async function routes(fastify) {
  fastify.post(
    "/mentor/create",
    {
      preValidation: protectedMiddleware,
      schema: {
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

  fastify.get(
    "/mentor/:id",
    {
      schema: {
        tags: ["mentor"],
        summary: "Get mentor",
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
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
    get
  );

  fastify.put(
    "/mentor/:id",
    {
      preValidation: protectedMiddleware,
      schema: {
        tags: ["mentor"],
        summary: "Update mentor",
        headers: {
          type: "object",
          properties: {
            Authorization: { type: "string" },
          },
        },
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
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
            statis: { type: "boolean" },
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
    update
  );

  fastify.get(
    "/mentor/user/:userId",
    {
      schema: {
        tags: ["mentor"],
        summary: "Get mentor by user id",
        params: {
          type: "object",
          properties: {
            userId: { type: "string" },
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
    getByUserId
  );
}

module.exports = routes;
