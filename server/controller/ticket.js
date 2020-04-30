var ticketService = require('../service/ticket');
var customerService = require('../service/customer');
var userService = require('../service/user');

/**
 * Function to create the ticket in ticket collection.
 */
exports.create = function (req, res, next) {
    console.log("Controller:Creating ticket");
    var body = req.body;
    var params = req.params || {};
    var query = {
        accountNum: params.accountNum
    };
    console.log(JSON.stringify(body));

    ticketService.createTicket(body, function (error, response) {
        if (response) {
            customerService.updateCustomer(query, response.ticketId, function (error, custResponse) {
                if (error) {
                    res.status(404).send(error);
                }
                if (!custResponse) {
                    res.status(204).send('No Data Found');
                }
            });
        }
        if (response) {
            res.status(201).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
}

exports.saveCustResponse = function (req, res, next) {
    console.log("in save cust");
    var params = req.params || {};
    ticketService.saveCustResponse(params.ticketId, req.body, req.body.status, function (error, custResponse) {
        if (custResponse) {
            res.status(201).send(custResponse);
        } else if (error) {
            res.status(400).send(error);
        }

    });

}


exports.getTicket = function(req,res,next){
    console.log("in save cust");
    var params = req.params || {};
    var query = {
        ticketId: params.ticketId
    };
    
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }

    ticketService.getTicket(query,function (error, ticketResponse){
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (ticketResponse) {
            res.status(200).send(ticketResponse);
            return;
        }
        if (!ticketResponse) {
            res.status(204).send('No Data Found');
            return;
        }
    });

}


exports.approveTicket = function(req,res,next){
    console.log("Controller:in ticket approval");
        var customerStatus = req.body.status;
        if (!customerStatus) {
            res.status(400).send('Account status is missing');
            return;
        }
        if(customerStatus==="MARKED_AS_CLOSED" || customerStatus==="MARKED_AS_ACTIVE"){
            ticketStatus = "CLOSED";
        }
        var body=req.body;
        var approver=req.body.createdBy;
        var dateClosed=req.body.dateCreatedHist;
        if (!dateClosed) {
            res.status(400).send('Date created is missing');
            return;
        }
        var params = req.params || {};
        var ticketId=params.ticketId;
        body.status=ticketStatus; //modified status to update in ticketHistory
        console.log(body.status);
       
    ticketService.approveTicket(ticketId,body,approver,dateClosed,ticketStatus,function (error, response){
        if(response){
            var query = {
                ticketRaised: ticketId
            };
            customerService.updateCustomerWithStatus(query,customerStatus,function (error, custResponse){
               // console.log("Cust: "+ JSON.stringify(custResponse));
                if (error) {
                    res.status(404).send(error);
                }
                if (!custResponse) {
                    res.status(204).send('No Data Found');
                }
                if(custResponse){
                    var query = {
                        ticketRaised: ticketId
                    };
                    customerService.findCustomer(query, function (error, response) {
                        if (error) {
                             res.status(404).send(error);
                             return;
                         }
                         if (response) {
                             res.status(200).send(response);
                             return;
                         }
                         if (!response) {
                             res.status(204).send('No Data Found');
                             return;
                         }
                     });
                }
             });
        }

    });

}


function getUserClosedTicketCount(res,username, log) {
    console.log("in tickets closed");
    ticketService.getuserticketclosedcounts(username, (closedticketresponse, error) => {
        if (error) {
            console.log("error " + error);
        }
       
        if (closedticketresponse) {
            log.closedTickets = closedticketresponse;
            // console.log("closed" + log.closedTickets);
            console.log("in tickets closed");
            log.inprogressTickets = (log.totalTickets - log.closedTickets);
             //console.log("Log : " + JSON.stringify(log));
            //adding to logs array
            // logs.push(log);
            res.send(log);
            return log;
        }
    });
    return log;
}

function getUsersAllTickets(res,username, log, callback) {
    
    ticketService.getuserticketscounts(username, (ticketcountresponse, error) => {
        if (error) {
            console.log("error " + error);
        }
       
        if (ticketcountresponse) {
            log.totalTickets = ticketcountresponse;
            if (typeof callback == typeof (Function)) {
               // console.log("Trying to call close..");
                log = getUserClosedTicketCount(res,username, log);
           } else {
                //console.log("in tickets all" +responseData);
                log = getUserClosedTicketCount(res,username, log);
           }

        }
    });
    return log;
}

function getUsersTicketLists(res,username, log,callback) {
    console.log("in tickets");
    ticketService.getusertickets(username, (ticketsResponse, ticketserror) => {
        if (ticketserror) {
            console.log("error " + ticketserror);
        }
        // var ticketsResponse=await ticketsResponse;
        if (ticketsResponse) {
            log.tickets = ticketsResponse;
            //console.log("feched all tickets ");
           
           // console.log("in tickets");
            if (typeof callback == typeof (Function)) {
                log = getUsersAllTickets(res,username, log,getUserClosedTicketCount(res,username,log));
            }
        }
    });
    return log;
}



exports.getusertickets = function (req, res) {

    var username, totalTickets, closedTickets, inprogressTickets, tickets, readyForActiveCount;
    var logs = [];
    var log = {
        username: username,
        totalTickets: totalTickets,
        closedTickets: closedTickets,
        inprogressTickets: inprogressTickets,
        tickets: [tickets]
    };
   
    //getting all BANKOPS user list
    userService.getBankOpsUserList((opserror, opsresponse) => {
        if (opserror) {
            console.log("error " + opserror);
        }
        var count = Object.keys(opsresponse).length;
    
        if (opsresponse) {
            //console.log("Users"+opsresponse);
            //iterate user list and get the username
            userdata = opsresponse[0];
           // opsresponse.forEach(function (userdata) {
                log.username = userdata.username;
                var username = log.username;
                console.log("username " + username);
                //getting list of tickets done by use
                log = getUsersTicketLists(res, username, log, getUsersAllTickets(res,username, log));
               // log.readyForActiveCount = 1;
                // });
        }
    });
   
}