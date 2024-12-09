/* eslint-disable no-unused-vars */
import request from 'supertest';
import Passage from '../src/index';
import { PassageError } from '../src/classes/PassageError';
import app from '../testServer';
import { CreateMagicLinkRequest, CreateUserRequest, MagicLinkType } from '../src/generated';
import { faker } from '@faker-js/faker';

require('dotenv').config();

enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending',
}

const userID = process.env.EXAMPLE_USER_ID ?? '';
const appToken = process.env.APP_TOKEN ?? '';

describe('Passage Initialization', () => {
    const config = {
        appID: process.env.APP_ID ?? '',
        apiKey: process.env.API_KEY ?? '',
    };
    const passage = new Passage(config);

    // note that the current token is only valid until Nov.8 2022
    test('authenticateRequestWithCookie', async () => {
        await request(app).get('/cookie').expect(401); // no token set --> 401
        await request(app)
            .get('/cookie')
            .set('Cookie', [`psg_auth_token=invalid_token`]) // invalid token set --> 401
            .expect(401);
        await request(app)
            .get('/cookie')
            .set('Cookie', [`psg_auth_token=${appToken}`])
            .expect(200);
    });

    test('authenticateRequestWithHeader', async () => {
        await request(app).get('/header').expect(401); // no token set --> 401
        await request(app).get('/header').set('Authorization', `Bearer invalid_token`).expect(401);
        await request(app).get('/header').set('Authorization', `Bearer ${appToken}`).expect(200);
    });

    test('validAuthToken', async () => {
        const userIdFromToken = await passage.validAuthToken(appToken);
        expect(userIdFromToken).toBe(userID);
    });

    test('invalidAuthToken', () => {
        expect(async () => await passage.validAuthToken('invalid_token')).rejects.toThrow(PassageError);
    });
});

describe('Passage API Requests', () => {
    const passage = new Passage({
        appID: process.env.APP_ID ?? '',
        apiKey: process.env.API_KEY ?? '',
    });

    describe('Passage', () => {
        test('createMagicLink', async () => {
            const magicLink = await passage.createMagicLink({
                email: 'chris@passage.id',
                type: MagicLinkType.Login,
                send: false,
                ttl: 12,
            } as CreateMagicLinkRequest);
            expect(magicLink).toHaveProperty('identifier', 'chris@passage.id');
            expect(magicLink).toHaveProperty('ttl', 12);
        });

        test('Get App', async () => {
            const app = await passage.getApp();
            expect(app.id).toBe(process.env.APP_ID);
        });
    });

    describe('User', () => {
        test('getUser', async () => {
            const user = await passage.user.get(userID);
            expect(user).toHaveProperty('id', userID);
        });
        test('getUserByIdentifier', async () => {
            const randomEmail = faker.internet.email();
            const createdUserWithEmail = await passage.user.create({
                email: randomEmail,
            } as CreateUserRequest);
            expect(createdUserWithEmail).toHaveProperty('email', randomEmail.toLowerCase());

            const userByIdentifier = await passage.user.getUserByIdentifier(randomEmail);
            expect(userByIdentifier).toHaveProperty('id', createdUserWithEmail.id);

            const user = await passage.user.get(createdUserWithEmail.id);
            expect(user).toHaveProperty('id', createdUserWithEmail.id);

            expect(userByIdentifier).toEqual(user);
        });
        test('getUserByIdentifierPhone', async () => {
            const phone = '+15005550018';
            const createdUserWithEmail = await passage.user.create({
                phone: phone,
            } as CreateUserRequest);
            expect(createdUserWithEmail).toHaveProperty('phone', phone);

            const userByIdentifier = await passage.user.getUserByIdentifier(phone);
            expect(userByIdentifier).toHaveProperty('id', createdUserWithEmail.id);

            const user = await passage.user.get(createdUserWithEmail.id);
            expect(user).toHaveProperty('id', createdUserWithEmail.id);

            expect(userByIdentifier).toEqual(user);
        });
        test('InvalidGetUserByIdentifier', async () => {
            const randomEmail = faker.internet.email();
            expect(async () => await passage.user.getUserByIdentifier(randomEmail)).rejects.toThrow(PassageError);
        });
        test('activateUser', async () => {
            const activatedUser = await passage.user.activate(userID);
            expect(activatedUser).toHaveProperty('status', Status.ACTIVE);
            expect(activatedUser).toHaveProperty('id', userID);
        });
        test('deactivateUser', async () => {
            const deactivatedUser = await passage.user.deactivate(userID);
            expect(deactivatedUser).toHaveProperty('status', Status.INACTIVE);
            expect(deactivatedUser).toHaveProperty('id', userID);
        });
        test('update User Email', async () => {
            const updatedUser = await passage.user.update(userID, {
                email: 'changeEmailTest+nodeSDK@passage.id',
            });
            expect(updatedUser).toHaveProperty('email', 'changeemailtest+nodesdk@passage.id');

            await passage.user.update(updatedUser.id, {
                email: 'defaulttestemail+nodesdk@passage.id',
            });
        });
        test('update User Phone', async () => {
            const updatedUser = await passage.user.update(userID, {
                phone: '+15005550008',
            });
            expect(updatedUser).toHaveProperty('phone', '+15005550008');

            await passage.user.update(updatedUser.id, {
                phone: '+15005550009',
            });
        });

        test('Create and Delete User', async () => {
            // Create and delete user via email for now.
            // Split into two after soft delete strategy implementation
            const randomEmail = `${Math.random().toString(36).substr(2, 20)}@gmail.com`;

            const createdUserWithEmail = await passage.user.create({
                email: randomEmail,
            } as CreateUserRequest);
            expect(createdUserWithEmail).toHaveProperty('email', randomEmail);

            const deletedUserWithEmail = await passage.user.delete(createdUserWithEmail.id);
            expect(deletedUserWithEmail).toBe(true);
        });

        test('Create and Update User With Metadata', async () => {
            const randomEmail = `${Math.random().toString(36).substr(2, 20)}@gmail.com`;

            const createdUserWithEmail = await passage.user.create({
                email: randomEmail,
            } as CreateUserRequest);
            expect(createdUserWithEmail).toHaveProperty('email', randomEmail);

            const updatedUserWithEmail = await passage.user.update(createdUserWithEmail.id, {
                user_metadata: {
                    example1: 'abc',
                },
            });
            expect(updatedUserWithEmail.user_metadata).toMatchObject({
                example1: 'abc',
            });

            const updatedUserWithEmail2 = await passage.user.update(createdUserWithEmail.id, {
                user_metadata: {
                    example1: 'xyz',
                },
            });
            expect(updatedUserWithEmail2.user_metadata).toMatchObject({
                example1: 'xyz',
            });
        });

        test('List Devices', async () => {
            const devices = await passage.user.listDevices(userID);
            expect(devices).toHaveLength(2);
        });

        // NOTE revokeDevice is not tested because it is impossible to spoof webauthn to create a device to then revoke

        test('SignOut', async () => {
            const success = await passage.user.signOut(userID);
            expect(success).toBeTruthy;
        });
    });
});
