import { ResponseError } from '../src/generated';
import { PassageError } from '../src/classes/PassageError';

describe('PassageError', () => {
    test('message only', async () => {
        const msg = 'Could not find valid cookie for authentication. You must catch this error.';
        const err = new PassageError(msg);

        expect(err.message).toEqual(msg);
        expect(err.error).toBeUndefined;
    });

    test('with Response Error', async () => {
        const responseError = {
            message: 'some error message',
            name: 'ResponseError',
        } as ResponseError;

        const msg = 'Could not find valid cookie for authentication. You must catch this error';
        const err = new PassageError(msg, responseError);

        expect(err.message).toEqual(msg);
        expect(err.statusCode).toBe(500);

        expect(err.error).toBe('some error message');
    });

    test('fromResponseError', async () => {
        const responseError = {
            message: 'some error message',
            name: 'ResponseError',
            response: {
                json: async () => ({
                    code: 'some code',
                    error: 'some error',
                }),
            },
        } as ResponseError;

        const msg = 'Failed to do something';
        const err = await PassageError.fromResponseError(responseError, msg);

        expect(err.message).toEqual(`${msg}: some error`);
        expect(err.statusCode).toBe(500);
        expect(err.error).toBe('some error message');
        expect(`${err}`).toEqual('PassageError: Failed to do something: some error');
    });
});
