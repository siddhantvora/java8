var mongoose=require('mongoose')
var userSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    loginName:{
        type:String,
        required:"login name should be unique",
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('user', userSchema)