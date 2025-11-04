const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    // Routes that don't require authentication
    // const publicPaths = ['/register', '/login', '/'];

    // if (publicPaths.includes(req.path)) {
    //     return next(); // Skip auth check for these routes
    // }

    const token = req.cookies.auth;

    if (!token) {
        return res.status(401).json({ status: 401, message: "unauthorized !" });
    }

        const users = jwt.verify(token, process.env.JWT_SECRET )

    console.log("Auth token:", users);
    next();
}

module.exports =  auth ;
