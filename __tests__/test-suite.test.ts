import Passage from "../src/index";
import request from "supertest";
import app from "../testServer";

require("dotenv").config();

let userID = process.env.EXAMPLE_USER_ID ? process.env.EXAMPLE_USER_ID : "";
let appToken = process.env.APP_TOKEN ? process.env.APP_TOKEN : "";

describe("Passage Initialization", () => {
  let config = {
    appID: process.env.APP_ID ? process.env.APP_ID : "",
    apiKey: process.env.API_KEY,
  };
  let passage = new Passage(config);

  test("fetchPublicKey", async () => {
    let publicKey = await passage.fetchPublicKey();
    expect(publicKey).toContain(process.env.PUBLIC_KEY);
  });

  //   note that the current token is only valid until Nov. 8 2022
  test("authenticateRequestWithCookie", async () => {
    await request(app).get("/").expect(401);
    await request(app)
      .get("/")
      .set("Cookie", [`psg_auth_token=${appToken}`])
      .expect(200);
  });

  test("validAuthToken", async () => {
    let publicKey = await passage.fetchPublicKey();
    let userID = passage.validAuthToken(appToken, publicKey);
    expect(userID).toBe("FXmduAG55lEsueAiKqZ4Kjfy");
  });
});

describe("Passage API Requests", () => {
  let passage = new Passage({
    appID: process.env.APP_ID ? process.env.APP_ID : "",
    apiKey: process.env.API_KEY,
  });

  test("getUser", async () => {
    let user = await passage.user.get(userID);
    expect(user).toHaveProperty("id", userID);
  });
  test("activateUser", async () => {
    let activatedUser = await passage.user.activate(userID);
    expect(activatedUser).toHaveProperty("active", true);
    expect(activatedUser).toHaveProperty("id", userID);
  });
  test("deactivateUser", async () => {
    let deactivatedUser = await passage.user.deactivate(userID);
    expect(deactivatedUser).toHaveProperty("active", false);
    expect(deactivatedUser).toHaveProperty("id", userID);
  });
  test("changeUserEmail", async () => {
    let user = await passage.user.updateEmail(
      userID,
      "changeEmailTest@passage.id"
    );
    expect(user).toHaveProperty("email", "changeEmailTest@passage.id");

    await passage.user.updateEmail(userID, "defaultTestEmail@passage.id");
  });
});
