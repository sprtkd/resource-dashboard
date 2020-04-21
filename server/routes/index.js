var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(status).send('index', { title: 'Dormant Account Manager' });
});

module.exports = router;
