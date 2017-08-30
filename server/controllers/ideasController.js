const Idea = require('../models/idea');

const createIdea = (req, res, next) => {
    req.body.creatorEmail = req.decoded.userEmail;
    Idea.create(req.body, (err, idea) => {
        if (err) res.status(500).send({ msg: 'internal server error' });
        else {
            res.status(200).send(idea);
        }
    });
}

const removeIdea = (req, res, next) => {
    console.log('delete idea route called');
    console.log(req.params.id);
    Idea.findByIdAndRemove(req.params.id, (err, info) => {
        if (err) res.status(500).send({ msg: 'internal server error' });
        else {
            res.status(200).send({msg: 'doc deleted successfully'});
        }
    });
}

const getIdeas = (req, res, next) => {
    console.log(req.query);
    const page = req.query.page || 1;
    const pageSize = 10;
    const pageOffset = (page * pageSize) - pageSize;

    Idea.find().sort({createdAt: 1}).skip(pageOffset).limit(pageSize).find((err, docs) => {
        if (err) res.status(500).send({ msg: 'internal server error' });
        else {
            res.status(200).send(docs);
        }
    });
}

module.exports = {
    createIdea,
    removeIdea,
    getIdeas
}
