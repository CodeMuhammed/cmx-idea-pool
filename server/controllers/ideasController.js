var mongoose = require('mongoose');
const Idea = require('../models/idea');

const createIdea = (req, res) => {
    req.body.creator = req.decoded.userEmail;
    Idea.create(req.body, (err, idea) => {
        console.log(err);
        if (err) res.status(500).send({ msg: 'internal server error' });
        else {
            res.status(200).send(idea);
        }
    });
}

const removeIdea = (req, res) => {
    Idea.findByIdAndRemove(req.params.id, (err, info) => {
        if (err) res.status(500).send({ msg: 'internal server error' });
        else {
            res.status(200).send({msg: 'doc deleted successfully'});
        }
    });
}

const getIdeas = (req, res) => {
    const page = req.query.page || 1;
    const pageSize = 10;
    const pageOffset = (page * pageSize) - pageSize;

    Idea.find({ creator: req.decoded.userEmail }).sort({createdAt: 1}).skip(pageOffset).limit(pageSize).find((err, docs) => {
        if (err) res.status(500).send({ msg: 'internal server error' });
        else {
            res.status(200).send(docs);
        }
    });
}

const updateIdea = (req, res) => {
    Idea.update({ _id: req.params.id }, req.body, (err, info) => {
        if (err) res.status(500).send({ msg: 'internal server error' });
        else {
            console.log('jere');
            res.status(200).send(info);
        }
    });
}

module.exports = {
    createIdea,
    removeIdea,
    getIdeas,
    updateIdea
}
