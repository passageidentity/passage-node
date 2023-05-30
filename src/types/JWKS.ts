import { JWK } from "jose";
export interface AUTHCACHE {
  [appID: string]: {
    jwks: JWKS;
  };
}

export interface JWKS {
  [kid: string]: JWK;
}
