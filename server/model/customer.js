var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    customerName:{
        type: String,
        required: true,
    } ,
        
    accountNum: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
    },
    contact:{
        type: Number,
        required: true,
    }, 
    lastTranDate: Date,
    address: String,
    accountStatus: String,
    ticketRaised: Number,
});

var customer = new mongoose.model('Customer', schema);

module.exports = customer;

