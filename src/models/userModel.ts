import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
}, {timestamps:true});


// delete all models if exists
if(mongoose.models["users"]){
    const userModel = mongoose.model("users");
    mongoose.deleteModel(userModel.modelName);
}

const User = mongoose.model("users",userSchema);
export default User;