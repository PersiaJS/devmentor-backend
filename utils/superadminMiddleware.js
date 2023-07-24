const { USERS_ROLES } = require("../configs/constants");

const superadminMiddleware = (request, reply, done) => {
  if (request.user.role !== USERS_ROLES.SUPERADMIN) {
    reply.code(401);
    reply.send({
      status: false,
      user: request.user,
      message: "You are not allowed to perform this action",
    });
    return;
  }
  done();
};

module.exports = superadminMiddleware;
