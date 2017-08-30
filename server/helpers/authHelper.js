const Q = require('q');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const RefreshToken = require('../models/refreshToken');

const serializeRefreshToken = (email) => {
    const deferred = Q.defer();
    const data = {
        token: randomstring.generate(),
        userEmail: email
    };

    RefreshToken.create(data, (err, info) => {
        if (err) deferred.reject(err);
        else {
            deferred.resolve(info);
        }
    });

    return deferred.promise;
}

const generateAccessTokenFromRefreshToken = (refreshToken) => {

}

const generateAccessToken = (email) => {
    const secret = process.env.jwt_secret;
    return jwt.sign(
        { userEmail: email },
        secret,
        { expiresIn: 60 * 60 * 24 } // expires in 24 hours
    );
}

module.exports = {
    serializeRefreshToken,
    generateAccessTokenFromRefreshToken,
    generateAccessToken
}
