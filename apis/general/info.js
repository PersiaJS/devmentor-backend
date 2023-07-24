const info = async (request, reply) => {
  reply.code(200);
  reply.send({
    message: "DevMentor API are working",
  });
};

module.exports = info;
