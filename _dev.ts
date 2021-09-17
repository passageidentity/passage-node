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

let passage = new psg(passageConfig).express;

app.get('/', passage, async (req, res) => {
    console.log(res.passage);
    res.send("This is an authenticated route!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
