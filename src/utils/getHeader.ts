import { IncomingMessage } from 'http';

/**
 * Helper utility to get headers for both Note http IncomingMessage requests and fetch requests.
 * @param {IncomingMessage | Request} request Node http request or fetch request
 * @param {string} key Header key to get
 * @return {string | string[] | undefined | null}
 */
export function getHeaderFromRequest(
    request: IncomingMessage | Request,
    key: string,
): string | string[] | undefined | null {
    if (isFetchRequest(request)) {
        return request.headers.get(key);
    }
    return request.headers[key];
}

/**
 * Type guard to check if the request is a fetch request.
 * @param {IncomingMessage | Request} request Node http request or fetch request
 * @return {boolean} True if the request is a fetch request
 */
function isFetchRequest(request: IncomingMessage | Request): request is Request {
    return request.headers.get !== undefined && typeof request.headers.get === 'function';
}
