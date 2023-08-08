const crypto=require('crypto')
const hashService=require('./hash-service')

class OtpService{
    async generateOtp(){
        const otp=crypto.randomInt(1000,9999);
        return otp;
    }
    async sendOtpBySms(phone,otp){
        const accountSID=process.env.SMS_SID;
        const authToken=process.env.SMS_AUTH_TOKEN;
        const message=`Your Voices OTP is ${otp}. It will expire in 3 minutes.`
        // const twilio=require('twilio')(accountSID,authToken)
        
        // return await twilio.messages.create({
        //     body: message,
        //     to: phone,
        //     from: process.env.SMS_PHONE_NUMBER
        // })
        
        // Temporary
        console.log(message);
    }
    verifyOtp(hashedOtp,data){
        const computedHash=hashService.hashOtp(data);
        return computedHash===hashedOtp
    }
}

module.exports=new OtpService();