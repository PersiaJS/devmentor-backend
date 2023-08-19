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
    host: process.env.SES_URL,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SES_USER,
      pass: process.env.SES_PASSWORD,
    },
  });

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
