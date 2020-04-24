var mongoose = require('mongoose');
var customer = mongoose.model('Customer');
/**
 * Function to execute the create query to create the customers.
 * @param {*} data user data
 * @param {*} callback callback function.
 */
exports.createCustomer = function (data, callback) {
    customer.create(data).then((response) => {
        console.log("Service:Created customer entry to mongodb");
        callback(null, response);
    }, (error) => {
        callback(error, null);
    });
};

/**
 * Funtion to find the user from collections.
 * @param {*} query condition or expression to find the customer from collection.
 * @param {*} callback callback function
 */
exports.findCustomer = function (query, callback) {
    customer.findOne(query, callback);
    console.log("Service:Fetched single customer");
}

exports.deleteCustomer = function (query, callback) {
    customer.deleteOne(query, callback);
    console.log("Service:Deleted customer!");
}


exports.getCustomerList = function (callback) {
    customer.find(callback);
   // console.log("Service:Deleted customer!");
}

exports.importDormantAccounts = function (data, callback) {
    customer.insertMany(data).then((response) => {
        callback(null, response);
    }, (error) => {
        callback(error, null);
    });
};
