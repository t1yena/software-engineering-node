/**
 * @file Interface for bookmarks controller
 */
import {Request, Response} from "express";

export default interface BookmarkControllerI {
    findUserBookmarks (req: Request, res: Response): void;
    userBookmarksTuit (req: Request, res: Response): void;
    userUnbookmarksTuit (req: Request, res: Response): void;
};