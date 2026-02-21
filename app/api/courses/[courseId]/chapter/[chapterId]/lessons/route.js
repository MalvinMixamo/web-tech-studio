import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { chapterId } = await params
    try{
        const [rows] = await db.query(
            `SELECT lessons.*, chapter.title AS chapter_name 
            FROM lessons 
            JOIN chapter ON lessons.chapter_id = chapter.id 
            WHERE lessons.chapter_id = ?`, 
            [chapterId]
        )
        return NextResponse.json(rows, {status: 200})
    }catch(err){
        return NextResponse.json(err, {status: 500})
    }
}

export async function POST(request, { params }) {
    const { chapterId } = await params
    try{
        const { title, content, type } = await request.json()

        if (type !== 'video' && type !== 'text') {
            return NextResponse.json({ message: "Type harus video atau text bray!" }, { status: 400 });
        }

        await db.query(`INSERT INTO lessons (chapter_id, title, content, type) VALUES (?, ?, ?, ?)`, [chapterId, title, content, type])
        return NextResponse.json({message: 'data berhasil dibuat!'}, {status: 200})
    }catch(err){
        return NextResponse.json(err, {status: 500})
    }
}