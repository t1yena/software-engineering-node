"use strict";
/**
/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>messages</li>
 *     <li>bookmarks</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
//  import express from 'express';
//  import {Request, Response} from "express";
//  import UserController from "./controllers/UserController";
//  import TuitController from "./controllers/TuitController";
//  import mongoose from "mongoose";
//  import FollowController from './controllers/FollowController';
//  import LikeController from './controllers/LikeController';
//  import BookmarkController from './controllers/BookmarkController';
//  import MessageController from './controllers/MessageController';
//  import AuthController from './controllers/AuthController';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//   var cors = require('cors')
//  // build the connection string
//  const PROTOCOL = "mongodb+srv";
// //  const DB_USERNAME = process.env.DB_USERNAME;
// //  const DB_PASSWORD = process.env.DB_PASSWORD;
//  const DB_USERNAME = "t1yena";
//  const DB_PASSWORD = "yenawebdev";
//  const HOST = "cluster0.bppa0ew.mongodb.net";
//  const DB_NAME = "FSE";
//  const DB_QUERY = "retryWrites=true&w=majority";
//  const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
//  // connect to the database
//  mongoose.connect(connectionString);
//  const app = express();
//  app.use(express.json());
//  app.use(cors());
//  app.get('/', (req: Request, res: Response) =>
//      res.send('Welcome!'));
//  app.get('/add/:a/:b', (req: Request, res: Response) =>
//      res.send(req.params.a + req.params.b));
//  // create RESTful Web service API
//  const userController = UserController.getInstance(app);
//  const tuitController = TuitController.getInstance(app);
//  const likeController = LikeController.getInstance(app);
//  const followController = FollowController.getInstance(app);
//  const bookmarkController = BookmarkController.getInstance(app);
//  const messageController = MessageController.getInstance(app);
//  const authController= AuthController.getInstance(app);
//  //Start a server listening at port 4000 locally
//  const PORT = 4000;
//  app.listen(process.env.PORT || PORT);
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const mongoose = __importStar(require("mongoose"));
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
var cors = require('cors');
var session = require('express-session');
const app = (0, express_1.default)();
var MongoStore = require('connect-mongo');
const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsConfig));
app.use(express_1.default.json());
// build the connection string
const PROTOCOL = "mongodb+srv";
//  const DB_USERNAME = process.env.DB_USERNAME;
//  const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USERNAME = "t1yena";
const DB_PASSWORD = "yenawebdev";
const HOST = "cluster0.bppa0ew.mongodb.net";
const DB_NAME = "FSE";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// connect to the database
mongoose.connect(connectionString);
let sess = {
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    },
    store: MongoStore.create({ mongoUrl: connectionString })
};
app.use(session(sess));
if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
}
app.get('/', (req, res) => res.send('Welcome!'));
app.get('/add/:a/:b', (req, res) => res.send(req.params.a + req.params.b));
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
const bookmarkController = BookmarkController_1.default.getInstance(app);
const likeController = LikeController_1.default.getInstance(app);
const followController = FollowController_1.default.getInstance(app);
const messageController = MessageController_1.default.getInstance(app);
const authenticationController = AuthController_1.default.getInstance(app);
const PORT = 4000;
app.listen(process.env.PORT || PORT);
//# sourceMappingURL=server.js.map