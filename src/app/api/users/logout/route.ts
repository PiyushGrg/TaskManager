import { NextResponse } from "next/server";

export async function POST(){
    try {
        const response = NextResponse.json({message:"User Logged Out"},{status:200});
        response.cookies.set("token","");
        return response;
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}