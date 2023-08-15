const Validator = require("validatorjs");
const db = require("../../models");

const confirm = async (request, reply) => {
  const validator = new Validator(request.body, {
    securityHash: "required",
  });

  if (validator.fails()) {
    reply.code(400);
    reply.send({
      message: "Validation failed",
      errors: validator.errors.all(),
    });
    return;
  }

  const user = await db.user.findOne({
    where: {
      securityHash: request.body.securityHash,
    },
  });

  if (!user) {
    reply.code(400);
    reply.send({
      status: false,
      message: "User is not defined",
    });
    return;
  }

  const newData = {};
  newData.verified = true;

  await db.user.update(newData, {
    where: {
      securityHash: request.body.securityHash,
    },
  });

  reply.code(200);
  reply.send({
    status: true,
  });
};

module.exports = confirm;
