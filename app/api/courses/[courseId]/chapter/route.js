import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { courseId } = await params
    try{
        const [rows] = await db.query(
            `SELECT course.title AS course_name, chapter.* FROM course 
             JOIN chapter ON course.id = chapter.course_id 
             WHERE course.id = ? ORDER BY ordinal ASC`, 
            [courseId]
        )
        return NextResponse.json(rows, {status: 200})
    }catch(err){
        return NextResponse.json(err, {status: 500})
    }
}
export async function POST(request, { params }) {
    const { courseId } = await params
    try{
        const { title, ordinal } = await request.json()
        await db.query(`INSERT INTO chapter (course_id, title, ordinal) VALUES (?, ?, ?)`, [courseId, title, ordinal])
        return NextResponse.json({message: 'data berhasil dibuat!'}, {status: 200})
    }catch(err){
        return NextResponse.json(err, {status: 500})
    }
}