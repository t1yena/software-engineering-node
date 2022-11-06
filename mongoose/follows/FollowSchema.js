/**
 * @file Defines Follow Schema that maps to follows collection in MongoDB database.
 */
import mongoose, { Schema } from "mongoose";
const FollowSchema = new mongoose.Schema({
    follower: { type: Schema.Types.ObjectId, ref: 'UserModel' },
    followed: { type: Schema.Types.ObjectId, ref: 'UserModel' },
}, { collection: 'follows' });
export default FollowSchema;
