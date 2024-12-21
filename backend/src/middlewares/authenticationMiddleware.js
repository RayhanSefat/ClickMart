const jwt = require('jsonwebtoken');

const SECRET_KEY = require('../services/secretKey');

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // console.log('Trying to verify');
        // console.log(process.env.JWT_SECRET);
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified; 
        // console.log('Verified!');
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token.' });
    }
}

module.exports = authenticateToken;
