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
const LikeDao_1 = __importDefault(require("../daos/LikeDao"));
const TuitDao_1 = __importDefault(require("../daos/TuitDao"));
/**
 * @class LikeController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no longer likes a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
class LikeController {
    constructor() {
        /**
         * Retrieves all users that liked a tuit from the database
         * @param {Request} req Represents request from client, including the path
         * parameter tid representing the liked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllUsersThatLikedTuit = (req, res) => LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
        /**
         * Retrieves all tuits liked by a user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user liked the tuits
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects that were liked
         */
        this.findAllTuitsLikedByUser = (req, res) => {
            const uid = req.params.uid;
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ? profile._id : uid;
            LikeController.likeDao.findAllTuitsLikedByUser(userId)
                .then(likes => {
                const likesNonNullTuits = likes.filter(like => like.tuit);
                const tuitsFromLikes = likesNonNullTuits.map(like => like.tuit);
                res.json(tuitsFromLikes);
            });
        };
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is liking the tuit
         * and the tuit being liked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new likes that was inserted in the
         * database
         */
        this.userLikesTuit = (req, res) => LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is unliking
         * the tuit and the tuit being unliked
         * @param {Response} res Represents response to client, including status
         * on whether deleting the like was successful or not
         */
        this.userUnlikesTuit = (req, res) => LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
        /**
         * Update tuit's like count based on whether user has previously liked a tuit
         * @param req Represents request from client, including the
          * path parameters uid and tid representing the user that is liking
          * the tuit and the tuit being liked
         * @param res Represents response to client, including status
          * on whether updating the like was successful or not
         */
        this.userTogglesTuitLikes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ? profile._id : uid;
            try {
                const userAlreadyLikedTuit = yield LikeController.likeDao.findUserLikesTuit(userId, tid);
                const howManyLikedTuit = yield LikeController.likeDao.countHowManyLikedTuit(tid);
                const userAlreadyDislikedTuit = yield LikeController.likeDao.findUserDislikesTuit(userId, tid);
                const dislikeCount = yield LikeController.likeDao.countHowManyDislikedTuit(tid);
                let tuit = yield LikeController.tuitDao.findTuitById(tid);
                // user already likes tuit
                if (userAlreadyLikedTuit) {
                    yield LikeController.likeDao.userUnlikesTuit(userId, tid);
                    tuit.stats.likes = howManyLikedTuit - 1;
                    tuit.stats.dislikes = dislikeCount + 1;
                    // user already disliked tuit
                }
                else if (userAlreadyDislikedTuit) {
                    yield LikeController.likeDao.updateLikeType(userId, tid, "LIKE");
                    tuit.stats.likes = howManyLikedTuit + 1;
                    tuit.stats.dislikes = dislikeCount - 1;
                }
                // neither liked or disliked
                else {
                    yield LikeController.likeDao.userLikesTuit(userId, tid);
                    tuit.stats.likes = howManyLikedTuit + 1;
                }
                ;
                yield LikeController.tuitDao.updateLikes(tid, tuit.stats);
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
        /**
         * Update tuit's dislike count based on whether user has previously disliked a tuit
         * @param req Represents request from client, including the
          * path parameters uid and tid representing the user that is disliking
          * the tuit and the tuit being disliked
         * @param res Represents response to client, including status
          * on whether updating the dislike was successful or not
         */
        this.userTogglesTuitDislikes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ? profile._id : uid;
            try {
                const userAlreadyLikedTuit = yield LikeController.likeDao.findUserLikesTuit(userId, tid);
                const userAlreadyDislikedTuit = yield LikeController.likeDao.findUserDislikesTuit(userId, tid);
                const howManyDislikedTuit = yield LikeController.likeDao.countHowManyDislikedTuit(tid);
                const howManyLikedTuit = yield LikeController.likeDao.countHowManyLikedTuit(tid);
                let tuit = yield LikeController.tuitDao.findTuitById(tid);
                if (userAlreadyLikedTuit) {
                    yield LikeController.likeDao.updateLikeType(userId, tid, "DISLIKE");
                    tuit.stats.likes = howManyLikedTuit - 1;
                    tuit.stats.dislikes = howManyDislikedTuit + 1;
                }
                else if (userAlreadyDislikedTuit) {
                    yield LikeController.likeDao.userUnlikesTuit(userId, tid);
                    tuit.stats.dislikes = howManyDislikedTuit - 1;
                    tuit.stats.likes = howManyLikedTuit + 1;
                }
                else {
                    yield LikeController.likeDao.userDislikesTuit(userId, tid);
                    tuit.stats.dislikes = howManyDislikedTuit + 1;
                }
                ;
                yield LikeController.tuitDao.updateLikes(tid, tuit.stats);
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
        /**
          * Retrieves all tuits disliked by a user from the database
          * @param {Request} req Represents request from client, including the path
          * parameter uid representing the user disliked the tuits
          * @param {Response} res Represents response to client, including the
          * body formatted as JSON arrays containing the tuit objects that were disliked
          */
        this.findAllTuitsDislikedByUser = (req, res) => {
            const uid = req.params.uid;
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ? profile._id : uid;
            LikeController.likeDao.findAllTuitsDislikedByUser(userId)
                .then(dislikes => {
                const dislikesNonNullTuits = dislikes.filter(dislike => dislike.tuit);
                const tuitsFromDislikes = dislikesNonNullTuits.map(dislike => dislike.tuit);
                res.json(tuitsFromDislikes);
            });
        };
    }
}
exports.default = LikeController;
LikeController.likeDao = LikeDao_1.default.getInstance();
LikeController.likeController = null;
LikeController.tuitDao = TuitDao_1.default.getInstance();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return LikeController
 */
LikeController.getInstance = (app) => {
    if (LikeController.likeController === null) {
        LikeController.likeController = new LikeController();
        app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
        app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
        app.get("/api/users/:uid/dislikes", LikeController.likeController.findAllTuitsDislikedByUser);
        app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
        app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
        app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
        app.put("/api/users/:uid/dislikes/:tid", LikeController.likeController.userTogglesTuitDislikes);
    }
    return LikeController.likeController;
};
;
//# sourceMappingURL=LikeController.js.map