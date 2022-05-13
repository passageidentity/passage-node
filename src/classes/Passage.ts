import { AuthStrategy } from "../types/AuthStrategy";
import { MagicLinkObject, MagicLinkRequest } from "../types/MagicLink";
import User from "./User";
import jwt from "jsonwebtoken";
import { Request } from "express-serve-static-core";
import jwkToPem, { RSA } from "jwk-to-pem";
import axios from "axios";
import { PassageConfig } from "../types/PassageConfig";
import { AUTH_CACHE } from "..";
import { JWK, JWKS } from "../types/JWKS";

/**
 * Passage Class
 */
export default class Passage {
  appID: string;
  #apiKey: string | undefined;
  authStrategy: AuthStrategy;
  user: User;

  /**
   * Initialize a new Passage instance.
   * @param {PassageConfig} config The default config for Passage initialization
   */
  constructor(config?: PassageConfig) {
    if (!config?.appID) {
      throw new Error(
        "A Passage appID is required. Please include {appID: YOUR_APP_ID}."
      );
    }
    this.appID = config.appID;
    this.#apiKey = config?.apiKey;
    this.user = new User(config);

    this.authStrategy = config?.authStrategy ? config.authStrategy : "COOKIE";
  }

  /**
   * Authenticate request with a cookie, or header. If no authentication
   * strategy is given, authenticate the request via cookie (default
   * authentication strategy).
   *
   * @param {Request} req Express request
   * @return {string} UserID of the Passage user
   */
  async authenticateRequest(req: Request): Promise<string | false> {
    if (this.authStrategy == "HEADER") {
      return this.authenticateRequestWithHeader(req);
    } else {
      // defaults to cookie
      return this.authenticateRequestWithCookie(req);
    }
  }

  /**
   * Set API key for this Passage instance
   * @param {string} _apiKey
   */
  set apiKey(_apiKey) {
    this.#apiKey = _apiKey;
  }

  /**
   * Get API key for this Passage instance
   * @return {string | undefined} Passage API Key
   */
  get apiKey(): string | undefined {
    return this.#apiKey;
  }

  /**
   * Fetch the corresponding JWKS for this app.
   *
   * @param {boolean} resetCache Optional value to specify whether or not the cache should be reset
   * @return {JWKS} JWKS for this app.
   */
  async fetchJWKS(resetCache?: boolean): Promise<JWKS> {
    // use cached value if found
    if (
      AUTH_CACHE[this.appID] !== undefined &&
      Object.keys(AUTH_CACHE).length > 0 &&
      !resetCache
    ) {
      return AUTH_CACHE[this.appID]["jwks"];
    }

    const jwks: { [kid: string]: JWK } = await axios
      .get(
        `https://auth.passage.id/v1/apps/${this.appID}/.well-known/jwks.json`
      )
      .catch((err) => {
        throw new Error(
          `Could not fetch appID\'s JWKs. HTTP status: ${err.response.status}`
        );
      })
      .then((res) => {
        const jwks = res.data.keys;
        const formattedJWKS: JWKS = {};

        // format jwks for cache
        for (const jwk of jwks) {
          formattedJWKS[jwk.kid] = jwk;
        }

        Object.assign(AUTH_CACHE, {
          [this.appID]: { jwks: { ...formattedJWKS } },
        });
        return formattedJWKS;
      });

    return jwks;
  }

  /**
   * Authenticate a request via the http header.
   *
   * @param {Request} req Express request
   * @return {string} User ID for Passage User
   */
  async authenticateRequestWithHeader(req: Request): Promise<string | false> {
    const { authorization } = req.headers;

    if (authorization) {
      const authToken = authorization.split(" ")[1];
      const { kid } = jwt.decode(authToken, { complete: true })!.header;
      if (!kid) {
        throw new Error("No KID found in JWT. You must catch this error.");
      }

      const jwk = await this._findJWK(kid);
      if (!jwk) {
        throw new Error("No JWKs found for app. You must catch this error.");
      }

      const userID = this.validAuthToken(authToken, jwk);
      if (userID) {
        return userID;
      } else {
        throw new Error(
          "Could not validate header auth token. You must catch this error."
        );
      }
    } else {
      throw new Error(
        "Header authorization not found. You must catch this error."
      );
    }
  }

