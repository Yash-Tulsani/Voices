const mongoose=require("mongoose")

const refreshTokenSchema=mongoose.Schema({
    token:{
        type: String,
        required: trusted
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
})

const refresh=mongoose.model("RefreshToken",refreshTokenSchema,"tokens");

module.exports=refresh;