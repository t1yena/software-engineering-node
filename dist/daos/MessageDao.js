"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements DAO managing data storage of messages.
 * Uses mongoose MessageModel to integrate with MongoDB
 */
const MessageModel_1 = __importDefault(require("../mongoose/messages/MessageModel"));
/**
 * @class MessageDao Implements Data Access Object
 * managing data storage of Message
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
class MessageDao {
    constructor() {
        this.userSendsMessage = (toUser, fromUser, message) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.create(Object.assign(Object.assign({}, message), { to: toUser, from: fromUser })); });
        this.userDeletesMessage = (toUser, fromUser) => __awaiter(this, void 0, void 0, function* () { return MessageModel_1.default.deleteOne({ to: toUser, from: fromUser }); });
        this.findSentMessages = (me) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ from: me }).exec();
        });
        this.findReceivedMessages = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default
                .find({ to: uid }).exec();
        });
    }
}
exports.default = MessageDao;
MessageDao.messageDao = null;
MessageDao.getInstance = () => {
    if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
//# sourceMappingURL=MessageDao.js.map