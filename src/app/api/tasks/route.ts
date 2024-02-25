import { ConnectMongoDb } from "@/config/dbConfig";
import { ValidateJWTandGetUserById } from "@/helpers/jwtValidation";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

ConnectMongoDb();

export async function POST(request: NextRequest) {
    try {
        const userId = await ValidateJWTandGetUserById(request);
        const reqBody = await request.json();
        reqBody.user = userId;
        await Task.create(reqBody);

        return NextResponse.json({message:"Task Added"},{status:201});
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
    
}


export async function GET(request: NextRequest) {
    try {
        const userId = await ValidateJWTandGetUserById(request);
        const searchParams = new URL(request.nextUrl).searchParams;
        const status = searchParams.get("status");
        const priority = searchParams.get("priority");
        const tasks = await Task.find( {user:userId, ...(status && {status}), ...(priority && {priority}) }).sort({ createdAt: -1 });

        return NextResponse.json({data:tasks},{status:200});
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
    
}