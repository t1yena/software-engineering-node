/**
 * @file Declares User data type representing a tuiter user
 */
import User from "../users/User";
import Stats from "./Stats";

 /**
  * @typedef Tuit represents a tuit post
  * @property {string} tuit text content of tuit
  * @property {User} postedBy the user id of the user that posted the tuit
  * @property {Date} postedOn date the tuit was posted
  * @property {string} image image in tuit
  * @property {string} youtube youtube link in tuit
  * @property {string} avatarLogo logo for user
  * @property {string} imageOverlay image overlay for tuit
  * @property {Stats} stats stats of tuit such as replies, likes, and retuits
  */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: String,
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String,
    stats: Stats
};