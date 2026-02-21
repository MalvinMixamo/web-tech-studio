import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
    const { courseId, chapterId } = await params

    try{
        const {
            title,
            ordinal
        } = await request.json()
        const sql = `UPDATE chapter SET course_id = ?, title = ?, ordinal = ? WHERE id = ?`
        const values = [
            courseId,
            title,
            ordinal,
            chapterId
        ]
        await db.query(sql, values)
        return NextResponse.json({message: 'berhasil bray!'}, {status:200})
    }catch(err){
        return NextResponse.json({message: 'gagal bray!', err}, {status:500})
    }
}

export async function DELETE(request, { params }) {
    try{
        const { chapterId } = await params

        await db.query(`DELETE FROM lessons WHERE chapter_id = ?`, [chapterId]);
        
        await db.query(`DELETE FROM chapter WHERE id = ?`, [chapterId])

        return NextResponse.json({message: 'berhasil hapus'}, {status: 200})
    }catch(err){
        return NextResponse.json(err, {status: 500})
    }

}