const login = require("../login");
const db = require("../../../models");

jest.mock("../../../models");

describe("login", () => {
  beforeAll(() => {
    jest.resetModules();
  });
  it("should return 200", async () => {
    db.User.findOne = jest.fn().mockResolvedValue({
      id: "test",
      first_name: "test",
      last_name: "test",
      email: "test@test.com",
      verified: 1,
      password:
        "d9b4d4fd580b8852af7e98118f2be88541ec2d7649895183a0fc56a955022509",
    });
    const req = {
      body: {
        password: "randomepassword",
        email: "test@test.com",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await login(req, reply);
    expect(reply.send).toHaveBeenCalled();
  });

  it("should not return if user is not verified", async () => {
    db.User.findOne = jest.fn().mockResolvedValue({
      id: "test",
      first_name: "test",
      last_name: "test",
      email: "test@test.com",
      verified: 0,
      password:
        "d9b4d4fd580b8852af7e98118f2be88541ec2d7649895183a0fc56a955022509",
    });
    const req = {
      body: {
        password: "randomepassword",
        email: "test@test.com",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await login(req, reply);
    expect(reply.send).toHaveBeenCalled();
  });

  it("should not return if user is not found", async () => {
    db.User.findOne = jest.fn().mockResolvedValue(null);
    const req = {
      body: {
        password: "randomepassword",
        email: "test@test.com",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await login(req, reply);
    expect(reply.send).toHaveBeenCalled();
  });

  it("should not return if password is not correct", async () => {
    db.User.findOne = jest.fn().mockResolvedValue({
      id: "test",
      first_name: "test",
      last_name: "test",
      email: "test@test.com",
      verified: 1,
      password:
        "d9b4d4fd580b8852af7e98118f2be88541ec2d7649895183a0fc56a955022509",
    });
    const req = {
      body: {
        password: "wrongpassword",
        email: "test@test.com",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await login(req, reply);
    expect(reply.send).toHaveBeenCalled();
  });
});
