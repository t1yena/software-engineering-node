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
 * @file Implements DAO managing data storage of follows.
 * Uses mongoose FollowModel to integrate with MongoDB
 */
const FollowModel_1 = __importDefault(require("../mongoose/follows/FollowModel"));
/**
 * @class FollowDao Implements Data Access Object
 * managing data storage of Follow
 * @property {FollowDao} FollowDao Private single instance of FollowDao
 */
class FollowDao {
    constructor() {
        this.userFollowsUser = (follower, followed) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.create({ follower, followed }); });
        this.userUnfollowsUser = (follower, followed) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteOne({ follower, followed }); });
        this.findWhoIamFollowing = (me) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ follower: me })
                .populate('followed', 'username')
                .exec();
        });
        this.findWhoIsFollowingMe = (me) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ followed: me })
                .populate('follower', 'username')
                .exec();
        });
    }
}
exports.default = FollowDao;
FollowDao.followDao = null;
FollowDao.getInstance = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
//# sourceMappingURL=FollowDao.js.map