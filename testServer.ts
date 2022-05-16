import psg from "./src/index";

import express, { NextFunction } from "express";
import { PassageConfig } from "./src/types/PassageConfig";
const app = express();

require("dotenv").config();

const passageConfig: PassageConfig = {
    appID: process.env.APP_ID ? process.env.APP_ID : "",
    apiKey: process.env.API_KEY ? process.env.API_KEY : "",
    authStrategy: "COOKIE",
};

// example of custom middleware
const passage = new psg(passageConfig);
const customMiddleware = (() => {
    return async (req: any, res: any, next: NextFunction) => {
        try {
            const userID = await passage.authenticateRequest(req);
            if (userID) res.userID = userID;
            else res.userID = false;
            next();
        } catch (e) {
            res.status(401).send("Could not authenticate user!");
        }
    };
})();

// example implementation of custom middleware
app.get("/", customMiddleware, async (req: Request, res: any) => {
    const userID = res.userID;
    if (userID) {
        const { email }: any = await passage.user.get(userID);
        res.json({ email });
    } else {
        res.send("Failed to get user");
    }
});

export default app;
