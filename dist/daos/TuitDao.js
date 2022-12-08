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
 * @file Implements DAO managing data storage of tuits.
 * Uses mongoose TuitModel to integrate with MongoDB
 */
const TuitModel_1 = __importDefault(require("../mongoose/tuits/TuitModel"));
/**
 * @class TuitDao Implements Data Access Object
 * managing data storage of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
class TuitDao {
    constructor() {
        /**
         * Retrieve tuits from specific user using TuitModel
         * @param uid user's primary key
         * @returns Promise to be notified when tuits are retrieved
         */
        this.findAllTuitsByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.find({ postedBy: uid })
                .populate("postedBy")
                .exec();
        });
        /**
         * Retrieve tuit based on tuit id using TuitModel
         * @param tid tuit's primary key
         * @returns Promise to be notified when tuit is retrieved
         */
        this.findTuitById = (tid) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.findById(tid)
                .populate("postedBy")
                .exec();
        });
        /**
         * Update tuit values
         * @param tid tuit id of tuit being updated
         * @param tuit Tuit object with values to update
         * @returns Promise to be notified when tuit is updated
         */
        this.updateTuit = (tid, tuit) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tid }, { $set: tuit });
        });
        /**
         * Remove tuit instance
         * @param tid tuit id of tuit to be removed
         * @returns Promise when tuit is removed
         */
        this.deleteTuit = (tid) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.deleteOne({ _id: tid }); });
        /**
         * Update number of likes using tuit's stats
         * @param tid tuit id of tuit being updated
         * @param newStats Stats object that will be updated
         * @returns
         */
        this.updateLikes = (tid, newStats) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.updateOne({ _id: tid }, { $set: { stats: newStats } }); });
    }
    /**
     * Retrieve all tuits from collection using TuitModel
     * @returns Promise to be notified when all tuits are retrieved
     */
    findAllTuits() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.find().populate('postedBy', 'username').exec();
        });
    }
    /**
     * Create tuit instance
     * @param uid primary key of user creating the tuit
     * @param tuit tuit instance to create
     * @returns Promise to be notified when tuit is created
     */
    createTuit(uid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.create(Object.assign(Object.assign({}, tuit), { postedBy: uid }));
        });
    }
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
//# sourceMappingURL=TuitDao.js.map