import { AuthStrategy } from './AuthStrategy';

export type PassageConfig = {
  appID: string;
  apiKey?: string;
  authStrategy?: AuthStrategy;
  failureRedirect?: string;
};
