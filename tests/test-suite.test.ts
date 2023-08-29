// /* eslint-disable no-unused-vars */
// import Passage from '../src/index';
// import { PassageError } from '../src/classes/PassageError';
// import request from 'supertest';
// import app from '../testServer';

// require('dotenv').config();

// enum Status {
//     ACTIVE = 'active',
//     INACTIVE = 'inactive',
//     PENDING = 'pending',
// }

// const userID = process.env.EXAMPLE_USER_ID ? process.env.EXAMPLE_USER_ID : '';
// const appToken = process.env.APP_TOKEN ? process.env.APP_TOKEN : '';

// describe('Passage Initialization', () => {
//     const config = {
//         appID: process.env.APP_ID ? process.env.APP_ID : '',
//         apiKey: process.env.API_KEY,
//     };
//     const passage = new Passage(config);

//     // note that the current token is only valid until Nov.8 2022
//     test('authenticateRequestWithCookie', async () => {
//         await request(app).get('/cookie').expect(401); // no token set --> 401
//         await request(app)
//             .get('/cookie')
//             .set('Cookie', [`psg_auth_token=invalid_token`]) // invalid token set --> 401
//             .expect(401);
//         await request(app)
//             .get('/cookie')
//             .set('Cookie', [`psg_auth_token=${appToken}`])
//             .expect(200);
//     });

//     test('authenticateRequestWithHeader', async () => {
//         await request(app).get('/header').expect(401); // no token set --> 401
//         await request(app).get('/header').set('Authorization', `Bearer invalid_token`).expect(401);
//         await request(app).get('/header').set('Authorization', `Bearer ${appToken}`).expect(200);
//     });

//     test('validAuthToken', async () => {
//         const userIdFromToken = await passage.validAuthToken(appToken);
//         expect(userIdFromToken).toBe(userID);
//     });

//     test('invalidAuthToken', () => {
//         expect(async () => await passage.validAuthToken('invalid_token')).rejects.toThrow(PassageError);
//     });
// });

