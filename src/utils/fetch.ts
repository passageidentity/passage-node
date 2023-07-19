/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch, { HeadersInit } from 'node-fetch';
import config from './config.json';

interface RequestOptions {
    // @ts-ignore
    body?: any;
    headers?: HeadersInit;
    method: string;
    url: string;
}

const instance: (options: RequestOptions) => Promise<any> = async ({
    body,
    headers = {},
    method,
    url,
}: RequestOptions) => {
    const requestHeaders = {
        ...headers,
        'Passage-Version': config.version,
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
        body: body ? JSON.stringify(body) : undefined,
        headers: requestHeaders,
        method,
    });

    try {
        return await response.json();
    } catch (err) {
        return { error: 'Failed to parse JSON response' };
    }
};

export default instance;
