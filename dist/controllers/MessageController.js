"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageDao_1 = __importDefault(require("../daos/MessageDao"));
/**
 * @class UserController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:from/messages/:to to create a new message instance</li>
 *     <li>DELETE /api/users/:from/messages/:to to remove a particular message instance</li>
 *     <li>GET /api/users/:from/messages to retrieve an individual message instance based on sender</li>
 *     <li>GET /api/users/:to/messages to retrieve an individual message instance based on receiver </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
class MessageController {
    constructor() {
        /**
          * Creates a new message instance
          * @param {Request} req Represents request from client, including the path
          * parameter from, to and body representing the sending and receiving user and message body
          * @param {Response} res Represents response to client, including the
          * body formatted as JSON arrays containing the message objects
          */
        this.userSendsMessage = (req, res) => MessageController.messageDao.userSendsMessage(req.params.from, req.params.to, req.body)
            .then((message) => res.json(message));
        /**
         * Removes a message instance from the database
         * @param {Request} req Represents request from client, including the path
         * parameter from and to representing the sending and receiving users
         * @param {Response} res Represents response to client, including status
         * on whether deleting a message was successful or not
         */
        this.userDeletesMessage = (req, res) => MessageController.messageDao.userDeletesMessage(req.params.from, req.params.to)
            .then(status => res.send(status));
        /**
         * Retrieves the message by the sender
         * @param {Request} req Represents request from client, including path
         * parameter from representing the user that sent the message
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the message that matches the user ID
         */
        this.findSentMessages = (req, res) => MessageController.messageDao.findSentMessages(req.params.from)
            .then(messages => res.json(messages));
        /**
         * Retrieves the message by the receiver
         * @param {Request} req Represents request from client, including path
         * parameter from representing the user that received the message
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the message that matches the user ID
         */
        this.findReceivedMessages = (req, res) => MessageController.messageDao.findReceivedMessages(req.params.to)
            .then(messages => res.json(messages));
    }
}
exports.default = MessageController;
MessageController.messageDao = MessageDao_1.default.getInstance();
MessageController.messageController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful web services API
 * @returns MessageController
 */
MessageController.getInstance = (app) => {
    if (MessageController.messageController === null) {
        MessageController.messageController = new MessageController();
        app.post("/api/users/:from/messages/:to", MessageController.messageController.userSendsMessage);
        app.delete("/api/users/:from/messages/:to", MessageController.messageController.userDeletesMessage);
        app.get("/api/users/:from/messages", MessageController.messageController.findSentMessages);
        app.get("/api/users/:to/messages", MessageController.messageController.findReceivedMessages);
    }
    return MessageController.messageController;
};
;
//# sourceMappingURL=MessageController.js.map