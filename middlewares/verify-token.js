const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../helpers/error-handler');
require('dotenv').config()

const verifyToken = async (req, res, next) => {
    try {
        //get token from request header
        const bearer = req.header('Authorization');
        if (!bearer) {
            return next(new AuthorizationError("Token is required"))
        }
        // delete text Bearer inside token
        const token = bearer.replace('Bearer ', '');
        
        // verify token
        const decoded = await jwt.verify(token, process.env.JWT_KEY);
        // bind decode in req   
        req.decoded = decoded;
        next();
        
    }catch (err) {
        // message if token is expired
        return next(new AuthorizationError('Token invalid or expired'))        
    }
}

module.exports = verifyToken