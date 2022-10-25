/**
 * @file Defines Follow Schema that maps to follows collection in MongoDB database.
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

const FollowSchema = new mongoose.Schema<Follow>({
    follower: {type: Schema.Types.ObjectId, ref:'UserModel'},
    followed: {type: Schema.Types.ObjectId, ref:'UserModel'},
}, {collection: 'follows'});
export default FollowSchema;
