/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from 'express';
import FollowDao from "../daos/FollowDao";
import FollowControllerI from '../interfaces/FollowControllerI';

 /**
  * @class FollowController Implements RESTful Web service API for likes resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:followed/following to retrieve all followers of a specific user
  *     </li>
  *     <li>GET /api/follows/:follower to retrieve all users that a specific user is following
  *     </li>
  *     <li>POST /api/users/:follower/following/:followed to record that a user following another user
  *     </li>
  *     <li>DELETE /api/users/:follower/following/:followed to record that a user unfollowing another user
  *     /li>
  * </ul>
  * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
  * @property {FollowController} FollowController Singleton controller implementing
  * RESTful Web service API
  */
export default class FollowController implements FollowControllerI{
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service API
      * @return FollowController
      */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/users/:followed/following", FollowController.followController.findWhoIsFollowingMe);
            app.get("/api/follows/:follower", FollowController.followController.findWhoIamFollowing);
            app.post("/api/users/:follower/following/:followed", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:follower/following/:followed", FollowController.followController.userUnfollowsUser);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * User follows another user
     * @param {Request} req Represents request from client, including the
     * path parameters follower and followed representing the user that is following and the user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follow that was inserted in the
     * database
      */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.follower, req.params.followed)
        .then(follow => res.json(follow));

    /**
     * User unfollows another user
     * @param {Request} req Represents request from client, including the
     * path parameters follower and followed representing the user that is following and the user being followed
     * @param {Response} res Represents response to client, including the
     * status on whether deleting the follow was successful or not
    */
    userUnfollowsUser = (req: Request, res: Response) => 
        FollowController.followDao.userUnfollowsUser(req.params.follower, req.params.followed)
        .then(status => res.json(status));
    
    /**
      * Retrieves all followers of a specific user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter followed to represent user being followed
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
    findWhoIsFollowingMe = (req: Request, res: Response) =>
        FollowController.followDao.findWhoIsFollowingMe(req.params.followed)
        .then(who => res.json(who));
    
    /**
      * Retrieves all users that a specific user is following
      * @param {Request} req Represents request from client, including the path
      * parameter follower to represent user that is following other users
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
    findWhoIamFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findWhoIamFollowing(req.params.follower)
        .then(who => res.json(who));
};