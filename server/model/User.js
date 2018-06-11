var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: String,
    name: String,
    passwordHash: String
});

module.exports = mongoose.model('User', userSchema);