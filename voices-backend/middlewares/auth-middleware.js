const tokenService = require("../Services/token-service");

module.exports=async function(req,res,next){
    try{
        const {accessToken}=req.cookies;
        if(!accessToken){
            throw new Error();
        }
        const payload=await tokenService.verifyAccessToken(accessToken);
        if(!payload){
            throw new Error();
        }
        req.user=payload;
        next();
    }catch(err){
        res.status(401).json({
            message: "Invalid Token in auth-middleware.js",
        })
    }
    
}