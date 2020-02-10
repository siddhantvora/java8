var mongoose=require('mongoose');
var projectSchema=new mongoose.Schema({
    managerId:{
        type:mongoose.Schema.Types.String,
        ref:'user.userId'
    },
    projectId:{
        type:String,
        required:true
    },
    projectName:{
        type:String,
        required:true
    },
    teamMember:{
        type:Number,
        required:true
    },
    scrumMaster:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Project',projectSchema)