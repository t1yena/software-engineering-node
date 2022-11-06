/**
 * @file Defines Bookmark Schema that maps to bookmarks collection in MongoDB database.
 */
import mongoose, { Schema } from "mongoose";
const BookmarkSchema = new mongoose.Schema({
    tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    bookmarkedBy: { type: Schema.Types.ObjectId, ref: 'UserModel' }
}, { collection: 'bookmarks' });
export default BookmarkSchema;
