const getMyProfileApi = async (response, reply) => {
  reply.code(200);
  reply.send({
    status: true,
    user: response.user,
  });
};

module.exports = getMyProfileApi;
