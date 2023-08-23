const { Op } = require("sequelize");
const db = require("../../models");

const update = async (request, reply) => {
  const checkForUsername = await db.user.findOne({
    where: {
      username: request.body.username,
      id: {
        [Op.ne]: request.user?.id,
      },
    },
  });

  if (checkForUsername) {
    reply.code(400);
    reply.send({
      status: false,
      message: "Slug already exists",
    });
    return;
  }

  const user = await db.user.findOne({
    where: {
      id: request.user?.id,
    },
  });

  const newData = {};
  newData.firstName = request.body.firstName || user.firstName;
  newData.lastName = request.body.lastName || user.lastName;
  newData.username = request.body.username || user.username;
  newData.description = request.body.description || user.description;
  newData.website = request.body.website || user.website;
  newData.facebook = request.body.facebook || user.facebook;
  newData.twitter = request.body.twitter || user.twitter;
  newData.linkedin = request.body.linkedin || user.linkedin;
  newData.telegram = request.body.telegram || user.telegram;
  newData.newsletter = request.body.newsletter || user.newsletter;
  newData.image = request.body.image || user.image;

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

module.exports = update;
