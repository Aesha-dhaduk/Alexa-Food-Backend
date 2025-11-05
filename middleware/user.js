const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.cookies.auth;

    if (!token) {
        return res.status(401).json({ status: 401, message: "unauthorized !" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ status: 401, message: "unauthorized !" });
    }
}

module.exports =  auth ;
