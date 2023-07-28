const get = require("../get");

describe("get", () => {
  it("should return 200", async () => {
    const req = {
      user: {
        id: 1,
        name: "John Doe",
        email: "test@test.com",
      },
    };
    const reply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await get(req, reply);
    expect(reply.send).toHaveBeenCalled();
  });
});
