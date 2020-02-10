var mongoose=require('mongoose');
var backlogSchema=new mongoose.Schema({
    projectId:{
        type:mongoose.Schema.Types.String,
        ref:'project.projectId',
        required:true
    },
    backlogId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    requirement:[{
        type:String,
        required:true
    }],
    created_at:{
        type:Date,
        required:true
    },
    updated_at:{
        type:Date,
        required:true
    }
});

module.exports=mongoose.model('backlog',backlogSchema)

    