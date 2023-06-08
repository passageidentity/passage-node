/* eslint-disable no-unused-vars */

enum AuthStrategyEnum {
  COOKIE = 'COOKIE',
  HEADER = 'HEADER',
}

export type AuthStrategy = keyof typeof AuthStrategyEnum;
