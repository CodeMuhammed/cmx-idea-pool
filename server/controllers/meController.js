const User = require('../models/user');

const getUser = (req, res, next) => {
    User.findOne({email: req.decoded.userEmail}, (err, user) => {
        if (err) return res.status(500).send(err);
        else {
            res.status(200).send(user);
        }
    });
}

module.exports = {
    getUser
}
