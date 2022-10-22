/**
/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
 import express from 'express';
 import {Request, Response} from "express";
 import UserController from "./controllers/UserController";
 import TuitController from "./controllers/TuitController";
 import mongoose from "mongoose";
 var cors = require('cors')

// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = "t1yena";
const DB_PASSWORD = "yenawebdev";
const HOST = "cluster0.bppa0ew.mongodb.net";
const DB_NAME = "FSE";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// connect to the database
mongoose.connect(connectionString);

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
