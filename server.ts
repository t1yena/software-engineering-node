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
import express from 'express';
import {Request, Response} from "express";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import * as mongoose from "mongoose";
import FollowController from './controllers/FollowController';
import LikeController from './controllers/LikeController';
import BookmarkController from './controllers/BookmarkController';
import MessageController from './controllers/MessageController';

var cors = require('cors')

const session = require('express-session'); 
 const app = express();  
 const MongoStore = require('connect-mongo');

 const corsConfig = {
     origin: 'http://localhost:3000',
     credentials: true,
     optionSuccessStatus: 200
 }
 app.use(cors(corsConfig)); 
 app.use(express.json());


// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
// const DB_USERNAME = "t1yena";
// const DB_PASSWORD = "yenawebdev";
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
}
app.use(session(sess));

if (process.env.ENV === 'PRODUCTION') {
   app.set('trust proxy', 1) // trust first proxy
   sess.cookie.secure = true // serve secure cookies
}

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);

//Start a server listening at port 4000 locally
const PORT = 4000;
app.listen(process.env.PORT || PORT);
