const express = require('express');
const authActions = require('../controllers/authController');

const router = new express.Router();

router.route('/')
   .get(authActions.refresh);

router.route('/refresh')
   .get(authActions.refresh);

// exports this routes
module.exports = router;