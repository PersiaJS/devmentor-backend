const Validator = require("validatorjs");
const db = require("../../models");

const updateMyProfileImageApi = async (request, reply) => {
  const validator = new Validator(request.body, {
    image: "required",
  });

  if (validator.fails()) {
    reply.code(400);
    reply.send({
      message: "Validation failed",
      errors: validator.errors.all(),
    });
    return;
  }

  const newData = {};
  newData.image = request.body.image;

  await db.user.update(newData, {
    where: {
      id: request.user?.id,
    },
  });

  reply.code(200);
  reply.send({
    status: true,
  });
};

module.exports = updateMyProfileImageApi;
