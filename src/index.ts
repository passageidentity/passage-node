import { Request, NextFunction, Response } from "express-serve-static-core";
import { PassageConfig } from "./types/PassageConfig";
import Passage from "./classes/Passage";

declare global{
    namespace Express {
        export interface Response {
            passage: Passage
        }
    }
}

export default function initialize(config: PassageConfig) {
    if (!config.appID) throw new Error("Passage requires an App ID");
    
    let passage = new Passage(config);
    return (req: Request, res: Response, next: NextFunction) => {
        passage.authenticateRequest(req, res, next);
    }
}

export {
    Passage as Passage
}