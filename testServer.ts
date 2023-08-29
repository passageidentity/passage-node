// import psg from './src/index';

// import express, { NextFunction } from 'express';
// import { PassageConfig } from './src/types/PassageConfig';
// const app = express();

// require('dotenv').config();

// const passageConfigCookie: PassageConfig = {
//     appID: process.env.APP_ID ? process.env.APP_ID : '',
//     apiKey: process.env.API_KEY ? process.env.API_KEY : '',
//     authStrategy: 'COOKIE',
// };

// const passageConfigHeader: PassageConfig = {
//     appID: process.env.APP_ID ? process.env.APP_ID : '',
//     apiKey: process.env.API_KEY ? process.env.API_KEY : '',
//     authStrategy: 'HEADER',
// };

// // example of custom middleware
// const passageCookie = new psg(passageConfigCookie);
// const customMiddlewareCookie = (() => {
//     return async (req: any, res: any, next: NextFunction) => {
//         try {
//             const userID = await passageCookie.authenticateRequest(req);
//             if (userID) res.userID = userID;
//             else res.userID = false;
//             next();
//         } catch (e) {
//             res.status(401).send('Could not authenticate user!');
//         }
//     };
// })();

// // example of custom middleware
// const passageHeader = new psg(passageConfigHeader);
// const customMiddlewareHeader = (() => {
//     return async (req: any, res: any, next: NextFunction) => {
//         try {
//             const userID = await passageHeader.authenticateRequest(req);
//             if (userID) res.userID = userID;
//             else res.userID = false;
//             next();
//         } catch (e) {
//             res.status(401).send('Could not authenticate user!');
//         }
//     };
// })();

// // example implementation of custom middleware
// app.get('/cookie', customMiddlewareCookie, async (req: Request, res: any) => {
//     const userID = res.userID;
//     if (userID) {
//         const { email }: any = await passageCookie.user.get(userID);
//         res.json({ email });
//     } else {
//         res.send('Failed to get user');
//     }
// });

// app.get('/header', customMiddlewareHeader, async (req: Request, res: any) => {
//     const userID = res.userID;
//     if (userID) {
//         const { email }: any = await passageHeader.user.get(userID);
//         res.json({ email });
//     } else {
//         res.send('Failed to get user');
//     }
// });

// export default app;
