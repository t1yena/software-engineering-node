/**
 * @file Declares User data type representing a tuiter user
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";


 /**
  * @typedef User represents a tuiter user
  * @property {string} username username for user account
  * @property {string} password password for user account
  * @property {string} email email for user account
  * @property {string} firstName first name of user
  * @property {string} lastName last name of user
  */
export default class User {
    private _id: string;
    private username: string = '';
    private password: string = '';
    private email: string = '';
    private firstName: string | null;
    private lastName: string | null;
    private profilePhoto: string = 'emptyAvatar.png';
    private headerImage: string | null = null;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private accountType: AccountType | null = null;
    private maritalStatus: MaritalStatus | null = null;
    private location: Location | null = null;
    private salary: number;
    private joined: Date = new Date();

    constructor(id:string, username: string, password: string, firstName: string | null, lastName: string | null, email: string, profilePhoto:string) {
      this._id = id;
      this.username = username;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.profilePhoto = profilePhoto;
    }

    public setPassword(password:string) {
      this.password = password;
    }
};