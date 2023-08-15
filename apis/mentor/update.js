const Validator = require("validatorjs");
const db = require("../../models");

const update = async (request, reply) => {
  const validator = new Validator(request.body, {
    company: "required",
    job: "required",
    location: "required",
    category: "required",
    skills: "required",
    bio: "required",
    intro: "required",
    why: "required",
    achievement: "required",
  });

  if (validator.fails()) {
    reply.code(400);
    reply.send({
      message: "Validation failed",
      errors: validator.errors.all(),
    });
    return;
  }

  // check if mentor already exists
  const mentor = await db.mentor.findOne({
    where: {
      user_id: request.user.id,
    },
  });

  if (!mentor) {
    reply.code(400);
    reply.send({
      status: false,
      message: "Mentor does not exist",
    });
    return;
  }

  await db.mentor.update(
    {
      company: request.body.company,
      job: request.body.job,
      location: request.body.location,
      category: request.body.category,
      skills: request.body.skills,
      bio: request.body.bio,
      intro: request.body.intro,
      why: request.body.why,
      achievement: request.body.achievement,
      twitter: request.body.twitter,
      linkedin: request.body.linkedin,
      website: request.body.website,
      article: request.body.article,
      status: request.body.status || false,
    },
    {
      where: {
        user_id: request.user.id,
      },
    }
  );

  reply.code(200);

  reply.send({
    status: true,
    message: "Mentor updated successfully",
  });
};

module.exports = update;
