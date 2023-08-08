const jwt=require('jsonwebtoken')
const refreshModel=require("../Models/RefreshTokenModel")
const accessTokenSecret=`${process.env.JWT_ACCCESS_TOKEN_SECRET}`;
const refreshTokenSecret=`${process.env.JWT_REFRESH_TOKEN_SECRET}`;
class TokenService{
    // Token= Headers.Encoded_Payload_Signature
    // Signature= HashFunc(Encoded_Payload.Secret)
    generateTokens(payload){

        const accessToken=jwt.sign(payload,accessTokenSecret,{
            expiresIn:`${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}`
        })

        const refreshToken=jwt.sign(payload,refreshTokenSecret,{
            expiresIn:`${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}`
        })
        return {accessToken,refreshToken}
    }

    async storeRefreshToken(refreshToken,userId){
        const refreshTokenData={
            token:refreshToken,
            user:userId
        }
        try{
            await refreshModel.create(refreshTokenData);

        }catch(err){
            console.log(err.message);
        }
    }

    async findRefreshToken(userId,token){
        return await refreshModel.findOne({user:userId,token});    
    }

    async updateToken(userId,refreshToken){
        return await refreshModel.updateOne({user:userId},{token:refreshToken});
    }

    async removeToken(refreshToken){
        return await refreshModel.deleteOne({token:refreshToken})
    }

    async verifyAccessToken(token){
        try{
            return  jwt.verify(token,accessTokenSecret);
        }catch(err){
            console.log(err);
        }
        
    }

    async verifyRefreshToken(token){
        try{
            return jwt.verify(token,refreshTokenSecret);
        }catch(err){
            console.log(err);
        }
    }

}

module.exports=new TokenService();