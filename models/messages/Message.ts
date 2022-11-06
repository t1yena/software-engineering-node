/**
 * @file Declares Message data type representing relationship between
 * users, as in a user messages another user
 */
import User from "../users/User";

 /**
  * @typedef Message represents message relationship between users
  * @property {string} message message being sent
  * @property {User} to User receiving the message
  * @property {User} from User sending the message
  * @property {Date} Date Date the message was sent
  */
 
  export default interface Message {
    message: string,
    to: User,
    from: User,
    sentOn: Date,
};