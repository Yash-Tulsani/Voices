const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    phone:{
        type: String,
        required: true,
    },
    activated:{
        type: Boolean,
        required: false,
        default: false
    }

},{
    timestamps: true
})

module.exports=mongoose.model('User',userSchema);
