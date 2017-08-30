const authHelper = require('../helpers/authHelper');
const Q = require('q');
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');

const isValidPassword = (user, password) => {
    const deferred = Q.defer();

    // test a matching password
    user.comparePassword(password, (err, isMatch) => {
        console.log(isMatch);
        if (err) return deferred.reject(err);
        if (!isMatch) deferred.reject({msg: 'invalid password'});
        else {
            deferred.resolve(isMatch);
        }
    });

    return deferred.promise;
}

const loginUser = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) return res.status(500).send(err);
        if (user) {
            let result = {};
            isValidPassword(user, req.body.password)
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
                    res.status(500).send(err);
                });
        } else {
            res.status(409).send({mgs: 'user already exists'});
        }
    });
}

const logoutUser = (req, res) => {
    if (req.body.refresh_token) {
        // delete refresh token from the RefreshTokens collections
        RefreshToken.remove({ token: req.body.refresh_token }, (err) => {
            if (err) return res.status(500).send(err);
            else {
                res.status(200).send({ msg: 'user signed out succesfully' });
            }
        });
    } else {
        res.status(403).send({mgs: 'forbidden action'});
    }
}

const refreshToken = (req, res) => {
    console.log(req.body);
    RefreshToken.findOne({token: req.body.refresh_token}, (err, tokenObj) => {
        if (err) return res.status(500).send(err);
        else {
            const accessToken = authHelper.generateAccessToken(tokenObj.userEmail);
            res.status(200).send({ jwt: accessToken });
        }
    });
}

module.exports = {
    loginUser,
    logoutUser,
    refreshToken
}
