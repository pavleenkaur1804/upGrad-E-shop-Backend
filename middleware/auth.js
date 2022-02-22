const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
const token= req.header('x-auth-token');

if(!token) return res.status(401).send('Access Denied');
try{
   jwt.verify(token,"newkey");
    
    next();
} catch(ex){
    res.status(400).send('Invalid Token.')
}

};