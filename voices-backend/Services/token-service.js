const jwt=require('jsonwebtoken')
const refreshModel=require("../Models/RefreshTokenModel")

class TokenService{
    generateTokens(payload){
        const accessTokenSecret=`${process.env.JWT_ACCCESS_TOKEN_SECRET}`;
        const refreshTokenSecret=`${process.env.JWT_REFRESH_TOKEN_SECRET}`;
        const accessToken=jwt.sign(payload,accessTokenSecret,{
            expiresIn:`${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}`
        })

        const refreshToken=jwt.sign(payload,refreshTokenSecret,{
            expiresIn:`${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}`
        })
        return {accessToken,refreshToken}
    }

    async storeRefreshToken(refreshToken,userId){
        try{
            await refreshModel.create({
                refreshToken,
                userId
            })

        }catch(err){
            console.log(err.message);
        }
    }

}

module.exports=new TokenService();