import { PassageError } from './PassageError';
import { ResponseError } from '../../generated';

describe('PassageError', () => {
    it('should create an instance with the correct properties', () => {
        const message = 'Test error message';
        const errorCode = 'TEST_ERROR_CODE';
        const passageError = new PassageError(message, errorCode);

        expect(passageError).toBeInstanceOf(PassageError);
        expect(passageError.name).toBe('PassageError');
        expect(passageError.message).toBe(message);
        expect(passageError.errorCode).toBe(errorCode);
        expect(passageError.statusCode).toBeUndefined();
    });

    it('should create an instance with ResponseError properties', () => {
        const message = 'Test error message';
        const errorCode = 'TEST_ERROR_CODE';
        const responseError: ResponseError = {
            response: {
                status: 404,
                json: async () => ({ code: 'NOT_FOUND', error: 'Resource not found' })
            },
            message: 'Resource not found'
        } as ResponseError;
        const passageError = new PassageError(message, errorCode, responseError);

        expect(passageError).toBeInstanceOf(PassageError);
        expect(passageError.name).toBe('PassageError');
        expect(passageError.message).toBe(message);
        expect(passageError.errorCode).toBe(errorCode);
        expect(passageError.statusCode).toBe(404);
        expect(passageError.error).toBe('Resource not found');
    });

    it('should map a ResponseError to a PassageError using fromResponseError', async () => {
        const message = 'Test error message';
        const responseError: ResponseError = {
            response: {
                status: 500,
                json: async () => ({ code: 'INTERNAL_SERVER_ERROR', error: 'Internal server error' })
            },
            message: 'Internal server error'
        } as ResponseError;
        const passageError = await PassageError.fromResponseError(responseError, message);

        expect(passageError).toBeInstanceOf(PassageError);
        expect(passageError.name).toBe('PassageError');
        expect(passageError.message).toBe(`${message}: Internal server error`);
        expect(passageError.errorCode).toBe('INTERNAL_SERVER_ERROR');
        expect(passageError.statusCode).toBe(500);
        expect(passageError.error).toBe('Internal server error');
    });
});