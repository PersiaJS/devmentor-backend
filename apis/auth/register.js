const Validator = require("validatorjs");
const issueJwt = require("../../utils/issueJwt");
const uuid = require("uuid");
const { SHA256 } = require("crypto-js");
const db = require("../../models");
const ROLE = require("../../constants/ROLE");
const USER_STATUS = require("../../constants/USER_STATUS");

const register = async (request, reply) => {
  const validator = new Validator(request.body, {
    firstName: "required",
    lastName: "required",
    password: "required",
    email: "required|email",
  });

  if (validator.fails()) {
    reply.code(400);
    reply.send({
      message: "Validation failed",
      errors: validator.errors.all(),
    });
    return;
  }

  const checkForExistenceOfUserByEmail = await db.User.findOne({
    where: {
      email: request.body.email.toLowerCase(),
    },
  });

  if (checkForExistenceOfUserByEmail) {
    reply.code(400);
    reply.send({
      status: false,
      message: "User with this email already exists",
    });
    return;
  }

  // TODO: SLUG SHOULD BE UNIQUE CHECK
  const id = uuid.v1();
  const securityHash = uuid.v1();
  const passwordHashed = SHA256(request.body.password).toString();
  const newUser = await db.User.create({
    id,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email.toLowerCase(),
    username: id,
    verified: false,
    password: passwordHashed,
    securityHash: securityHash,
    securityHashExpiry: Date.now() + 3600000,
    description: "",
    image: "https://i.imgur.com/6VBx3io.png",
    website: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    telegram: "",
    lastLogged: Date.now(),
    role: ROLE.USER,
    status: USER_STATUS.ACTIVE,
    newsletter: true,
  });

  if (!newUser) {
    reply.send({
      status: false,
      message: "Something went wrong",
    });
    return;
  }

  const jwtToken = issueJwt({
    id: newUser.id,
  });

  reply.code(200);
  reply.send({
    status: true,
    jwt: jwtToken,
  });
};

module.exports = register;
