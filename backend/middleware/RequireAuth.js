const jwt = require('jsonwebtoken');
const Member = require('../models/Member');

const RequireAuth = async(req,res,next) =>{
    // destructure the authorization header from the request object
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({ error: "Authorization token is required" });
    }

    const token = authorization.split(" ")[1]
    try {
        const {_id} = jwt.verify(token, process.env.SECRET);

        req.member = await Member.findOne({ _id }).select('_id');
        // invoke the next to move on to the next piece of middleware or code
        next() 
    } catch (error) {
        return res.status(401).json({ error: "Request is not authorized" })
    }
}

module.exports = RequireAuth;