var customerService = require('../service/customer');

/**
 * Function to create the user in user collection.
 */
exports.create = function (req, res, next) {
    var body = new Customer(req.body);
    console.log("Controller:Creating customer");
    customerService.createCustomer(body, function (error, response) {
        if (response) {
            res.status(201).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
}

/**
 * Function to find user from user collection.
 */
exports.find = function (req, res) {
    var params = req.params || {};
    var query = {
        customerName: params.customerName
    };
    console.log(query);
    console.log(req);

    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }
    customerService.findCustomer(query, function (error, response) {
        console.log("Controller:Fetching customer"+response);
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
        }
    });
}




/**
 * Function to delete the user from collection.
 */
exports.delete = function (req, res) {
    var body = req.body;
    var params = req.params || {};
    var query = {
        username: params.username
    };
    //var query = body.query;
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }
    customerService.deleteCustomer(query, function (error, response) {
        if (error) {
            res.status(400).send(error);
            return;
        }
        if (response) {
            if (response.n === 1 && response.ok === 1) {
                res.status(202).send("Deleted");
            }
            if (response.n === 0 && response.ok === 1) {
                res.status(204).send({
                    message: 'No data found'
                });
            }
        }
    });
}

exports.getCustomerList= function (req, res) {
    console.log("Controller:request customer"+req);
    console.log("Controller:response customer"+res);
    customerService.getCustomerList(function (error, response) {
        console.log("Controller:Fetching customer"+error);
        
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
        }
    });
}

class Customer {
    constructor(customerData) {
        this.customerName = customerData.customerName || '';
        this.accountNum = customerData.accountNum || '';
        this.emailId = customerData.emailId || '';
        this.contact = customerData.contact || '';
        this.lastTranDate = customerData.lastTranDate || '';
        this.address = customerData.address || '';
        this.accountStatus = customerData.accountStatus || '';
        this.ticketRaised = customerData.ticketRaised || '';
    }

}
