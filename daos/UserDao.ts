/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
 import UserModel from "../mongoose/users/UserModel";
 import User from "../models/users/User";
 import UserDaoI from "../interfaces/UserDaoI";
 
 /**
  * @class UserDao Implements Data Access Object 
  * managing data storage of Users
  * @property {UserDao} userDao Private single instance of UserDao
  */
 export default class UserDao implements UserDaoI {
     private static userDao: UserDao | null = null;
 
     /**
      * Creates singleton DAO instance
      * @returns UserDao
      */
     public static getInstance = (): UserDao => {
         if(UserDao.userDao === null) {
             UserDao.userDao = new UserDao();
         }
         return UserDao.userDao;
     }
     
     private constructor() {}
 
     /**
      * Uses UserModel to retrieve all user documents from users collection
      * @returns Promise To be notified when the users are retrieved from
      * database
      */
      async findAllUsers(): Promise<User[]> {
        const userMongooseModels = await UserModel.find();
        const userModels = userMongooseModels
            .map((userMongooseModels) => {
                return new User(
                    userMongooseModels?._id.toString() ?? '',
                    userMongooseModels?.username ?? '',
                    userMongooseModels?.password ?? '',
                    userMongooseModels?.firstName ?? '',
                    userMongooseModels?.lastName ?? '',
                    userMongooseModels.email ?? '',
                );
            });
        return userModels;
     }
 
     /**
      * Uses UserModel to retrieve single user document from users collection
      * @param {string} uid User's primary key
      * @returns Promise To be notified when user is retrieved from the database
      */
      async findUserById(uid: string): Promise<User> {
        const userMongooseModel = await UserModel.findById(uid);
        return new User(
            userMongooseModel?._id.toString() ?? '',
            userMongooseModel?.username ?? '',
            userMongooseModel?.password ?? '',
            userMongooseModel?.firstName ?? '',
            userMongooseModel?.lastName ?? '',
            userMongooseModel?.email ?? ''
        );
     }
 
     /**
      * Inserts user instance into the database
      * @param {User} user Instance to be inserted into the database
      * @returns Promise To be notified when user is inserted into the database
      */
      async createUser(user: User): Promise<User> {
        const userMongooseModel = await UserModel.create(user);
        return new User(
            userMongooseModel._id.toString() ?? '',
            userMongooseModel.username ?? '',
            userMongooseModel.password ?? '',
            userMongooseModel.firstName ?? '',
            userMongooseModel.lastName ?? '',
            userMongooseModel.email ?? ''
        );
     }
 
     /**
      * Updates user with new values in database
      * @param {string} uid Primary key of user to be modified
      * @param {User} user User object containing properties and their new values
      * @returns Promise To be notified when user is updated in the database
      */
      async updateUser(uid: string, user: any): Promise<any> {
        return await UserModel.updateOne({_id: uid},
            {$set: {username: user.username, password: user.password}});
    }
     
 
     /**
      * Removes user from the database.
      * @param {string} uid Primary key of user to be removed
      * @returns Promise To be notified when user is removed from the database
      */
     deleteUser = async (uid: string): Promise<any> =>
         UserModel.deleteOne({_id: uid});
 
     /**
      * Removes all users from the database. Useful for testing
      * @returns Promise To be notified when all users are removed from the
      * database
      */
     deleteAllUsers = async (): Promise<any> =>
         UserModel.deleteMany({});
 
     deleteUsersByUsername = async (username: string): Promise<any> =>
        UserModel.deleteMany({username: username});
     
     findUserByCredentials = async (username: string, password: string): Promise<any> =>
         UserModel.findOne({username: username, password: password});
     
     findUserByUsername = async (username: string): Promise<any> =>
         UserModel.findOne({username});
 };