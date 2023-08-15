const Validator = require("validatorjs");
const db = require("../../models");
const uuid = require("uuid");

const create = async (request, reply) => {
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

  const id = uuid.v1();
  const newMentor = await db.mentor.create({
    id,
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
    user_id: request.user.id,
    article: request.body.article,
  });

  reply.code(200);

  reply.send({
    status: true,
    message: "Mentor created successfully",
    data: newMentor,
  });
};

module.exports = create;
