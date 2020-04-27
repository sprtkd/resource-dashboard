var express = require('express');
var router = express.Router();
var user = require('../controller/user');
var auth = require('../auth/auth');

/**
 * GET users listing
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/**
 * To create the New user
 */
router.post('/', user.create);

/**
 * TO get the single user by their username eg.email
 */
router.get('/user/:username', user.find);

/**
 * To delete the user by condition
 */
router.delete('/delete/:username', user.delete);

//To validate the login user
router.post('/validate', auth.verifyUser , user.login);
module.exports = router;
