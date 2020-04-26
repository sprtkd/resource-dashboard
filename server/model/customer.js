var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

var schema = new mongoose.Schema({
    customerName:{
        type: String,
        required: true,
    } ,
        
    accountNum: {
        type: String,
        required: true,
        unique:true
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
    ticketRaised: String,
});
schema.plugin(uniqueValidator);

var customer = new mongoose.model('Customer', schema);

module.exports = customer;

