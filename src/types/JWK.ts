export interface JWK {
  alg: Algorithm;
  kty: string;
  use: string;
  n: string;
  e: string;
  kid: string;
}
