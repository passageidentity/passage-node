import { FetchError } from 'node-fetch';
import { PassageError } from '../src/classes/PassageError';

describe('PassageError', () => {
    test('message only', async () => {
        const msg = 'Could not find valid cookie for authentication. You must catch this error.';
        const err = new PassageError(msg);

        expect(err.message).toEqual(msg);
        expect(err.error).toBeUndefined;
    });

    test('with Fetch Error', async () => {
        const fetchError = {
            code: '505',
            message: 'some error message',
            name: 'FetchError',
            type: 'error',
        } as FetchError;

        const msg = 'Could not find valid cookie for authentication. You must catch this error.';
        const err = new PassageError(msg, fetchError);

        expect(err.message).toEqual(msg);
        expect(err.statusCode).toBe(505);
        expect(err.statusText).toBe('FetchError');

        expect(err.error).toBe('some error message');
    });
});
