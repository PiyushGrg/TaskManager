import mongoose from "mongoose";
import { ConnectMongoDb } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

ConnectMongoDb();

export async function POST(request:NextRequest) {
    try {

        //check if user exists
        const reqBody = await request.json();
        const userExists = await User.findOne({email:reqBody.email});
        if(!userExists){
            throw new Error("User doesn't exists!");
        }

        //check password
        const passwordMatch = await bcrypt.compare(reqBody.password,userExists.password);
        
        if(!passwordMatch){
            throw new Error("Invalid Credentials!");
        }

        //create jwt token
        const token = jwt.sign({userId: userExists._id},process.env.JWT_SECRET!,{expiresIn:"1d"});

        const response = NextResponse.json({message:"User Logged In Successfully!"},{status:200});

        // attach token to response cookies
        response.cookies.set("token",token,{
            httpOnly:true,
            path:"/",
            maxAge:60*60*24, // 1 day
        });

        return response;
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}