import Tuit from "../models/Tuit";

export default interface TuitDaoI {
   findAllTuits(): Promise<Tuit[]>;
   findTuitById(id: string): Promise<Tuit>;
   findTuitsByAuthor(authorId: string): Promise<Tuit[]>;
   createTuit(tuit: Tuit): Promise<Tuit>;
   updateTuit(tuitId: string, tuit: Tuit): Promise<any>;
   deleteTuit(tuitId: string): Promise<any>;
}

