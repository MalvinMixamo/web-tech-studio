import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    try{
        const { uuid } = await params
        const [user] = await db.query(`SELECT * FROM users WHERE uuid = ?`, [uuid])
        if(user.length === 0){
            return NextResponse.json({message: 'ga ada datanya bre'}, {status:404})
        }
        return NextResponse.json(user, {status: 200})
    }catch(errr){
        return NextResponse.json(errr, {status:500})
    }
}