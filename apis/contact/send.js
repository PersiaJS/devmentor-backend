const sendEmail = require("../../utils/sendEmail");
const Validator = require("validatorjs");

const send = async (request, reply) => {
  const validator = new Validator(request.body, {
    firstName: "required",
    lastName: "required",
    section: "required",
    email: "required|email",
    message: "required",
  });

  if (validator.fails()) {
    reply.code(400);
    reply.send({
      message: "Validation failed",
      errors: validator.errors.all(),
    });
    return;
  }

  await sendEmail({
    firstName: request.body.firstName,
    to: "me@ehsangazar.com",
    subject: "New User in DevMentor",
    content: `
            New User Registered in DevMentor
            <br />
            First Name: ${request.body.firstName}
            <br />
            Last Name ${request.body.lastName}
            <br />
            Email: ${request.body.email}
            <br />
            Section: ${request.body.section}
            <br />
            Message: ${request.body.message}
            <br />
            Website: ${request.body.website}
            `,
    link: `${process.env.CLIENT_URL}/`,
    buttonName: "VISIT WEBSITE",
  });

  reply.code(200);
  reply.send({
    status: true,
  });
};

module.exports = send;
