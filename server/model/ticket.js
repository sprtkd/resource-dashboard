var mongoose = require('mongoose');

var ticketHistorySchema = new mongoose.Schema({ 

    createdBy:{
        type: String,
        required: true,
    } ,
    dateCreatedHist:{
        type: String,
        required: true,
    } ,
    description:{
        type: String,
        required: true,
    } ,
    status:{
        type: String,
        required: true,
    } ,
});

//var ticketHistory = new mongoose.model('TicketHistory', ticketHistorySchema);

//module.exports = ticketHistory;


var schema = new mongoose.Schema({
    ticketId: String,
    assignedTo:{
        type: String,
        required: true,
    } ,
    dateCreated:{
        type: Date,
        required: true,
    } ,
    approvedBy: String,
    ticketStatus:{
        type: String,
        required: true,
    } ,
    dateClosed:Date,
    ticketHistory: [ticketHistorySchema],
    
});

var ticket = new mongoose.model('Ticket', schema);

module.exports = ticket;
