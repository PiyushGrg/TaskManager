import mongoose from "mongoose";

export const ConnectMongoDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("MongoDb Connected!");
    } catch (error) {
        console.log(error);
    }
}