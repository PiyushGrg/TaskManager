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

        let emailregex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
        if(!emailregex.test(reqBody.email)){
            throw new Error("Invalid Email!");
        }
        
        let passregex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/ ;
        if(!passregex.test(reqBody.password)){
            throw new Error("Invalid Password Type!");
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
