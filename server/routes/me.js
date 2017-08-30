const express = require('express');
const userActions = require('../controllers/meController');
const authMiddleware = require('../middlewares/auth');

const router = new express.Router();

router.route('/')
   .get(authMiddleware.authorize, userActions.getUser)


// exports this routes
module.exports = router;