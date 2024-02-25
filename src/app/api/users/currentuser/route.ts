import { ValidateJWTandGetUserById } from "@/helpers/jwtValidation";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { ConnectMongoDb } from "@/config/dbConfig";

ConnectMongoDb();

export async function GET(request:NextRequest) {
    try {
        const userId = await ValidateJWTandGetUserById(request);
        const user = await User.findById(userId).select("-password");
        if(!user){
            throw new Error("User Not Found");
        }

        return NextResponse.json({data:user},{status:200});
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}