import * as request from "supertest";

describe("timestamp microservice tests", () => {
  const { App } = require("../index");

  it("return message if server is running", async () => {
    const response = await request(App).get("/api");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Hello world, this is PatMan10!");
  });

  it("return error message if invalid date given", async () => {
    const response = await request(App).get("/api/timestamp/warawaties");
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  it("return timestamp object with unix and utc time formats", async () => {
    const response = await request(App).get("/api/timestamp");
    expect(response.status).toBe(200);
    expect(response.body.unix).toBeTruthy();
    expect(response.body.utc).toBeTruthy();
  });

  it("return timestamp object with unix and utc time equivalent to given date", async () => {
    const response = await request(App).get("/api/timestamp/2021-12-12");
    expect(response.status).toBe(200);
    expect(response.body.unix).toBe(1639267200000);
    expect(response.body.utc).toBe("Sun, 12 Dec 2021 00:00:00 GMT");
  });
});
