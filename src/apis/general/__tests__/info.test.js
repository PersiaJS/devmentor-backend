const infoApi = require("../info");

it("should return 200", async () => {
  const req = {};
  const reply = {
    code: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  await infoApi(req, reply);
  expect(reply.code).toHaveBeenCalledWith(200);
});
