import passage, { Passage } from "./index";

import express from 'express';
import { PassageConfig } from "./types/PassageConfig";
const app = express();
const port = 3000;

require('dotenv').config();

let passageConfig: PassageConfig = {
    appID: process.env.APP_ID ? process.env.APP_ID : '',
    apiKey: process.env.API_KEY ? process.env.API_KEY : '',
    authStrategy: "HEADER",
}

app.get('/authentication', passage(passageConfig), async (req, res, next) => {
    let apiKey = res.passage.apiKey;
    let publicKey = res.passage.publicKey;
    let validAuthToken = res.passage.validAuthToken("TOKEN", "PUBLIC_KEY");
    res.passage.
    let userObject = await res.passage.user.get("USER_ID");
    let activateUserResponseObject = await res.passage.user.activate("USER_ID");
    let deactivateUserResponseObject = await res.passage.user.deactivate("USER_ID");

    res.send("This is an authenticated route!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
