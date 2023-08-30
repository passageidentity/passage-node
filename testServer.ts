import http, { IncomingMessage } from 'http';

import psg from './src/index';
import { PassageConfig, ServerResponse } from './src/types/PassageConfig';

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
const customMiddlewareCookie = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const userID = await passageCookie.authenticateRequest(req);
        if (userID) res['userID'] = userID;
    } catch (e) {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        res.end('Could not authenticate user!');
    }
};

const passageHeader = new psg(passageConfigHeader);
const customMiddlewareHeader = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const userID = await passageHeader.authenticateRequest(req);
        if (userID) res['userID'] = userID;
    } catch (e) {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        res.end('Could not authenticate user!');
    }
};

server.on('request', async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/cookie') {
        await customMiddlewareCookie(req, res);
        const userID = res['userID'];
        if (userID) {
            const { email }: any = await passageCookie.user.get(userID);
            res.end(JSON.stringify({ email }));
        }
    } else if (req.url === '/header') {
        await customMiddlewareHeader(req, res);
        const userID = res['userID'];
        if (userID) {
            const { email }: any = await passageHeader.user.get(userID);
            res.end(JSON.stringify({ email }));
        }
    } else {
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default server;
