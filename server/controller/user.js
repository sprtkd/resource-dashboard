var userService = require('../service/user');

/**
 * Function to create the user in user collection.
 */
exports.create = function (req, res, next) {
    var body = new User(req.body);
    if (!body.username) {
        res.status(400).send('User name missing');
        return;
    }
    if (!body.password) {
        res.status(400).send('Password missing');
        return;
    }
    if (!body.role) {
        res.status(400).send('Role missing');
        return;
    }
    
    userService.createUser(body, function (error, response) {
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
        username: params.username
    };
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }
    userService.findUser(query, function (error, response) {
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
    userService.deleteUser(query, function (error, response) {
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

exports.validate = function (req, res) {
    var loginUsername = req.body.username;
    var loginPassword = req.body.password;

    if (!loginUsername) {
        res.status(400).send('User name missing');
        return;
    }
    if (!loginPassword) {
        res.status(400).send('Password missing');
        return;
    }
    var query = {
        username: loginUsername,
        password: loginPassword
    };
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }
    userService.findUser(query, function (error, response) {
        if (error) {
            console.log(error);
            return res.status(500).send(error);
        }

        if (!response) {
            res.status(404).send('false');
        }
        
        return res.status(200).send('true');
            
    });
}

class User {
    constructor(userData) {
        this.username = userData.username || '';
        this.password = userData.password || '';
        this.role = userData.role || '';
        this.contact = userData.contact || '';
    }
}
