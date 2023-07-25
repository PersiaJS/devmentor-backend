const nodemailer = require("nodemailer");
const emailTemplate = require("./emailTemplate");

async function sendEmail({
  to,
  subject,
  content,
  link,
  buttonName,
  firstName,
  newsletter,
  slug,
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SEND_IN_BLUE_URL,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SEND_IN_BLUE_USER,
      pass: process.env.SEND_IN_BLUE_PASSWORD,
    },
  });

  if (process.env.NODE_ENV === "development") {
    console.log("Email sent to: ", to);
    console.log("Email subject: ", subject);
    console.log("Email content: ", content);
    console.log("Email link: ", link);
    console.log("Email buttonName: ", buttonName);
    console.log("Email firstName: ", firstName);
    console.log("Email newsletter: ", newsletter);
    console.log("Email slug: ", slug);
    return;
  }

  await transporter.sendMail({
    from: `"DevMentor" <${process.env.SEND_FROM_EMAIL}>`,
    to,
    subject,
    html: emailTemplate({
      subject,
      link,
      buttonName,
      content,
      firstName,
      newsletter,
      slug,
    }),
  });
}

module.exports = sendEmail;
