const authHelper = require('../helpers/authHelper');
const Q = require('q');
const User = require('../models/user');

const isValidPassword = (user) => {
    const deferred = Q.defer();

    // test a matching password
    user.comparePassword(user.password, (err, isMatch) => {
        if (err) deferred.reject(err);
        else {
            deferred.resolve(isMatch);
        }
    });

    return deferred.promise;
}

const loginUser = (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) return res.status(500).send(err);
        if (user) {
            let result = {};
            isValidPassword(user)
                // Create and save refresh token to the database
                .then(() => {
                    return authHelper.serializeRefreshToken(req.body.email);
                })
                // Generate access token by signing with jwt
                .then((tokenObj) => {
                    result.refresh_token = tokenObj.token;
                    return authHelper.generateAccessToken(tokenObj.userEmail);
                })
                // Send the refresh and access token to the client
                .then((jwt) => {
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

const refreshToken = (req, res, next) => {
    console.log('refreshToken called called');
}

module.exports = {
    loginUser,
    refreshToken
}
