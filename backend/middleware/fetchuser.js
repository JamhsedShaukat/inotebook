var jwt = require('jsonwebtoken');
const JWT_SCRET= "hereisiam";
const fetchuser =(req,res,next)=>{
    //get the user from jwt token 
     const token = req.header('auth-token');
     if(!token){
        res.status(401).send({error:"authanticat the token "});
     }
     try {
        const data = jwt.verify(token,JWT_SCRET);
     req.user = data.user;
    next();
     } catch (error) {
        res.status(401).send({error:"authanticat the token "});
     }
     

}

module.exports = fetchuser;