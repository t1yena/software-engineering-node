import Message from "../models/messages/Message";

/**
 * @file Declares API for Message related data access object methods
 */
export default interface MessageDaoI {
    userSendsMessage (toUser: string, fromUser:string,message: Message): Promise<Message>;
    userDeletesMessage (toUser: string, fromUser: string): Promise<any>;
    findSentMessages (me: string): Promise<Message[]>;
    findReceivedMessages (uid: string): Promise<Message[]>;
};