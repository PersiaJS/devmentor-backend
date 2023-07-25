const reset = require("../reset");
const MESSAGES = require("../../../utils/messages");
const db = require("../../../models");

jest.mock("../../../models");

describe("reset", () => {
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
        password: "test",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await reset(req, reply);
    expect(reply.send).toHaveBeenCalled();
  });
  it("should return user is not defined", async () => {
    db.User.findOne = jest.fn().mockResolvedValue(null);
    const req = {
      body: {
        securityHash: "test",
        password: "test",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await reset(req, reply);
    expect(reply.send).toHaveBeenCalled();
  });
});
