var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    customerName: String,
    accountNum: String,
    emailId: String,
    contact: Number,
    lastTranDate: Date,
    address: String,
    accountStatus: String,
    ticketRaised: Number,
});

var customer = new mongoose.model('Customer', schema);

module.exports = customer;
