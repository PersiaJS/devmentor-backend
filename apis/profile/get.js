const getMyProfileApi = async (request, reply) => {
  reply.code(200);
  reply.send({
    status: true,
    user: request.user,
  });
};

module.exports = getMyProfileApi;
