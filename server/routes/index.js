const express = require('express');
const authRoute = require('./accessToken');
const usersRoute = require('./users');
const meRoute = require('./me');

module.exports = {
    apply: (app) => {
        // AUTH routes here
        app.use('/access-tokens', authRoute);

        // User resource
        app.use('/users', usersRoute);

        // me ie a user resource
        app.use('/me', meRoute);

        // Ideas resource @TODO

        // Add a catchall route here
        app.use('*', express.static('client/dist'));
    }
}
