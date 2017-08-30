const express = require('express');
const ideasActions = require('../controllers/ideasController');
const authMiddleware = require('../middlewares/auth');

const router = new express.Router();

router.route('/')
    .get(authMiddleware.authorize, ideasActions.getIdeas)
    .post(authMiddleware.authorize, ideasActions.createIdea)

router.route('/:id')
    .put(authMiddleware.authorize, ideasActions.updateIdea)
    .delete(authMiddleware.authorize, ideasActions.removeIdea)


// exports this routes
module.exports = router;
