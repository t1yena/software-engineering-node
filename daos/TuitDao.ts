/**
 * @file Implements DAO managing data storage of tuits. 
 * Uses mongoose TuitModel to integrate with MongoDB
 */
 import TuitModel from "../mongoose/tuits/TuitModel";
 import Tuit from "../models/tuits/Tuit";
 import TuitDaoI from "../interfaces/TuitDaoI";
 
 /**
  * @class TuitDao Implements Data Access Object 
  * managing data storage of Tuits
  * @property {TuitDao} tuitDao Private single instance of TuitDao
  */
 export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    /**
     * Retrieve all tuits from collection using TuitModel
     * @returns Promise to be notified when all tuits are retrieved
     */
    public async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find().populate('postedBy', 'username').exec();
    }

    /**
     * Retrieve tuits from specific user using TuitModel
     * @param uid user's primary key
     * @returns Promise to be notified when tuits are retrieved
     */
    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid})
            .populate("postedBy")
            .exec();

    /**
     * Retrieve tuit based on tuit id using TuitModel
     * @param tid tuit's primary key
     * @returns Promise to be notified when tuit is retrieved
     */
    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid)
            .populate("postedBy")
            .exec();

    /**
     * Create tuit instance
     * @param uid primary key of user creating the tuit
     * @param tuit tuit instance to create
     * @returns Promise to be notified when tuit is created
     */
    public async createTuit(uid: string, tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create({...tuit, postedBy: uid});
    }

    /**
     * Update tuit values
     * @param tid tuit id of tuit being updated
     * @param tuit Tuit object with values to update
     * @returns Promise to be notified when tuit is updated
     */
    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: tuit});
    
    /**
     * Remove tuit instance
     * @param tid tuit id of tuit to be removed
     * @returns Promise when tuit is removed
     */
    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.deleteOne({_id: tid});
    
    /**
     * Update number of likes using tuit's stats
     * @param tid tuit id of tuit being updated
     * @param newStats Stats object that will be updated
     * @returns 
     */
    updateLikes = async (tid: string, newStats): Promise<any> =>
        TuitModel.updateOne({_id: tid}, {$set: {stats: newStats}});
 }