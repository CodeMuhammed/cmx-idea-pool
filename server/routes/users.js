const express = require('express');
const userActions = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

const router = new express.Router();

router.route('/')
    .post(userActions.createUser);


// exports this routes
module.exports = router;
