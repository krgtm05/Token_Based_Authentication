const request = require("supertest");
const app = require("./auth");

describe("User Auth API", () => {
  let token;

  it("should sign up a new user", async () => {
    const res = await request(app)
      .post("/signup")
      .send({ username: "testuser", password: "1234" });
    expect(res.text).toBe("Signed Up Successfully");
  });

  it("should not allow duplicate signup", async () => {
    const res = await request(app)
      .post("/signup")
      .send({ username: "testuser", password: "1234" });
    expect(res.text).toBe("User already exist");
  });

  it("should sign in and return a token", async () => {
    const res = await request(app)
      .post("/signin")
      .send({ username: "testuser", password: "1234" });
    expect(res.text.length).toBeGreaterThan(10);
    token = res.text;
  });

  it("should return user info with valid token", async () => {
    const res = await request(app)
      .get("/me")
      .set("token", token);
    expect(res.body.username).toBe("testuser");
  });

  it("should return 'Not found' for invalid token", async () => {
    const res = await request(app)
      .get("/me")
      .set("token", "invalidtoken");
    expect(res.text).toBe("Not found");
  });
});