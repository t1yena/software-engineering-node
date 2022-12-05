/**
 * @file Implements DAO managing data storage of likes. 
 * Uses mongoose LikeModel to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object 
 * managing data storage of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
 export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}
    
    /**
     * Find all users that liked a tuit
     * @param tid tuit id of tuit that was liked by users
     * @returns promise to be notified when likes are retrieved 
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid, type: 'LIKE'})
            .populate("likedBy")
            .exec();

    /**
     * Finds all tuits that a user likes
     * @param uid user id of user that liked the tuits
     * @returns Promise to be notified when like are retrieved
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid, type: 'LIKE'})
            .populate({
                path: "tuit",
                populate: {
                  path: "postedBy"
                }
            })
            .exec();

    /**
     * Creates like instance where a user likes a tuit
     * @param uid user id of user liking the tuit
     * @param tid tuit id of tuit being liked
     * @returns Promise to be notified when like is created
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid, type: 'LIKE'});

    /**
     * Removes like instance where a user unlikes a tuit
     * @param uid user id of user unliking the tuit
     * @param tid tuit id of tuit being unliked
     * @returns Promise to be notified when like is removed
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
    
    /**
     * Finds like instance where a user likes a tuit
     * @param uid user id of user liking the tuit
     * @param tid tuit id of tuit being liked
     * @returns Promise to be notified when like is created
     */
    findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.findOne({tuit: tid, likedBy: uid, type: 'LIKE'});
    
    /**
     * Counts number of likes on a tuit using LikeModel
     * @param tid tuit id of tuit being liked
     * @returns Promise to be notified when number of likes are retrieved
     */
     countHowManyLikedTuit = async (tid: string): Promise<any> =>
        LikeModel.count({tuit: tid, type: 'LIKE'});
    
    /**
     * Creates like instance where a user dislikes a tuit
     * @param uid user id of user liking the tuit
     * @param tid tuit id of tuit being liked
     * @returns Promise to be notified when like is created
     */
     userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid, type: 'DISLIKE'});

    /**
     * Finds like instance where a user dislikes a tuit
     * @param uid user id of user liking the tuit
     * @param tid tuit id of tuit being liked
     * @returns Promise to be notified when like is created
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.findOne({tuit: tid, likedBy: uid, type: 'DISLIKE'});
    
    /**
     * Counts number of likes on a tuit using LikeModel
     * @param tid tuit id of tuit being liked
     * @returns Promise to be notified when number of likes are retrieved
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        LikeModel.count({tuit: tid, type: 'DISLIKE'});

        /**
         * Update like type given user id and tuid id
         * @param uid user id
         * @param tid tuit id
         * @param type type to be updated
         * @returns Promise to be notified when type is updated
         */
    updateLikeType = async (uid: string, tid: string, type: string): Promise<any> => {
        return LikeModel.updateOne(
            {tuit: tid, likedBy: uid}, {$set:{type}})
    }
}