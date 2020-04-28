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
    customer.findOne(query, callback).populate('ticketid');
    console.log("Service:Fetched single customer");
}

exports.deleteCustomer = function (query, callback) {
    customer.deleteOne(query, callback);
    console.log("Service:Deleted customer!");
}


exports.getCustomerList = function (callback) {
    customer.find().populate('ticketid').exec(callback);
}

/*
* Update customer with ticket id
*/
exports.updateCustomer = function (query,ticketId, callback) {
    console.log("service query" + query);
    customer.updateOne(query,{ticketRaised:ticketId},callback);
}


/*
* Update customer with ticket id
*/
exports.updateCustomerWithStatus = function (query,ticketStatus, callback) {
   // console.log("service query" + JSON.stringify(query));
    customer.updateOne(query,{accountStatus:ticketStatus},callback);
}

exports.importDormantAccounts = function (data, callback) {
    customer.insertMany(data).then((response) => {
        callback(null, response);
    }, (error) => {
        callback(error, null);
    });
};