  /**
   * Authenticate request via cookie.
   *
   * @param {Request} req Express request
   * @return {string} UserID for Passage User
   */
  async authenticateRequestWithCookie(req: Request): Promise<string | false> {
    if (!req.headers.cookie) {
      throw new Error(
        "Could not find valid cookie for authentication. You must catch this error."
      );
    }

    const cookies = {} as { psg_auth_token: string };

    req.headers.cookie?.split(";").forEach((cookie) => {
      const parts = cookie.match(/(.*?)=(.*)$/);
      if (parts) {
        const key = parts[1].trim();
        const value = parts[2].trim() || "";
        // @ts-ignore
        cookies[key] = value;
      }
    });

    const passageAuthToken = cookies.psg_auth_token;
    if (passageAuthToken) {
      const { kid } = jwt.decode(passageAuthToken, { complete: true })!.header;
      if (!kid) {
        throw new Error("No KID found in JWT. You must catch this error.");
      }

      const jwk = await this._findJWK(kid);
      if (!jwk) {
        throw new Error("No JWKs found for app. You must catch this error.");
      }

      const userID = this.validAuthToken(passageAuthToken, jwk);
      if (userID) return userID;
      else {
        throw new Error(
          "Could not validate auth token. You must catch this error."
        );
      }
    } else {
      throw new Error(
        "Could not find authentication cookie 'psg_auth_token' token. You must catch this error."
      );
    }
  }

  /**
   *
   * @param {string} kid the KID from the authToken to determine which JWK to use.
   * @return {Promise<JWK | undefined>} the JWK to be used for decoding an authToken with the associated KID.
   */
  private async _findJWK(kid: string): Promise<JWK | undefined> {
    if (!AUTH_CACHE) return undefined;
    const jwk = AUTH_CACHE[this.appID]["jwks"][kid];

    // if there is no JWK, cache might need to be updated; update cache and try again
    if (!jwk) {
      await this.fetchJWKS(true);
      const jwk = AUTH_CACHE[this.appID]["jwks"][kid];
      if (jwk) {
        return jwk;
      }
      return undefined;
    }
    return jwk;
  }

  /**
   * Determine if the provided token is valid when compared with its
   * respective public key.
   *
   * @param {string} token Authentication token
   * @param {jwkToPem.JWK} jwk The jwk that matches the kid in the authToken
   * @return {boolean} True if the jwt can be verified, false jwt cannot be verified
   */
  validAuthToken(token: string, jwk: JWK): string | false {
    try {
      const pem = jwkToPem(jwk as RSA);

      const validAuthToken = jwt.verify(token, pem, {
        // @ts-ignore
        algorithms: jwk.alg,
      }).sub;
      if (validAuthToken) return validAuthToken.toString();
      else return false;
    } catch (e) {
      return false;
    }
  }

  /**
   * Create a Magic Link for your app.
   *
   * @param {MagicLinkRequest} magicLinkReq options for creating a MagicLink.
   * @return {Promise<MagicLinkObject>} Passage MagicLink object
   */
  async createMagicLink(
    magicLinkReq: MagicLinkRequest
  ): Promise<MagicLinkObject> {
    const magicLinkData: MagicLinkObject = await axios
      .post(
        `https://api.passage.id/v1/apps/${this.appID}/magic-links/`,
        magicLinkReq,
        {
          headers: {
            Authorization: `Bearer ${this.#apiKey}`,
          },
        }
      )
      .catch((err) => {
        throw new Error(
          `Could not create a magic link for this app. HTTP Status: ${err.response.status}.`
        );
      })
      .then((res) => {
        return res.data.magic_link;
      });
    return magicLinkData;
  }
}
