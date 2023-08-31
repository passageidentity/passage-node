import http, { IncomingMessage } from 'http';
import { Request, Response } from 'node-fetch';

import psg from './src/index';
import { PassageConfig } from './src/types/PassageConfig';

const server = http.createServer();

require('dotenv').config();

const passageConfigCookie: PassageConfig = {
    appID: process.env.APP_ID ? process.env.APP_ID : '',
    apiKey: process.env.API_KEY ? process.env.API_KEY : '',
    authStrategy: 'COOKIE',
};

const passageConfigHeader: PassageConfig = {
    appID: process.env.APP_ID ? process.env.APP_ID : '',
    apiKey: process.env.API_KEY ? process.env.API_KEY : '',
    authStrategy: 'HEADER',
};

const passageCookie = new psg(passageConfigCookie);
const customMiddlewareCookie = async (req: Request, res: Response) => {
    try {
        const userID = await passageCookie.authenticateRequest(req);
        if (userID) res['userID'] = userID;
    } catch (e) {
        throw e;
    }
};

const passageHeader = new psg(passageConfigHeader);
const customMiddlewareHeader = async (req: Request, res: Response) => {
    try {
        const userID = await passageHeader.authenticateRequest(req);
        if (userID) res['userID'] = userID;
    } catch (e) {
        throw e;
    }
};

server.on('request', async (req: Request, res: Response) => {
    if (req.url === '/cookie') {
        await customMiddlewareCookie(req, res);
        const userID = res['userID'];
        if (userID) {
            const { email }: any = await passageCookie.user.get(userID);
            return JSON.stringify({ email });
        }
    } else if (req.url === '/header') {
        await customMiddlewareHeader(req, res);
        const userID = res['userID'];
        if (userID) {
            const { email }: any = await passageHeader.user.get(userID);
            return JSON.stringify({ email });
        }
    } else {
        throw 'Not Found';
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default server;
