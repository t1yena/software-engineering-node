/**
 * @file Interface for message controller
 */
import {Request, Response} from "express";

export default interface MessageControllerI {
    userSendsMessage (req: Request, res: Response): void;
    userDeletesMessage (req: Request, res: Response): void;
    findSentMessages (req: Request, res: Response): void;
    findReceivedMessages (req: Request, res: Response): void;
};