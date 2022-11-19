"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef User represents a tuiter user
 * @property {string} username username for user account
 * @property {string} password password for user account
 * @property {string} email email for user account
 * @property {string} firstName first name of user
 * @property {string} lastName last name of user
 */
class User {
    constructor(id, username, password, firstName, lastName, email) {
        this.username = '';
        this.password = '';
        this.email = '';
        this.profilePhoto = null;
        this.headerImage = null;
        this.biography = null;
        this.dateOfBirth = null;
        this.accountType = null;
        this.maritalStatus = null;
        this.location = null;
        this.joined = new Date();
        this._id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
    setPassword(password) {
        this.password = password;
    }
}
exports.default = User;
;
//# sourceMappingURL=User.js.map