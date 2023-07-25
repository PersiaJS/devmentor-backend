const register = require("../register");
const db = require("../../../models");

jest.mock("../../../models");
jest.mock("../../../utils/sendEmail");

describe("register", () => {
  beforeAll(() => {
    jest.resetModules();
  });
  it("should return 200", async () => {
    db.User.create = jest.fn().mockResolvedValue({});
    db.User.findOne = jest.fn().mockResolvedValue(null);
    const req = {
      body: {
        firstName: "test",
        lastName: "test",
        password: "test",
        email: "me@ehsangazar.com",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await register(req, reply);
    expect(reply.send).toHaveBeenCalled();
  });
  it("should return user is already defined", async () => {
    db.User.create = jest.fn().mockResolvedValue({});
    db.User.findOne = jest.fn().mockResolvedValue({
      id: "test",
      firstName: "test",
      lastName: "test",
      email: "me@ehsangazar.com",
    });
    const req = {
      body: {
        firstName: "test",
        lastName: "test",
        password: "test",
        email: "me@ehsangazar.com",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await register(req, reply);
    expect(reply.send).toHaveBeenCalled();
  });
});
