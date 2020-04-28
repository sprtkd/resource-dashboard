var mongoose = require('mongoose');
const ticket = require('../model/ticket');
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

schema.virtual('ticketid',{
    ref: ticket,
    localField:'ticketRaised',
    foreignField:'ticketId',
    justOne:true

});

module.exports = customer;

