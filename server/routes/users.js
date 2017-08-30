const express = require('express');
const userActions = require('../controllers/userController');

const router = new express.Router();

router.route('/')
   .get(userActions.refresh);


// exports this routes
module.exports = router;