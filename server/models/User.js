const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    type: String,
    password: String
});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;