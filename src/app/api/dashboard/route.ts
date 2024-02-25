import { ValidateJWTandGetUserById } from "@/helpers/jwtValidation";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const userId = await ValidateJWTandGetUserById(request);
        const tasks = await Task.find({user:userId});
        let resultData = {
            totalTasks: tasks.length,

            // status level
            completedTasks: tasks.filter((task)=> task.status === "Completed").length,
            progressTasks: tasks.filter((task)=> task.status === "In Progress").length,
            pendingTasks: tasks.filter((task)=> task.status === "Pending").length,
            
            // priority level
            lowTasks: tasks.filter((task)=> task.priority === "Low").length,
            mediumTasks: tasks.filter((task)=> task.priority === "Medium").length,
            highTasks: tasks.filter((task)=> task.priority === "High").length,
        }
        return NextResponse.json({data:resultData},{status:200});
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}