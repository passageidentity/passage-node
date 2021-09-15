enum AuthStrategyEnum {
    "COOKIE",
    "HEADER",
    "DEFAULT"
}

export type AuthStrategy = keyof typeof AuthStrategyEnum;
