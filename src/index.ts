import { Request, NextFunction, Response } from "express-serve-static-core";
import { PassageConfig } from "./types/PassageConfig";
import Passage from "./classes/Passage";


export var passagePublicKeyCache: any = {}

declare global{
    namespace Express {
        export interface Response {
            passage: Passage | boolean
        }
    }
}

module.exports = Passage;

export default Passage;