/**
 * @file Controller RESTful Web service API for likes resource
 */
 import {Express, Request, Response} from "express";
 import LikeDao from "../daos/LikeDao";
 import LikeControllerI from "../interfaces/LikeControllerI";
 import TuitDao from "../daos/TuitDao";
 import LikeModel from "../models/likes/Like";

 
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
 export default class LikeController implements LikeControllerI {
     private static likeDao: LikeDao = LikeDao.getInstance();
     private static likeController: LikeController | null = null;
     private static tuitDao: TuitDao = TuitDao.getInstance();
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return LikeController
     */
     public static getInstance = (app: Express): LikeController => {
         if(LikeController.likeController === null) {
             LikeController.likeController = new LikeController();
             app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
             app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
             app.get("/api/users/:uid/dislikes", LikeController.likeController.findAllTuitsDislikedByUser);
             app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
             app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
             app.delete("/api/likes", LikeController.likeController.deleteAllLikes);
             app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
             app.put("/api/users/:uid/dislikes/:tid", LikeController.likeController.userTogglesTuitDislikes);
             app.get("/api/likes", LikeController.likeController.findAllLikes);
         }
         return LikeController.likeController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all users that liked a tuit from the database
      * @param {Request} req Represents request from client, including the path
      * parameter tid representing the liked tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
     findAllUsersThatLikedTuit = (req: Request, res: Response) =>
         LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
             .then(likes => res.json(likes));
 
     /**
      * Retrieves all tuits liked by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user liked the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects that were liked
      */
    findAllTuitsLikedByUser = (req, res) => {
        const uid = req.params.uid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;
    
        LikeController.likeDao.findAllTuitsLikedByUser(userId)
            .then(likes => {
                const likesNonNullTuits = likes.filter(like => like.tuit);
                const tuitsFromLikes = likesNonNullTuits.map(like => like.tuit);
                res.json(tuitsFromLikes);
            });
    }
          
          

     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is liking the tuit
      * and the tuit being liked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new likes that was inserted in the
      * database
      */
     userLikesTuit = (req: Request, res: Response) =>
         LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
             .then(likes => res.json(likes));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is unliking
      * the tuit and the tuit being unliked
      * @param {Response} res Represents response to client, including status
      * on whether deleting the like was successful or not
      */
    userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    /**
     * Update tuit's like count based on whether user has previously liked a tuit
     * @param req Represents request from client, including the
      * path parameters uid and tid representing the user that is liking
      * the tuit and the tuit being liked
     * @param res Represents response to client, including status
      * on whether updating the like was successful or not
     */
    userTogglesTuitLikes = async (req, res) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;

        try {
            const userAlreadyLikedTuit = await LikeController.likeDao.findUserLikesTuit(userId, tid);
            const howManyLikedTuit = await LikeController.likeDao.countHowManyLikedTuit(tid);
            const userAlreadyDislikedTuit = await LikeController.likeDao.findUserDislikesTuit(userId, tid);
            const dislikeCount = await LikeController.likeDao.countHowManyDislikedTuit(tid);

            let tuit = await LikeController.tuitDao.findTuitById(tid);
            // user already likes tuit
            if (userAlreadyLikedTuit) {
                await LikeController.likeDao.userUnlikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit - 1;
                console.log('already liked!, unliking tuit');
            // user already disliked tuit
            } else if (userAlreadyDislikedTuit) {
                tuit.stats.likes = howManyLikedTuit + 1;
                tuit.stats.dislikes = dislikeCount - 1;
                // await LikeController.likeDao.updateLikeType(userId, tid, "LIKE");
                await LikeController.likeDao.userUnlikesTuit(userId, tid);
                await LikeController.likeDao.userLikesTuit(userId, tid);
                console.log('already disliked, toggling to like!');
            }
            // neither liked or disliked
            else {
                await LikeController.likeDao.userLikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit + 1;
                console.log("liking tuit");
            };
            await LikeController.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }

    /**
     * Update tuit's dislike count based on whether user has previously disliked a tuit
     * @param req Represents request from client, including the
      * path parameters uid and tid representing the user that is disliking
      * the tuit and the tuit being disliked
     * @param res Represents response to client, including status
      * on whether updating the dislike was successful or not
     */
     userTogglesTuitDislikes = async (req, res) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;

        try {
            const userAlreadyLikedTuit = await LikeController.likeDao.findUserLikesTuit(userId, tid);
            const userAlreadyDislikedTuit = await LikeController.likeDao.findUserDislikesTuit(userId,tid);
            const howManyDislikedTuit = await LikeController.likeDao.countHowManyDislikedTuit(tid);
            const howManyLikedTuit = await LikeController.likeDao.countHowManyLikedTuit(tid);

            let tuit = await LikeController.tuitDao.findTuitById(tid);
            
            if (userAlreadyLikedTuit) {
                await LikeController.likeDao.userUnlikesTuit(userId, tid);
                await LikeController.likeDao.userDislikesTuit(userId, tid);
                // await LikeController.likeDao.updateLikeType(userId, tid, "DISLIKE");
                tuit.stats.likes = howManyLikedTuit - 1;
                tuit.stats.dislikes = howManyDislikedTuit + 1;
                console.log("already liked, toggling to dislike");
            } else if (userAlreadyDislikedTuit) {
                await LikeController.likeDao.userUnlikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit - 1;
                console.log("undisliking tuit");
            } else {
                await LikeController.likeDao.userDislikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit + 1;
                console.log("disliking tuit");
            };
            await LikeController.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }

    /**
      * Retrieves all tuits disliked by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user disliked the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects that were disliked
      */
    findAllTuitsDislikedByUser = (req, res) => {
        const uid = req.params.uid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;
    
        LikeController.likeDao.findAllTuitsDislikedByUser(userId)
            .then(dislikes => {
                const dislikesNonNullTuits = dislikes.filter(dislike => dislike.tuit);
                const tuitsFromDislikes = dislikesNonNullTuits.map(dislike => dislike.tuit);
                res.json(tuitsFromDislikes);
            });
    }

    findAllLikes = (req: Request, res: Response) =>
         LikeController.likeDao.findAllLikes()
             .then(likes => res.json(likes));

    deleteAllLikes = (req: Request, res: Response) =>
    LikeController.likeDao.deleteAllLikes()
        .then(status => res.json(status));
              
 };