import mongoose from "mongoose";
import { ConnectMongoDb } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";

ConnectMongoDb();

export async function POST(request:NextRequest) {
    try {

        //check if user exists
        const reqBody = await request.json();
        const userExists = await User.findOne({email:reqBody.email});
        if(userExists){
            throw new Error("User already exists!");
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reqBody.password,salt);
        reqBody.password = hashedPassword;

        //create user
        await User.create(reqBody);

        return NextResponse.json({message:"User Registered Successfully!"},{status:200});
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}