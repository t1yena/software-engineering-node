/**
 * @file Declares Follow data type representing relationship between
 * users, as in a user follows another user
 */
 import User from "../users/User";
 import Tuit from "../tuits/Tuit";

 /**
  * @typedef Follow represents follow relationship between users
  * @property {User} userFollowed User being followed
  * @property {User} userFollowing User following another user
  */
 
  export default interface Follow {
    followed: User,
    follower: User,
};