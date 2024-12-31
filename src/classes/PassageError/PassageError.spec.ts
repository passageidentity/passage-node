import { PassageError } from './PassageError';
import { ResponseError } from '../../generated';

describe('PassageError', () => {
    it('should map a ResponseError to a PassageError using fromResponseError', async () => {
        const responseError: ResponseError = {
            response: {
                status: 500,
                json: async () => ({ code: 'INTERNAL_SERVER_ERROR', error: 'Internal server error' }),
            },
            message: 'Internal server error',
        } as ResponseError;
        const passageError = await PassageError.fromResponseError(responseError);

        expect(passageError).toBeInstanceOf(PassageError);
        expect(passageError.name).toBe('PassageError');
        expect(passageError.message).toBe('Internal server error');
        expect(passageError.errorCode).toBe('INTERNAL_SERVER_ERROR');
        expect(passageError.statusCode).toBe(500);
    });
});
