/**
 * @file Defines Like Schema that maps to likes collection in MongoDB database.
 */
import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/Like";

const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    likeType: {type:String, enum:["LIKE","DISLIKE"]}
}, {collection: "likes"});
export default LikeSchema;