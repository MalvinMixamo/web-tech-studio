import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
    const {  chapterId, lessonId } = await params

    try{
        const {
            title,
            content,
            type
        } = await request.json()
        const sql = `UPDATE lessons SET chapter_id = ?, title = ?, content = ?, type = ? WHERE id = ?`
        const values = [
            chapterId,
            title,
            content,
            type,
            lessonId
        ]
        await db.query(sql, values)
        return NextResponse.json({message: 'berhasil bray!'}, {status:200})
    }catch(err){
        return NextResponse.json({message: 'gagal bray!', err}, {status:500})
    }
}

export async function DELETE(request, { params }) {
    try{
        const { lessonId } = await params

        await db.query(`DELETE FROM lessons WHERE id = ?`, [lessonId]);
        
        return NextResponse.json({message: 'berhasil hapus'}, {status: 200})
    }catch(err){
        return NextResponse.json(err, {status: 500})
    }

}