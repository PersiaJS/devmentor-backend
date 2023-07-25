const confirm = require("../confirm");
const db = require("../../../models");

jest.mock("../../../models");

describe("confirm", () => {
  beforeAll(() => {
    jest.resetModules();
  });
  it("should return 200", async () => {
    db.User.findOne = jest.fn().mockResolvedValue({
      id: "test",
      first_name: "test",
      last_name: "test",
      email: "test@test.com",
    });
    const req = {
      body: {
        securityHash: "test",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await confirm(req, reply);
    expect(reply.send).toHaveBeenCalled();
  });
  it("should return user is not defined", async () => {
    db.User.findOne = jest.fn().mockResolvedValue(null);
    const req = {
      body: {
        securityHash: "test",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await confirm(req, reply);
    expect(reply.send).toHaveBeenCalled();
  });
});
