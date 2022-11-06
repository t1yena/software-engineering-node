/**
 * @file Implements DAO managing data storage of messages. 
 * Uses mongoose MessageModel to integrate with MongoDB
 */
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";
import MessageDaoI from "../interfaces/MessageDaoI";

 /**
  * @class MessageDao Implements Data Access Object 
  * managing data storage of Message
  * @property {MessageDao} messageDao Private single instance of MessageDao
  */
export default class MessageDao implements MessageDaoI{
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}
    
    userSendsMessage = async (toUser: string, fromUser:string,message: Message): Promise<Message> =>
        MessageModel.create({...message, to: toUser, from: fromUser});
    userDeletesMessage = async (toUser: string, fromUser: string): Promise<any> =>
        MessageModel.deleteOne({to: toUser, from: fromUser});
    findSentMessages = async (me: string): Promise<Message[]> =>
    MessageModel
        .find({from: me}).exec();
    findReceivedMessages = async (uid: string): Promise<Message[]> =>
    MessageModel
        .find({to: uid}).exec();
}