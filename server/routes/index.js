const express = require('express');
const authRoute = require('./accessToken');
const userRoute = require('./users');
const authMiddleware = require('../middlewares/auth');

module.exports = {
    apply: (app) => {
        // AUTH routes here
        app.use('/access-tokens', authRoute);

        // User resource
        app.use('/users', authMiddleware.authorize, userRoute);

        // Add a catchall route here
        app.use('*', express.static('client/dist'));
    }
}