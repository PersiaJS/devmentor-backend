const db = require("../../models");

const getByUserId = async (request, reply) => {
  const mentor = await db.mentor.findOne({
    where: {
      userId: request.params.userId,
    },
    include: [
      {
        model: db.user,
        attributes: ["id", "firstName", "lastName", "image", "email"],
      },
    ],
  });

  reply.code(200);

  reply.send({
    status: true,
    message: "Mentor retrieved successfully",
    data: mentor,
  });
};

module.exports = getByUserId;
