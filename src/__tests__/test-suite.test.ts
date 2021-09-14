import { Passage } from "..";

require('dotenv').config();
let userID = process.env.EXAMPLE_USER_ID ? process.env.EXAMPLE_USER_ID : '';
let appToken = process.env.APP_TOKEN ? process.env.APP_TOKEN : '';

describe('Passage Initialization', () => {
    let passage = new Passage({appID: process.env.APP_ID});

    test('fetchPublicKey', async () => {
        let publicKey = await passage.fetchPublicKey();
        expect(publicKey).toContain(process.env.PUBLIC_KEY);
    });

    // note that this test will fail after a while since the provided token is only valid for 24 hours
    // commented out for now until another token is provided that will last longer
    // test('validAuthToken', async () => {
    //     let publicKey = await passage.fetchPublicKey();
    //     let validAuthToken = passage.validAuthToken(appToken, publicKey);
    //     expect(validAuthToken).toBe(true);
    // });

    // these tests will take more setup and will likely require an express spawn via supertest since
    // they are using the req, res, and next Express router types.
    // import request from "supertest";
    // https://dev.to/mhmdlotfy96/testing-nodejs-express-api-with-jest-and-supertest-1bk0
    
    // test('authenticateRequestWithHeader', () => { });
    // test('authenticateRequestWithCookie', () => { });
});

describe('Passage API Requests', () => {
    let passage = new Passage({
        appID: process.env.APP_ID,
        apiKey: process.env.API_KEY,
    });

    test('getUser', async () => { 
        let user = await passage.getUser(userID);
        expect(user).toHaveProperty("id", userID);
    });
    test('activateUser', async () => {
        let activatedUser = await passage.activateUser(userID);
        expect(activatedUser).toHaveProperty("active", true);
        expect(activatedUser).toHaveProperty("id", userID);
    });
    test('deactivateUser', async () => {
        let deactivatedUser = await passage.deactivateUser(userID);
        expect(deactivatedUser).toHaveProperty("active", false);
        expect(deactivatedUser).toHaveProperty("id", userID);
    });
});