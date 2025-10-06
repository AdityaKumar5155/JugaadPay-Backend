const jwt = require('jsonwebtoken');

const createJwt = (payload) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT secret is not defined in environment variables');
    }
    return jwt.sign(payload, secret, { expiresIn: '365d' });
}

module.exports = createJwt;