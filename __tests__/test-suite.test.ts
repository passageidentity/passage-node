/* eslint-disable no-unused-vars */
import Passage from "../src/index";
import request from "supertest";
import app from "../testServer";
import { MagicLinkRequest } from "../src/types/MagicLink";
import axios from "axios";

require("dotenv").config();

enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

const userID = process.env.EXAMPLE_USER_ID ? process.env.EXAMPLE_USER_ID : "";
const appToken = process.env.APP_TOKEN ? process.env.APP_TOKEN : "";

describe("Passage Initialization", () => {
  const config = {
    appID: process.env.APP_ID ? process.env.APP_ID : "",
    apiKey: process.env.API_KEY,
  };
  const passage = new Passage(config);

  test("fetchPublicKey", async () => {
    const publicKey = await passage.fetchPublicKey();
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
    const publicKey = await passage.fetchPublicKey();
    const userID = passage.validAuthToken(appToken, publicKey);
    expect(userID).toBe("FXmduAG55lEsueAiKqZ4Kjfy");
  });
});

describe("Passage API Requests", () => {
  const passage = new Passage({
    appID: process.env.APP_ID ? process.env.APP_ID : "",
    apiKey: process.env.API_KEY,
  });

  test("createMagicLink", async () => {
    const magicLink = await passage.createMagicLink({
      email: "chris@passage.id",
      channel: "email",
    } as MagicLinkRequest);
    expect(magicLink).toHaveProperty("identifier", "chris@passage.id");
  });

  test("getUser", async () => {
    const user = await passage.user.get(userID);
    expect(user).toHaveProperty("id", userID);
  });
  test("activateUser", async () => {
    const activatedUser = await passage.user.activate(userID);
    expect(activatedUser).toHaveProperty("status", Status.ACTIVE);
    expect(activatedUser).toHaveProperty("id", userID);
  });
  test("deactivateUser", async () => {
    const deactivatedUser = await passage.user.deactivate(userID);
    expect(deactivatedUser).toHaveProperty("status", Status.INACTIVE);
    expect(deactivatedUser).toHaveProperty("id", userID);
  });
  test("update User Email", async () => {
    const updatedUser = await passage.user.update(userID, {
      email: "changeEmailTest@passage.id",
    });
    expect(updatedUser).toHaveProperty("email", "changeEmailTest@passage.id");

    await passage.user.update(updatedUser.id, {
      email: "defaultTestEmail@passage.id",
    });
  });
  test("update User Phone", async () => {
    const updatedUser = await passage.user.update(userID, {
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
    const randomEmail = `${Math.random().toString(36).substr(2, 20)}@gmail.com`;

    const createdUserWithEmail = await passage.user.create({
      email: randomEmail,
    });
    expect(createdUserWithEmail).toHaveProperty("email", randomEmail);

    const deletedUserWithEmail = await passage.user.delete(
      createdUserWithEmail.id
    );
    expect(deletedUserWithEmail).toBe(true);
  });

  test("Create and Update User With Metadata", async () => {
    const randomEmail = `${Math.random().toString(36).substr(2, 20)}@gmail.com`;

    const createdUserWithEmail = await passage.user.create({
      email: randomEmail,
    });
    expect(createdUserWithEmail).toHaveProperty("email", randomEmail);

    const updatedUserWithEmail = await passage.user.update(
      createdUserWithEmail.id,
      {
        user_metadata: {
          example1: "abc",
        },
      }
    );
    expect(updatedUserWithEmail.user_metadata).toMatchObject({
      example1: "abc",
    });

    const updatedUserWithEmail2 = await passage.user.update(
      createdUserWithEmail.id,
      {
        user_metadata: {
          example1: "xyz",
        },
      }
    );
    expect(updatedUserWithEmail2.user_metadata).toMatchObject({
      example1: "xyz",
    });
  });
});
