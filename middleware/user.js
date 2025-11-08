const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    // Prefer cookie token if present, else fall back to Authorization header
    let token = req.cookies.auth;

    if (!token && req.headers) {
        const authHeader = req.headers.authorization || req.headers["x-auth-token"]; // support common header names
        if (typeof authHeader === 'string') {
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.slice(7);
            } else {
                // if raw token provided without Bearer prefix
                token = authHeader;
            }
        }
    }

    if (!token) {
        return res.status(401).json({ status: 401, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ status: 401, message: "Invalid or expired token" });
    }
}

module.exports =  auth ;
