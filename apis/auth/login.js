const { SHA256 } = require("crypto-js");
const Validator = require("validatorjs");
const issueJwt = require("../../utils/issueJwt");
const db = require("../../models");

const login = async (request, reply) => {
  const validator = new Validator(request.body, {
    email: "required",
    password: "required",
  });

  if (validator.fails()) {
    reply.code(400);
    reply.send({
      body: request.body,
      message: "Validation failed",
      errors: validator.errors.all(),
    });
    return;
  }

  const user = await db.User.findOne({
    where: {
      email: request.body.email.toLowerCase(),
    },
  });

  if (!user) {
    reply.code(200);
    reply.send({
      status: false,
      verified: true,
      message: "User not found",
    });
    return;
  }

  // IF USER IS NOT VERIFIED
  if (!user.verified) {
    reply.code(200);
    reply.send({
      status: false,
      verified: false,
      message: "User is not verified",
      user: {
        id: user.id,
        email: user.email,
        verified: user.verified,
      },
    });
    return;
  }

  // IS PASSWORD MATCH
  const passwordHashed = SHA256(request.body.password).toString();
  if (passwordHashed !== user.password) {
    reply.code(200);
    reply.send({
      status: false,
      verified: true,
      message: "Password is incorrect",
    });
    return;
  }
  const jwtToken = issueJwt({
    id: user.id,
  });

  const newData = {};
  newData.lastLogged = new Date().getTime();

  await db.User.update(newData, {
    where: {
      id: user.id,
    },
  });

  reply.code(200);
  reply.send({
    status: true,
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      verified: user.verified,
    },
    jwt: {
      token: jwtToken.token,
      expiresIn: jwtToken.expires,
    },
    message: "Login successful2",
  });
};

module.exports = login;
