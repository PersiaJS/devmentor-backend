const sendEmail = require("../../utils/sendEmail");
const Validator = require("validatorjs");
const db = require("../../models");

const forget = async (request, reply) => {
  const validator = new Validator(request.body, {
    email: "required|email",
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
      status: true,
    });
    return;
  }

  await sendEmail({
    to: emailLowerdCase,
    firstName: user.firstName,
    subject: "Forget Password",
    content: "If you want to reset your password click on the button below",
    link: `https://devmentor.net/auth/reset?forgotEmailToken=${user.securityHash}`,
    buttonName: "Reset Password",
  });
  await sendEmail({
    firstName: user.firstName,
    to: "me@ehsangazar.com",
    subject: "Forget Password",
    content: `User with email ${emailLowerdCase} requested to reset password`,
    link: `${process.env.CLIENT_URL}/auth/reset?forgotEmailToken=${user.securityHash}`,
    buttonName: "Reset Password",
  });

  reply.code(200);
  reply.send({
    status: true,
    message: "success",
  });
};

module.exports = forget;
