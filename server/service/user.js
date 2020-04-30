var mongoose = require('mongoose');
var user = mongoose.model('User');
/**
 * Function to execute the create query to create the users.
 * @param {*} data user data
 * @param {*} callback callback function.
 */
exports.createUser = function (data, callback) {
    user.create(data).then((response) => {
        callback(null, response);
    }, (error) => {
        callback(error, null);
    });
};

/**
 * Funtion to find the user from collections.
 * @param {*} query condition or expression to find the user from collection.
 * @param {*} callback callback function
 */
exports.findUser = function (query, callback) {
    user.findOne(query, callback);
}

exports.deleteUser = function (query, callback) {
    user.deleteOne(query, callback);
}

exports.getBankOpsUserList = function (callback) {
    //console.log("in user service");
    user.find({role:"BANKOPS"},callback);
}
