const authHelper = require('../helpers/authHelper');
const Q = require('q');
const User = require('../models/user');

const saveUser = (user) => {
    const deferred = Q.defer();

    User.create(user, (err, info) => {
        if (err) deferred.reject(err);
        else {
            deferred.resolve(info);
        }
    });

    return deferred.promise;
}

const createUser = (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) {
            let result = {};
            saveUser(req.body)
                // Create and save refresh token to the database
                .then((user) => {
                    return authHelper.serializeRefreshToken(user.email);
                })
                // Generate access token by signing with jwt
                .then((tokenObj) => {
                    result.refresh_token = tokenObj.token;
                    return authHelper.generateAccessToken(tokenObj.email);
                })
                // Send the refresh and access token to the client
                .then((jwt) => {
                    console.log(jwt);
                    result.jwt = jwt;
                    res.status(200).send(result);
                })
                // Catch all errors that might occour during the steps
                .fail((err) => {
                    console.log(err);
                    res.status(500).send({mgs: 'internal server error'});
                });
        } else {
            res.status(409).send({mgs: 'user already exists'});
        }
    });
}

module.exports = {
    createUser
}
