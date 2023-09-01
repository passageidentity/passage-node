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

        expect(err.message).toEqual(`${msg}: ${responseError.message}`);
        expect(err.statusCode).toBe(500);

        expect(err.error).toBe('some error message');
    });
});
