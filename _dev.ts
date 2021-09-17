import psg from "./src/index";

import express from 'express';
import { PassageConfig } from "./src/types/PassageConfig";
const app = express();
const port = 3000;

require('dotenv').config();

let passageConfig: PassageConfig = {
    appID: process.env.APP_ID ? process.env.APP_ID : '',
    apiKey: process.env.API_KEY ? process.env.API_KEY : '',
    authStrategy: "COOKIE",
}

// let passage = (passageConfig: any) => {
//     return (req: any, res: any, next: any) => {
//         new psg(passageConfig).authenticateRequest(req, res, next);
//     }
// }

let passage = new psg(passageConfig);


app.get('/', async (req, res) => {
    // res.send("authenticated!");
    try {
        let user = await passage.authenticateRequest(req, res);
        if (user) res.send(user);
        else res.send("Failed to authenticate user.");
    } catch(e) {
        console.log("ASLJHDGASLJASHDGLASJDHG");
    }

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
