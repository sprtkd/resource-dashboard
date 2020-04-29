var ticketService = require('../service/ticket');
var customerService = require('../service/customer');

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
             customerService.updateCustomer(query,response.ticketId,function (error, custResponse){
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

exports.saveCustResponse = function(req,res,next){
    console.log("in save cust");
    var params = req.params || {};
    ticketService.saveCustResponse(params.ticketId,req.body,req.body.status,function (error, custResponse){
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
             });
        }
        if (response) {
            res.status(201).send(response);
        } else if (error) {
            res.status(400).send(error);
        }

    });

}