const Jimp=require('jimp');
const path=require('path');
const UserDto = require('../Data-Transform-Objects/UserDto');
const userService = require('../Services/user-service');

class ActivateController{
    async activateUser(req,res,next){
        try{
            const {name,avatar}=req.body;
            if(!name || !avatar){
                res.status(400).json({message: "All fields are required"});
                return;
            }

            // Image buffer (Since the received image is in Base64 string Format)
            const regex=/^data:image\/(jpeg|png|jpg);base64,/;
            const buffer=Buffer.from(avatar.replace(regex,''),'base64');
            const imgPath=`${Date.now()}-${Math.round(Math.random()*1e9)}.png`

            Jimp.read(buffer).then((img)=>{
                return img.resize(150,Jimp.AUTO).write(path.resolve(__dirname,`../Storage/ProfileImages/${imgPath}`))
            })
            const userId=req.user._id;
            const user=await userService.findUser({_id:userId});

            if(!user){
                res.status(404).json({message: "User Not Found"});
                return;
            }
            user.name=name;
            user.activated=true;
            user.avatar=`/Storage/ProfileImages/${imgPath}`;
            user.save();

            res.json({user:new UserDto(user), auth: true});


        }catch(err){
            res.status(500).json({message:"Something went wrong"});
        }
        next();
    }
}


module.exports=new ActivateController();