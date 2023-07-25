const forget = require("../forget");
const sendEmail = require("../../../utils/sendEmail");

const db = require("../../../models");

jest.mock("../../../models");

jest.mock("../../../utils/sendEmail");

describe("forget", () => {
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
    sendEmail.mockResolvedValue(true);
    const req = {
      body: {
        email: "test@test.com",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await forget(req, reply);
    expect(reply.send).toHaveBeenCalled();
    expect(sendEmail).toHaveBeenCalledTimes(2);
  });
  it("should return user is not defined", async () => {
    db.User.findOne = jest.fn().mockResolvedValue(null);
    const req = {
      body: {
        email: "notfound@test.com",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await forget(req, reply);
    expect(reply.send).toHaveBeenCalled();
  });
});
