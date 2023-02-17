const otpService=require('../Services/otp-service')
const hashService=require('../Services/hash-service')
const userService=require('../Services/user-service')
const tokenService=require('../Services/token-service')
const UserDto=require('../Data-Transform-Objects/UserDto')

class AuthController{
    async sendOtp(req,res){
        const {phone}=req.body;
        if(!phone){
            res.status(400).json({message:"Phone Number field is required"})
            return
        }
        const otp=await otpService.generateOtp();
        
        //Hashing
        const timeToLeave=1000*60*3; //3 minutes
        const expires=Date.now()+timeToLeave;
        const data=`${phone}.${otp}.${expires}`

        const hash=hashService.hashOtp(data)
        try{
            await otpService.sendOtpBySms(phone,otp)
            return res.status(200).json({hash: `${hash}.${expires}`,phone})
        }catch(err){
            console.log(err);
            return res.status(500).json({message:"Error sending OTP"})
        }
        
    }

    async verifyOtp(req,res){
        const {phone,otp,hash}=req.body;
        if(!phone || !otp || !hash){
            console.log("All fields are required")
            res.status(400).json({message:"All fields are required"});
            return;
        }
        const [hashedOtp,expires]=hash.split('.');
        if(Date.now()>+expires){
            console.log("OTP has expired")
            res.status(400).json({message:"OTP has expired"})
            return;
        }

        const data=`${phone}.${otp}.${expires}`;

        const isValid=otpService.verifyOtp(hashedOtp,data);

        if(!isValid){
            res.status(400).json({message:"Wrong Otp Entered"});
            return;
        }
        else{
            let user;
            try{
                user=await userService.findUser({phone:phone});
                if(!user){
                    user=await userService.createUser({phone});
                }
            }
            catch(err){
                console.log(err)
                res.status(500).json({message:"Internal Server Error"})
                return;
            }
            const payload={
                _id: user._id,
                phone: phone
            }
            const {accessToken,refreshToken}=tokenService.generateTokens(payload);

            // Storing refresh token to the database
            await tokenService.storeRefreshToken(refreshToken,user._id);

            // Storing jwt tokens to the browser's cookies
            res.cookie('accessToken',accessToken,{
                maxAge:1000*60*60*24*30,
                httpOnly:true
            })
            res.cookie('refreshToken',refreshToken,{
                maxAge:1000*60*60*24*30,
                httpOnly:true
            })
            let userDto=new UserDto(user);
            res.status(200).json({user:userDto,auth: true});

        }

    }

}

module.exports=new AuthController;