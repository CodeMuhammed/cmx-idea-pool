const express = require('express');
const path = require('path');
const authRoute = require('./accessToken');
const usersRoute = require('./users');
const meRoute = require('./me');
const ideasRoute = require('./ideas');

module.exports = {
    apply: (app) => {
        // AUTH routes here
        app.use('/access-tokens', authRoute);

        // User resource
        app.use('/users', usersRoute);

        // me ie a user resource
        app.use('/me', meRoute);

        // Ideas resource
        app.use('/ideas', ideasRoute);
    }
}
