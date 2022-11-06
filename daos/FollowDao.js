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
 * @file Implements DAO managing data storage of follows.
 * Uses mongoose FollowModel to integrate with MongoDB
 */
import FollowModel from "../mongoose/follows/FollowModel";
/**
 * @class FollowDao Implements Data Access Object
 * managing data storage of Follow
 * @property {FollowDao} FollowDao Private single instance of FollowDao
 */
export default class FollowDao {
    constructor() {
        this.userFollowsUser = (follower, followed) => __awaiter(this, void 0, void 0, function* () { return FollowModel.create({ follower, followed }); });
        this.userUnfollowsUser = (follower, followed) => __awaiter(this, void 0, void 0, function* () { return FollowModel.deleteOne({ follower, followed }); });
        this.findWhoIamFollowing = (me) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel
                .find({ follower: me })
                .populate('followed', 'username')
                .exec();
        });
        this.findWhoIsFollowingMe = (me) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel
                .find({ followed: me })
                .populate('follower', 'username')
                .exec();
        });
    }
}
FollowDao.followDao = null;
FollowDao.getInstance = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
