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
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    email: string,
    firstName?: string,
    lastName?: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};