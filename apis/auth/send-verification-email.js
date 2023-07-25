const Validator = require("validatorjs");
const sendEmail = require("../../utils/sendEmail");
const db = require("../../models");

const sendVerificationEmail = async (request, reply) => {
  const validator = new Validator(request.body, {
    email: "required",
  });

  if (validator.fails()) {
    reply.code(400);
    reply.send({
      message: "Validation failed",
      errors: validator.errors.all(),
    });
    return;
  }

  const emailLowerdCase = request.body.email.toLowerCase();
  const user = await db.User.findOne({
    where: {
      email: emailLowerdCase,
    },
  });

  if (!user) {
    reply.code(400);
    reply.send({
      status: false,
      message: "user is not defined",
    });
    return;
  }
  if (user.verified === 1) {
    reply.code(400);
    reply.send({
      status: true,
      message: "user is verified",
    });
    return;
  }

  await sendEmail({
    firstName: user.firstName,
    to: user.email,
    subject: "Confirm Email",
    content:
      "You are receiving this email for your registration in PersiaJS Website, please confirm your email",
    link: `https://devmentor.net/auth/verify?registerEmailToken=${user.securityHash}`,
    buttonName: "Confirm Email",
  });

  reply.code(200);
  reply.send({
    status: true,
    user,
  });
};

module.exports = sendVerificationEmail;
