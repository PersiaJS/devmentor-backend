const db = require("../../models");

const get = async (request, reply) => {
  const mentor = await db.mentor.findOne({
    where: {
      id: request.params.id,
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

module.exports = get;
