import { AxiosError } from "axios";

/**
 * Passage Class
 */
export class PassageError extends Error {
  readonly statusCode: number | undefined;
  readonly statusText: string | undefined;
  readonly error: string | undefined;
  readonly message: string;

  /**
   * Initialize a new PassageError instance.
   * @param {string} message friendly message,
   * @param {AxiosError} err error from axios request
   */
  constructor(message: string, err?: AxiosError) {
    super();

    this.message = message;
    this.statusCode = err?.response?.status;
    this.statusText = err?.response?.statusText;
    this.error = err?.response?.data.error;
  }
}
