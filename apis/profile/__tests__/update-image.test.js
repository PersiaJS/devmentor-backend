const updateImage = require("../update-image");
const db = require("../../../models");

jest.mock("../../../models");

describe("update", () => {
  it("should return true", async () => {
    db.User.update = jest.fn();
    const req = {
      body: {
        image: "image",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await updateImage(req, reply);
    expect(reply.send).toHaveBeenCalled();
  });
});
