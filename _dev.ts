import psg from "./src/index";

import express, { NextFunction } from 'express';
import { PassageConfig } from "./src/types/PassageConfig";
const app = express();
const port = 3000;

require('dotenv').config();

let passageConfig: PassageConfig = {
    appID: process.env.APP_ID ? process.env.APP_ID : '',
    apiKey: process.env.API_KEY ? process.env.API_KEY : '',
    authStrategy: "COOKIE",
}

// example of custom middleware
let passage = new psg(passageConfig);
let customMiddleware = (() => {
    return async (req: any, res: any, next: NextFunction) => {
        try {
            let userID = await passage.authenticateRequest(req);
            if (userID) res.userID = userID;
            else res.userID = false;
            next();
        } catch(e) {
            console.log(e);
            res.status(401).send('Could not authenticate user!');
        }
    }
})();

// example implementation of custom middleware
app.get('/', customMiddleware, async(req: Request, res: any) => {
    let userID = res.userID;
    if (userID) {
        console.log(userID);
        let { email }: any = await passage.user.get(userID);
        res.send(email);
    } else {
        console.log(res.userID);
        res.send("Failed to get user");
    }
});


// let passage = new psg(passageConfig);
// app.get('/', async (req, res) => {
//     try {
//         let userID = await passage.authenticateRequest(req);
//         console.log(userID)
//         if (userID) {
//             res.send("authenticated!");
//         } else {
//             res.send("You are not authenticated");
//         }
//     } catch(e) {
//         console.log(e);
//         res.send("Error authenticating user");
//     }
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
