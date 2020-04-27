var _ = require('lodash');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config = {
    expireTime: 24*60*10, //10days in mintutes
    secrets: {
        jwt: process.env.JWT || 'SECRETKEY'
    }
};
var checkToken = expressJwt({secret: config.secrets.jwt});
var mongoose = require('mongoose');
var user = mongoose.model('User');

exports.decodeToken = function(){
    return function(req, res, next){
        if(req.query && req.query.hasOwnProperty('access_token')){
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }
        checkToken(req, res, next);
    };
};

exports.signinToken = function(req, res, next ){
    return res.send(jwt.sign({_id: req.user._id}, 
        config.secrets.jwt, 
        {expiresInMinutes: config.expireTime}
        ));
};

exports.verifyUser = function(req, res, next){
 var username =  req.body.username;
 var password = req.body.password;

 if(!username || !password)
 {
    res.status(403).send('false');
    return;
 }

 user.findOne({username: username})
     .then(function(user)
     {
         if(!user){
             res.status(403).send('false');
             return;
         }
         else{
            if(!user.authenticate(password)){
                 res.status(403).send('false');
                 return;
             }
             else{
                 req.user = user;
                 next();
             }
         }
     }, function(error){
         next(error);
     });

};
