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
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";
/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class TuitDao {
    constructor() {
        this.findAllTuits = () => __awaiter(this, void 0, void 0, function* () {
            return TuitModel.find()
                .populate("postedBy")
                .exec();
        });
        this.findAllTuitsByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel.find({ postedBy: uid })
                .populate("postedBy")
                .exec();
        });
        this.findTuitById = (uid) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel.findById(uid)
                .populate("postedBy")
                .exec();
        });
        this.createTuitByUser = (uid, tuit) => __awaiter(this, void 0, void 0, function* () { return TuitModel.create(Object.assign(Object.assign({}, tuit), { postedBy: uid })); });
        this.updateTuit = (uid, tuit) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel.updateOne({ _id: uid }, { $set: tuit });
        });
        this.deleteTuit = (uid) => __awaiter(this, void 0, void 0, function* () { return TuitModel.deleteOne({ _id: uid }); });
    }
}
TuitDao.tuitDao = null;
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
