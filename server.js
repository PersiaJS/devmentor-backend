const Fastify = require("fastify");
const path = require("path");
let variablePath = "";
if (process.env.NODE_ENV === "production") {
  variablePath = path.join(__dirname, "/variables-production.env");
} else {
  variablePath = path.join(__dirname, "/variables.env");
}
require("dotenv").config({ path: variablePath });
const cors = require("@fastify/cors");
const cookie = require("@fastify/cookie");
const fastifyPassport = require("@fastify/passport");
const fastifySession = require("@fastify/secure-session");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUI = require("@fastify/swagger-ui");

const generalRoutes = require("./apis/general/routes");
const authRoutes = require("./apis/auth/routes");
const profileRoutes = require("./apis/profile/routes");
const contactRoutes = require("./apis/contact/routes");

const server = Fastify({ logger: true });

server.register(cors);
server.register(cookie);
server.register(fastifySession, {
  key: Buffer.from(process.env.SECRET_KEY, "hex"),
  cookie: {
    path: "/",
  },
});
server.register(fastifyPassport.initialize());
server.register(fastifyPassport.secureSession());
server.register(fastifySwagger, {
  routePrefix: "/docs",
  exposeRoute: true,
});
server.register(fastifySwaggerUI, {
  routePrefix: "/docs",
  swagger: {
    url: "/docs/json",
  },
  exposeRoute: true,
});

server.register(generalRoutes);
server.register(authRoutes);
server.register(profileRoutes);
server.register(contactRoutes);

const start = async () => {
  try {
    await server.listen({ port: process.env.PORT || 8080, host: "0.0.0.0" });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
