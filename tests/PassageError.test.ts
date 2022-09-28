import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { PassageError } from "../src/classes/PassageError";

describe("PassageError", () => {
  test("message only", async () => {
    const msg =
      "Could not find valid cookie for authentication. You must catch this error.";
    const err = new PassageError(msg);

    expect(err.message).toEqual(msg);
    expect(err.error).toBeUndefined;
  });

  test("with Axios Error", async () => {
    const responseData = {
      error: "some error message",
    };

    const response: AxiosResponse = {
      data: responseData,
      statusText: "Internal Server Error",
      status: 500,
    } as AxiosResponse;

    const axiosError = {
      config: {},
      request: {},
      response: response,
    } as AxiosError<any>;

    const msg =
      "Could not find valid cookie for authentication. You must catch this error.";
    const err = new PassageError(msg, axiosError);

    expect(err.message).toEqual(msg);
    expect(err.statusCode).toBe(500);
    expect(err.statusText).toBe("Internal Server Error");

    expect(err.error).toBe("some error message");
  });
});
