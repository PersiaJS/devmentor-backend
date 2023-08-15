const update = require("../update");
const db = require("../../../models");

jest.mock("../../../models");

describe("update", () => {
  it("should return true", async () => {
    db.user.update = jest.fn();
    db.user.findOne = jest.fn().mockReturnValueOnce(null);
    db.user.findOne = jest.fn().mockReturnValueOnce({
      firstName: "firstName",
      lastName: "lastName",
      username: "username",
      description: "description",
      website: "website",
      facebook: "facebook",
      twitter: "twitter",
      linkedin: "linkedin",
      telegram: "telegram",
      newsletter: "newsletter",
    });

    const req = {
      body: {
        username: "username",
        firstName: "firstName",
        lastName: "lastName",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await update(req, reply);
    expect(reply.send).toHaveBeenCalled();
  });
});
