"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod
  )
);
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default,
});
module.exports = __toCommonJS(src_exports);

// src/utils/axios.ts
var import_axios = __toESM(require("axios"), 1);

// src/utils/config.json
var config_default = { version: "@passageidentity/passage-node 0.0.1" };

// src/utils/axios.ts
var instance = import_axios.default.create({
  headers: { "Passage-Version": config_default.version },
});
var axios_default = instance;

// src/classes/PassageError.ts
function isAxiosError(e) {
  return e.isAxiosError === true;
}
var PassageError = class extends Error {
  /**
   * Initialize a new PassageError instance.
   * @param {string} message friendly message,
   * @param {Error} err error from axios request
   */
  constructor(message, err) {
    super();
    this.message = message;
    if (err && isAxiosError(err)) {
      this.statusCode = err.response?.status;
      this.statusText = err.response?.statusText;
      this.error = err.response?.data.error;
    } else {
      this.error = err?.message;
    }
  }
};

// src/classes/User.ts
var _appID, _apiKey, _authorizationHeader;
var User = class {
  /**
   * Initialize a new Passage User instance.
   *
   * @param {PassageConfig} config The default config for Passage and User initialization
   */
  constructor(config) {
    __privateAdd(this, _appID, void 0);
    __privateAdd(this, _apiKey, void 0);
    __privateAdd(this, _authorizationHeader, void 0);
    __privateSet(this, _appID, config.appID ? config.appID : "");
    __privateSet(this, _apiKey, config.apiKey ? config.apiKey : "");
    this.id = "";
    if (__privateGet(this, _apiKey)) {
      __privateSet(this, _authorizationHeader, {
        headers: {
          Authorization: `Bearer ${__privateGet(this, _apiKey)}`,
        },
      });
    } else {
      __privateSet(this, _authorizationHeader, void 0);
    }
  }
  /**
   * Get a user's object using their user ID.
   *
   * @param {string} userID The Passage user ID
   * @return {Promise<UserObject>} Passage User object
   */
  async get(userID) {
    if (!__privateGet(this, _apiKey)) {
      throw new PassageError("A Passage API key is needed.");
    }
    const userData = await axios_default
      .get(
        `https://api.passage.id/v1/apps/${__privateGet(
          this,
          _appID
        )}/users/${userID}`,
        __privateGet(this, _authorizationHeader)
      )
      .catch((err) => {
        throw new PassageError("Could not fetch user.", err);
      })
      .then((res) => {
        return res.data.user;
      });
    return userData;
  }
  /**
   * Deactivate a user using their user ID.
   *
   * @param {string} userID The Passage user ID
   * @return {Promise<UserObject>} Passage User object
   */
  async deactivate(userID) {
    if (!__privateGet(this, _apiKey)) {
      throw new PassageError("A Passage API key is needed.");
    }
    const userData = await axios_default
      .patch(
        `https://api.passage.id/v1/apps/${__privateGet(
          this,
          _appID
        )}/users/${userID}/deactivate`,
        null,
        // note that this null is required as axios.patch has different param order than axios.get
        __privateGet(this, _authorizationHeader)
      )
      .catch((err) => {
        throw new PassageError("Could not deactivate user.", err);
      })
      .then((res) => {
        return res.data.user;
      });
    return userData;
  }
  /**
   * Update a user.
   *
   * @param {string} userID The passage user ID
   * @param {UpdateUserPayload} payload The user attributes to be updated
   * @return {Promise<UserObject>} Pasasge User Object
   */
  async update(userID, payload) {
    if (!__privateGet(this, _apiKey)) {
      throw new PassageError("A Passage API key is needed.");
    }
    const userData = await axios_default
      .patch(
        `https://api.passage.id/v1/apps/${__privateGet(
          this,
          _appID
        )}/users/${userID}`,
        payload,
        __privateGet(this, _authorizationHeader)
      )
      .catch((err) => {
        throw new PassageError("Could not update user.", err);
      })
      .then((res) => {
        return res.data.user;
      });
    return userData;
  }
  /**
   * Activate a user using their user ID.
   *
   * @param {string} userID The passage user ID
   * @return {Promise<UserObject>} Passage User object
   */
  async activate(userID) {
    if (!__privateGet(this, _apiKey)) {
      throw new PassageError("A Passage API key is needed");
    }
    const userData = await axios_default
      .patch(
        `https://api.passage.id/v1/apps/${__privateGet(
          this,
          _appID
        )}/users/${userID}/activate`,
        null,
        // note that this null is required as axios.patch has different param order than axios.get
        __privateGet(this, _authorizationHeader)
      )
      .catch((err) => {
        throw new PassageError("Could not activate user", err);
      })
      .then((res) => {
        return res.data.user;
      });
    return userData;
  }
  /**
   * Create a user.
   *
   * @param {CreateUserPayload} payload To create the user.
   * @return {Promise<UserObject>} Passage User object
   */
  async create(payload) {
    if (!__privateGet(this, _apiKey)) {
      throw new PassageError("A Passage API key is needed");
    }
    const userData = await axios_default
      .post(
        `https://api.passage.id/v1/apps/${__privateGet(this, _appID)}/users/`,
        payload,
        __privateGet(this, _authorizationHeader)
      )
      .catch((err) => {
        throw new PassageError("Could not create user", err);
      })
      .then((res) => {
        return res.data.user;
      });
    return userData;
  }
  /**
   * Delete a user using their user ID.
   *
   * @param {string} userID The userID used to delete the corresponding user.
   * Either an E164 phone number or email address.
   * @return {boolean} True if user was deleted, false if not
   */
  async delete(userID) {
    if (!__privateGet(this, _apiKey)) {
      throw new PassageError("A Passage API key is needed");
    }
    const response = await axios_default
      .delete(
        `https://api.passage.id/v1/apps/${__privateGet(
          this,
          _appID
        )}/users/${userID}`,
        __privateGet(this, _authorizationHeader)
      )
      .catch((err) => {
        throw new PassageError("Could not delete user.", err);
      })
      .then((res) => {
        return res.status.valueOf();
      });
    return response === 200;
  }
  /**
   * Get a user's devices using their user ID.
   *
   * @param {string} userID The Passage user ID
   * @return {Promise<Array<WebAuthnDevices>>} List of devices
   */
  async listDevices(userID) {
    if (!__privateGet(this, _apiKey)) {
      throw new PassageError("A Passage API key is needed");
    }
    const devices = await axios_default
      .get(
        `https://api.passage.id/v1/apps/${__privateGet(
          this,
          _appID
        )}/users/${userID}/devices`,
        __privateGet(this, _authorizationHeader)
      )
      .catch((err) => {
        throw new PassageError("Could not fetch user's devices.", err);
      })
      .then((res) => {
        return res.data.devices;
      });
    return devices;
  }
  /**
   * Revoke a user's device using their user ID and the device ID.
   *
   * @param {string} userID The Passage user ID
   * @param {string} deviceID The Passage user's device ID
   * @return {Promise<boolean>}
   */
  async revokeDevice(userID, deviceID) {
    if (!__privateGet(this, _apiKey)) {
      throw new PassageError("A Passage API key is needed");
    }
    const success = await axios_default
      .delete(
        `https://api.passage.id/v1/apps/${__privateGet(
          this,
          _appID
        )}/users/${userID}/devices/${deviceID}`,
        __privateGet(this, _authorizationHeader)
      )
      .catch((err) => {
        throw new PassageError("Could not delete user's device", err);
      })
      .then(() => {
        return true;
      });
    return success;
  }
  /**
   * Revokes all of a user's Refresh Tokens using their User ID.
   *
   * @param {string} userID The Passage user ID
   * @return {Promise<boolean>}
   */
  async signOut(userID) {
    if (!__privateGet(this, _apiKey)) {
      throw new PassageError("A Passage API key is needed");
    }
    return axios_default
      .delete(
        `https://api.passage.id/v1/apps/${__privateGet(
          this,
          _appID
        )}/users/${userID}/tokens/`,
        __privateGet(this, _authorizationHeader)
      )
      .catch((err) => {
        throw new PassageError("Could not revoke user's refresh tokens.", err);
      })
      .then(() => {
        return true;
      });
  }
};
_appID = new WeakMap();
_apiKey = new WeakMap();
_authorizationHeader = new WeakMap();

