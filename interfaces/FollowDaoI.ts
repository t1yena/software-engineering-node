import Follow from "../models/follows/Follow";

/**
 * @file Declares API for Follow related data access object methods
 */
export default interface FollowDaoI {
    findWhoIamFollowing (tid: string): Promise<Follow[]>;
    findWhoIsFollowingMe (uid: string): Promise<Follow[]>;
    userFollowsUser (tid: string, uid: string): Promise<any>;
    userUnfollowsUser (tid: string, uid: string): Promise<any>;
};