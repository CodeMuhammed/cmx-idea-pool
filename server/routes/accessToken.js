const express = require('express');
const authActions = require('../controllers/authController');

const router = new express.Router();

router.route('/')
    .post(authActions.loginUser)
    .delete(authActions.logoutUser);

router.route('/refresh')
    .post(authActions.refreshToken);

// exports this routes
module.exports = router;
