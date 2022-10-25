import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @file Declares API for Bookmark related data access object methods
 */
export default interface BookmarkDaoI {
    findUserBookmarks (uid: string): Promise<Bookmark[]>;
    userBookmarksTuit (uid: string, tid: string): Promise<any>;
    userUnbookmarksTuit (uid: string, tid: string): Promise<any>;
};