const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    password: String,
    type: String,
    service: String
});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;