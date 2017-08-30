const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    const token = req.headers['x-access-token'];
    const secret = process.env.jwt_secret;

    if (token) {
        return jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({ success: false, msg: 'invalid token' });
            }
            Object.defineProperty(req, 'decoded', {
                value: decoded
            });

            return next();
        });
    }
    return res.status(403).send({
        success: false,
        msg: 'no token provided'
    });
}

module.exports = {
    authorize
}
