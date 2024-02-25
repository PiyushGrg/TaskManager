import { ConnectMongoDb } from "@/config/dbConfig";
import { ValidateJWTandGetUserById } from "@/helpers/jwtValidation";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

ConnectMongoDb();


export async function GET(request: NextRequest,{params}:{params: {taskId:string}}) {
    try {
        const userId = await ValidateJWTandGetUserById(request);
        const task = await Task.findOne({user:userId,_id:params.taskId});

        return NextResponse.json({data:task},{status:200});
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
    
}

export async function PUT(request: NextRequest,{params}:{params: {taskId:string}}) {
    try {
        const userId = await ValidateJWTandGetUserById(request);
        const reqBody = await request.json();
        const task = await Task.findOneAndUpdate({user:userId,_id:params.taskId},reqBody);

        return NextResponse.json({data:task},{status:200});
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
    
}

export async function DELETE(request: NextRequest,{params}:{params: {taskId:string}}) {
    try {
        const userId = await ValidateJWTandGetUserById(request);
        await Task.findOneAndDelete({user:userId,_id:params.taskId});

        return NextResponse.json({message:"Task Deleted!"},{status:200});
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
    
}