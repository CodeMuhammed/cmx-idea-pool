const express = require('express');
const authActions = require('../controllers/authController');

const router = new express.Router();

router.route('/')
    .post(authActions.loginUser);

router.route('/refresh')
    .get(authActions.refreshToken);

// exports this routes
module.exports = router;
