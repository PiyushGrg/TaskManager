import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function ValidateJWTandGetUserById(request:NextRequest){
    try {
        const token = request.cookies.get("token")?.value;
        if(!token){
            throw new Error("Token Not Found");
        }

        const decodedData:any = jwt.verify(token,process.env.JWT_SECRET!);
        const userId = decodedData.userId;
        return userId;
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
} 