// src/classes/Passage.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var import_jwk_to_pem = __toESM(require("jwk-to-pem"), 1);
var AUTH_CACHE = {};
var _apiKey2;
var Passage = class {
  /**
   * Initialize a new Passage instance.
   * @param {PassageConfig} config The default config for Passage initialization
   */
  constructor(config) {
    __privateAdd(this, _apiKey2, void 0);
    if (!config?.appID) {
      throw new PassageError(
        "A Passage appID is required. Please include {appID: YOUR_APP_ID}."
      );
    }
    this.appID = config.appID;
    __privateSet(this, _apiKey2, config?.apiKey);
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
  async authenticateRequest(req) {
    if (this.authStrategy == "HEADER") {
      return this.authenticateRequestWithHeader(req);
    } else {
      return this.authenticateRequestWithCookie(req);
    }
  }
  /**
   * Set API key for this Passage instance
   * @param {string} _apiKey
   */
  set apiKey(_apiKey3) {
    __privateSet(this, _apiKey2, _apiKey3);
  }
  /**
   * Get API key for this Passage instance
   * @return {string | undefined} Passage API Key
   */
  get apiKey() {
    return __privateGet(this, _apiKey2);
  }
  /**
   * Fetch the corresponding JWKS for this app.
   *
   * @param {boolean} resetCache Optional value to specify whether or not the cache should be reset
   * @return {JWKS} JWKS for this app.
   */
  async fetchJWKS(resetCache) {
    if (
      AUTH_CACHE[this.appID] !== void 0 &&
      Object.keys(AUTH_CACHE).length > 0 &&
      !resetCache
    ) {
      return AUTH_CACHE[this.appID]["jwks"];
    }
    const jwks = await axios_default
      .get(
        `https://auth.passage.id/v1/apps/${this.appID}/.well-known/jwks.json`
      )
      .catch((err) => {
        throw new PassageError("Could not fetch appID's JWKs", err);
      })
      .then((res) => {
        const jwks2 = res.data.keys;
        const formattedJWKS = {};
        for (const jwk of jwks2) {
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
  async authenticateRequestWithHeader(req) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new PassageError(
        "Header authorization not found. You must catch this error."
      );
    } else {
      const authToken = authorization.split(" ")[1];
      const userID = await this.validAuthToken(authToken);
      if (userID) {
        return userID;
      } else {
        throw new Error("Auth token is invalid");
      }
    }
  }
  /**
   * Authenticate request via cookie.
   *
   * @param {Request} req Express request
   * @return {string} UserID for Passage User
   */
  async authenticateRequestWithCookie(req) {
    const cookiesStr = req.headers?.cookie;
    if (!cookiesStr) {
      throw new PassageError(
        "Could not find valid cookie for authentication. You must catch this error."
      );
    }
    const cookies = cookiesStr.split(";");
    let passageAuthToken;
    for (const cookie of cookies) {
      const sepIdx = cookie.indexOf("=");
      if (sepIdx === -1) {
        continue;
      }
      const key = cookie.slice(0, sepIdx).trim();
      if (key !== "psg_auth_token") {
        continue;
      }
      passageAuthToken = cookie.slice(sepIdx + 1).trim();
      break;
    }
    if (passageAuthToken) {
      const userID = await this.validAuthToken(passageAuthToken);
      if (userID) return userID;
      else {
        throw new PassageError(
          "Could not validate auth token. You must catch this error."
        );
      }
    } else {
      throw new PassageError(
        "Could not find authentication cookie 'psg_auth_token' token. You must catch this error."
      );
    }
  }
  /**
   *
   * @param {string} kid the KID from the authToken to determine which JWK to use.
   * @return {Promise<JWK | undefined>} the JWK to be used for decoding an authToken with the associated KID.
   */
  async _findJWK(kid) {
    if (!AUTH_CACHE) return void 0;
    try {
      const jwk = AUTH_CACHE[this.appID]["jwks"][kid];
      if (jwk) {
        return jwk;
      }
    } catch (e) {
      await this.fetchJWKS(true);
      const jwk = AUTH_CACHE[this.appID]["jwks"][kid];
      if (jwk) {
        return jwk;
      }
      return void 0;
    }
  }
  /**
   * Determine if the provided token is valid when compared with its
   * respective public key.
   *
   * @param {string} token Authentication token
   * @return {string} sub claim if the jwt can be verified, or undefined
   */
  async validAuthToken(token) {
    try {
      const { kid } = import_jsonwebtoken.default.decode(token, {
        complete: true,
      }).header;
      if (!kid) {
        return void 0;
      }
      const jwk = await this._findJWK(kid);
      if (!jwk) {
        return void 0;
      }
      const pem = (0, import_jwk_to_pem.default)(jwk);
      const userID = import_jsonwebtoken.default.verify(token, pem, {
        // @ts-ignore
        algorithms: jwk.alg,
      }).sub;
      if (userID) return userID.toString();
      else return void 0;
    } catch (e) {
      return void 0;
    }
  }
  /**
   * Create a Magic Link for your app.
   *
   * @param {MagicLinkRequest} magicLinkReq options for creating a MagicLink.
   * @return {Promise<MagicLinkObject>} Passage MagicLink object
   */
  async createMagicLink(magicLinkReq) {
    const magicLinkData = await axios_default
      .post(
        `https://api.passage.id/v1/apps/${this.appID}/magic-links/`,
        magicLinkReq,
        {
          headers: {
            Authorization: `Bearer ${__privateGet(this, _apiKey2)}`,
          },
        }
      )
      .catch((err) => {
        throw new PassageError(
          "Could not create a magic link for this app.",
          err
        );
      })
      .then((res) => {
        return res.data.magic_link;
      });
    return magicLinkData;
  }
  /**
   * Get App Info about an app
   *
   * @return {Promise<AppObject>} Passage App object
   */
  async getApp() {
    const appData = await axios_default
      .get(`https://api.passage.id/v1/apps/${this.appID}`)
      .catch((err) => {
        throw new PassageError("Could not fetch app.", err);
      })
      .then((res) => {
        return res.data.app;
      });
    return appData;
  }
};
_apiKey2 = new WeakMap();

// src/index.ts
var src_default = Passage;
