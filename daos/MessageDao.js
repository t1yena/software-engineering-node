var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @file Implements DAO managing data storage of messages.
 * Uses mongoose MessageModel to integrate with MongoDB
 */
import MessageModel from "../mongoose/messages/MessageModel";
/**
 * @class MessageDao Implements Data Access Object
 * managing data storage of Message
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao {
    constructor() {
        this.userSendsMessage = (toUser, fromUser, message) => __awaiter(this, void 0, void 0, function* () { return MessageModel.create(Object.assign(Object.assign({}, message), { to: toUser, from: fromUser })); });
        this.userDeletesMessage = (toUser, fromUser) => __awaiter(this, void 0, void 0, function* () { return MessageModel.deleteOne({ to: toUser, from: fromUser }); });
        this.findSentMessages = (me) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel
                .find({ from: me }).exec();
        });
        this.findReceivedMessages = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel
                .find({ to: uid }).exec();
        });
    }
}
MessageDao.messageDao = null;
MessageDao.getInstance = () => {
    if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
