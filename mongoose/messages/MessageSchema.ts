/**
 * @file Defines Message Schema that maps to messages collection in MongoDB database.
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref:'UserModel'},
    from: {type: Schema.Types.ObjectId, ref:'UserModel'},
    sentOn: {type: Date, default: Date.now}
}, {collection: 'messages'});
export default MessageSchema;
