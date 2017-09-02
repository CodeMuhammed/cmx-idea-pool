const express = require('express');
const authActions = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

const router = new express.Router();

router.route('/')
    .post(authActions.loginUser)
    .delete(authMiddleware.authorize, authActions.logoutUser);

router.route('/refresh')
    .post(authActions.refreshToken);

// exports this routes
module.exports = router;
