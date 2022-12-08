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
const LikeModel_1 = __importDefault(require("../mongoose/likes/LikeModel"));
/**
 * @class LikeDao Implements Data Access Object
 * managing data storage of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
class LikeDao {
    constructor() {
        /**
         * Find all users that liked a tuit
         * @param tid tuit id of tuit that was liked by users
         * @returns promise to be notified when likes are retrieved
         */
        this.findAllUsersThatLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ tuit: tid, type: 'LIKE' })
                .populate("likedBy")
                .exec();
        });
        /**
         * Finds all tuits that a user likes
         * @param uid user id of user that liked the tuits
         * @returns Promise to be notified when like are retrieved
         */
        this.findAllTuitsLikedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ likedBy: uid, type: 'LIKE' })
                .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
                .exec();
        });
        /**
         * Finds all tuits that a user dislikes
         * @param uid user id of user that disliked the tuits
         * @returns Promise to be notified when dislike are retrieved
         */
        this.findAllTuitsDislikedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ likedBy: uid, type: 'DISLIKE' })
                .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
                .exec();
        });
        /**
         * Creates like instance where a user likes a tuit
         * @param uid user id of user liking the tuit
         * @param tid tuit id of tuit being liked
         * @returns Promise to be notified when like is created
         */
        this.userLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.create({ tuit: tid, likedBy: uid, type: 'LIKE' }); });
        /**
         * Removes like instance where a user unlikes a tuit
         * @param uid user id of user unliking the tuit
         * @param tid tuit id of tuit being unliked
         * @returns Promise to be notified when like is removed
         */
        this.userUnlikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.deleteOne({ tuit: tid, likedBy: uid }); });
        /**
         * Finds like instance where a user likes a tuit
         * @param uid user id of user liking the tuit
         * @param tid tuit id of tuit being liked
         * @returns Promise to be notified when like is created
         */
        this.findUserLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.findOne({ tuit: tid, likedBy: uid, type: 'LIKE' }); });
        /**
         * Counts number of likes on a tuit using LikeModel
         * @param tid tuit id of tuit being liked
         * @returns Promise to be notified when number of likes are retrieved
         */
        this.countHowManyLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.count({ tuit: tid, type: 'LIKE' }); });
        /**
         * Creates like instance where a user dislikes a tuit
         * @param uid user id of user liking the tuit
         * @param tid tuit id of tuit being liked
         * @returns Promise to be notified when like is created
         */
        this.userDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.create({ tuit: tid, likedBy: uid, type: 'DISLIKE' }); });
        /**
         * Finds like instance where a user dislikes a tuit
         * @param uid user id of user liking the tuit
         * @param tid tuit id of tuit being liked
         * @returns Promise to be notified when like is created
         */
        this.findUserDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.findOne({ tuit: tid, likedBy: uid, type: 'DISLIKE' }); });
        /**
         * Counts number of likes on a tuit using LikeModel
         * @param tid tuit id of tuit being liked
         * @returns Promise to be notified when number of likes are retrieved
         */
        this.countHowManyDislikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.count({ tuit: tid, type: 'DISLIKE' }); });
        /**
         * Update like type given user id and tuid id
         * @param uid user id
         * @param tid tuit id
         * @param type type to be updated
         * @returns Promise to be notified when type is updated
         */
        this.updateLikeType = (uid, tid, type) => __awaiter(this, void 0, void 0, function* () {
            LikeModel_1.default.updateOne({ tuit: tid, likedBy: uid }, { $set: { type } });
        });
    }
}
exports.default = LikeDao;
LikeDao.likeDao = null;
LikeDao.getInstance = () => {
    if (LikeDao.likeDao === null) {
        LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
};
//# sourceMappingURL=LikeDao.js.map