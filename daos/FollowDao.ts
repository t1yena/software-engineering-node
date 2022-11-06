/**
 * @file Implements DAO managing data storage of follows. 
 * Uses mongoose FollowModel to integrate with MongoDB
 */
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
import FollowDaoI from "../interfaces/FollowDaoI";

 /**
  * @class FollowDao Implements Data Access Object 
  * managing data storage of Follow
  * @property {FollowDao} FollowDao Private single instance of FollowDao
  */
export default class FollowDao implements FollowDaoI{
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    
    private constructor() {}
    userFollowsUser = async (follower: string, followed: string) : Promise<any> =>
        FollowModel.create({follower,followed});
    userUnfollowsUser = async (follower: string, followed: string) : Promise<any> => 
        FollowModel.deleteOne({follower,followed});
    findWhoIamFollowing = async (me: string) : Promise<Follow[]> => 
        FollowModel
            .find({follower: me})
            .populate('followed', 'username')
            .exec();
    findWhoIsFollowingMe = async (me: string) : Promise<Follow[]> =>
        FollowModel
            .find({followed: me})
            .populate('follower', 'username')
            .exec();
}