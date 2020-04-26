var express = require('express');
var router = express.Router();
var ticket = require('../controller/ticket');

/**
 * To create the New Ticket for customer's dormant account
 */
router.post('/:accountNum', ticket.create);

router.put('/saveticket/:ticketId', ticket.saveCustResponse);


module.exports = router;