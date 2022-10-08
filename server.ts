/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import UserDao from './daos/UserDao';
import UserController from './controllers/UserController';
import TuitDao from './daos/TuitDao';
import TuitController from './controllers/TuitController';

const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/fse');

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));

app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const userDao = new UserDao();
const userController = new UserController(app, userDao);

const tuitDao = TuitDao.getInstance();
const tuitController = TuitController
  .getInstance(app, tuitDao);

  const PORT = 4000;

app.listen(process.env.PORT || PORT);
