const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : { type: String, require: true },
    lastName : { type: String, require: true },
    email : { type: String, require: true, unique: true },
    username : { type: String, require: true, unique: true },
    hashedPassword : { type: String, require: true },
    profilePictuteDirectory: { type: String, require: true },
});

userModel = mongoose.model('User', userSchema);
module.exports = userModel;