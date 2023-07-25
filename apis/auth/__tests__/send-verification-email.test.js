const sendVerificationEmail = require("../send-verification-email");
const MESSAGES = require("../../../utils/messages");
const sendEmail = require("../../../utils/sendEmail");
const db = require("../../../models");

jest.mock("../../../models");
jest.mock("../../../utils/sendEmail");

describe("sendVerificationEmail", () => {
  beforeAll(() => {
    jest.resetModules();
  });
  it("should return 200", async () => {
    db.User.findOne = jest.fn().mockResolvedValue({
      id: "test",
      first_name: "test",
      last_name: "test",
      email: "test@test.com",
      verified: 0,
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
    await sendVerificationEmail(req, reply);
    expect(reply.send).toHaveBeenCalled();
    expect(sendEmail).toHaveBeenCalled();
  });
  it("should return user is not defined", async () => {
    db.User.findOne = jest.fn().mockResolvedValue(null);
    const req = {
      body: {
        email: "test@test.com",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await sendVerificationEmail(req, reply);
    expect(reply.send).toHaveBeenCalled();
  });
  it("should return user is already verified", async () => {
    db.User.findOne = jest.fn().mockResolvedValue({
      id: "test",
      first_name: "test",
      last_name: "test",
      email: "test@test.com",
      verified: 1,
    });
    const req = {
      body: {
        email: "test@test.com",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await sendVerificationEmail(req, reply);
    expect(reply.send).toHaveBeenCalled();
    expect(sendEmail).toHaveBeenCalled();
  });
});
