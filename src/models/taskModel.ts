import mongoose, { Mongoose } from "mongoose";

const taskSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    dateToStart:{
        type:String,
        required:true,
    },
    dateToFinish:{
        type:String,
        required:true,
    },
    reference:{
        type:String,
        required:false,
    },
    priority:{
        type:String,
        required:true,
    },
}, {timestamps:true});


// delete all models if exists
if(mongoose.models["tasks"]){
    const taskModel = mongoose.model("tasks");
    mongoose.deleteModel(taskModel.modelName);
}

const Task = mongoose.model("tasks",taskSchema);
export default Task;