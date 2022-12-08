/**
 * @file Declares stats data types reprenting the status of a tuit
 */

 /**
  * @typedef Stats represents status of tuits
  * @property {number} replies number of replies on tuit
  * @property {number} retuits number of times tuit was retuited
  * @property {number} likes number of likes on tuit
  */
export default interface Stats {
    replies?: number,
    retuits: number,
    likes: number,
    dislikes: number
};