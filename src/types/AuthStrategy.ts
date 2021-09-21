enum AuthStrategyEnum {
    "COOKIE",
    "HEADER"
}

export type AuthStrategy = keyof typeof AuthStrategyEnum;
