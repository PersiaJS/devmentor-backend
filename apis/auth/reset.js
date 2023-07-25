const Validator = require("validatorjs");
const uuid = require("uuid");
const { SHA256 } = require("crypto-js");
const db = require("../../models");

const reset = async (request, reply) => {
  const validator = new Validator(request.body, {
    securityHash: "required",
    password: "required",
  });

  if (validator.fails()) {
    reply.code(400);
    reply.send({
      message: "Validation failed",
      errors: validator.errors.all(),
    });
    return;
  }

  const user = await db.User.findOne({
    where: {
      securityHash: request.body.securityHash,
    },
  });

  if (!user) {
    reply.code(400);
    reply.send({
      status: false,
      body: request.body,
      message: "User is not defined",
    });
    return;
  }

  const newSecurityHash = uuid.v1();
  const newData = {};
  newData.password = SHA256(request.body.password).toString();
  newData.securityHash = newSecurityHash;

  await db.User.update(newData, {
    where: {
      securityHash: request.body.securityHash,
    },
  });

  reply.code(200);
  reply.send({
    status: true,
  });
};

module.exports = reset;
