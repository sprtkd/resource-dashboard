var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var schema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    contact: Number,
});

var user = new mongoose.model('User', schema);

module.exports = user;
