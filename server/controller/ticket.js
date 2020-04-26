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
       
    ticketService.saveCustResponse(params.ticketId,req.body,req.body.status,function (error, custResponse){
        if (custResponse) {
            res.status(201).send(custResponse);
        } else if (error) {
            res.status(400).send(error);
        }

    });

}