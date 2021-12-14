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

  // note that the current token is only valid until Nov.8 2022
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
  test("update User Email", async () => {
    let updatedUser: any = await passage.user.update(userID, {
      email: "changeEmailTest@passage.id",
    });
    expect(updatedUser).toHaveProperty("email", "changeEmailTest@passage.id");

    await passage.user.update(updatedUser.id, {
      email: "defaultTestEmail@passage.id",
    });
  });
  test("update User Phone", async () => {
    let updatedUser: any = await passage.user.update(userID, {
      phone: "+15005550001",
    });
    expect(updatedUser).toHaveProperty("phone", "+15005550001");

    await passage.user.update(updatedUser.id, {
      phone: "+15005550002",
    });
  });

  test("Create and Delete User", async () => {
    // Create and delete user via email for now.
    // Split into two after soft delete strategy implementation
    let randomEmail = `${Math.random().toString(36).substr(2, 20)}@gmail.com`;

    let createdUserWithEmail = await passage.user.create({
      email: randomEmail,
    });
    expect(createdUserWithEmail).toHaveProperty("email", randomEmail);

    let deletedUserWithEmail = await passage.user.delete(
      createdUserWithEmail.id
    );
    expect(deletedUserWithEmail).toBe(true);
  });
});
