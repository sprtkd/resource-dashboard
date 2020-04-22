var express = require('express');
var router = express.Router();
var customer = require('../controller/customer');


/**
 * To create the New customer
 */
router.post('/', customer.create);

/**
 * TO get customer list
 */
router.get('/customerlist', customer.getCustomerList);

/**
 * TO get the single customer by their customerName 
 */
router.get('/customer/:customerName', customer.find);

/**
 * To delete the customer by condition
 */
router.delete('/delete/:customerName', customer.delete);

module.exports = router;
