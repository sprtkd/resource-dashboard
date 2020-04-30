var mongoose = require('mongoose');
var ticket = mongoose.model('Ticket');
var user = mongoose.model('User');

//var ticketHistory = mongoose.model('TicketHistory');
/**
 * Function to execute the create query to create the tickets.
 * @param {*} data user data
 * @param {*} callback callback function.
 */
exports.createTicket = function (data, callback) {
    console.log("in service to create ticket");
   ticket.create(data).then((response) => {
       console.log("Service:Created ticket entry to mongodb");
       
       ticket.findOne(response._id).exec().then((ticketResponse)=>{
            var generatedticketId = generateTicketID();
            ticketResponse.ticketId = generatedticketId;
            ticketResponse.save().then((response) => {
                console.log("Service:Updated ticketId");
                callback(null, response);
            }, (error) => {
                callback(error, null);
            }); 
       });
    });
};

function generateTicketID(){
    var generatedticketId = "TKT"+(Math.floor(Math.random() * 100000) + 1);
    console.log("ticketId "+ generatedticketId);
    ticket.findOne({ticketId:generatedticketId}).exec().then((ticketiDResponse)=>{
      
       if(ticketiDResponse){
           console.log("Found duplicate ticket id, hence creating new id");
          return generateTicketID();
       }
    });
    return generatedticketId;
}


exports.saveCustResponse = function(query,data,status,callback){
   
    ticket.updateOne({ticketId : query}, {$set: {ticketStatus:status}, $push: {ticketHistory:data}}).then((result) => {
        callback(null, result);
      },(error) => {
        console.log(error);
        callback(error, null);
      }
    )
}


exports.approveTicket = function(query,data,createdBy,dateCloure,status,callback){
   
    ticket.updateOne({ticketId : query}, {$set: {ticketStatus:status,approvedBy:createdBy,dateClosed:dateCloure}, $push: {ticketHistory:data}}).then((result) => {
        callback(null, result);
      },(error) => {
        console.log(error);
        callback(error, null);
      }
    )
}

exports.getTicket = function (query, callback) {
  ticket.findOne(query, callback);
  console.log("Service:Fetched single ticket");
}

exports.getusertickets = function(username,callback){
  ticket.find({assignedTo:username}).then(callback);
}

exports.getuserticketscounts = function(username,callback){
  ticket.find({assignedTo:username}).countDocuments().then(callback);
}

exports.getuserticketclosedcounts = function(username,callback){
  ticket.find({$and:[{assignedTo:username},{ticketStatus:"CLOSED"}]}).countDocuments().then(callback);
}
