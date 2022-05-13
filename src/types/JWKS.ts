export interface AUTHCACHE {
  [appID: string]: {
    jwks: JWKS;
  };
}

export interface JWKS {
  [kid: string]: JWK;
}

export interface JWK {
  alg: Algorithm;
  kty: string;
  use: string;
  n: string;
  e: string;
  kid: string;
}
