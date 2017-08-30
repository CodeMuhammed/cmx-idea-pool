const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        return jwt.verify(token, 'SECRET HERE', (err, decoded) => {
        if (err) {
            return res.status(401).send({ success: false, msg: 'failed to authenticate token' });
        }
        Object.defineProperty(req, 'decoded', {
            value: decoded,
        });
        return next();
        });
    }
    return res.status(403).send({
        success: false,
        msg: 'no token provided',
    });
}

module.exports = {
    authorize
}