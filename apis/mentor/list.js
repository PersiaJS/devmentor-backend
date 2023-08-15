const db = require("../../models");

const list = async (request, reply) => {
  const limit = request.query.limit || 10;
  const page = request.query.page || 1;

  const mentors = await db.mentor.findAll({
    limit,
    offset: (page - 1) * limit,
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
    message: "Mentors retrieved successfully",
    data: mentors,
  });
};

module.exports = list;
