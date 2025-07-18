const jwt=require ('jsonwebtoken');
const User = require('../models/User');

//jwt consists of - header, payload, sig
exports.protect = async (req, res, next) =>{
let token= req.headers.authorization?.split(" ")[1];
if(!token) return res.status(401).json({msg: "Unauthorized, no token provided"});

try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded.id).select('-password');
    next();
} catch (error) {
     return res.status(401).json({msg: "Unauthorized, invalid token"});
}

}
// req.user is a convenient way to store and access information about the authenticated user throughout the request lifecycle in an Express.js application. It helps in managing user sessions, implementing access control, and ensuring that sensitive information is not exposed.

// {
//   host: 'example.com',
//   connection: 'keep-alive',
//   'upgrade-insecure-requests': '1',
//   ............................
//   authorization: 'Bearer my_token_value'
// }
// Request headers are sent along with every HTTP request, including GET, POST, PUT, DELETE, and other
// Bearer token is a security token that is sent in the Authorization header of an HTTP request. It is called a "Bearer" token because the client that possesses the token is considered to be the "bearer" of the token.

