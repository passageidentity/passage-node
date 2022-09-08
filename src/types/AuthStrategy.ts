/* eslint-disable no-unused-vars */

export enum AuthStrategyEnum {
  COOKIE = "COOKIE",
  HEADER = "HEADER",
}

export type AuthStrategy = keyof typeof AuthStrategyEnum;
