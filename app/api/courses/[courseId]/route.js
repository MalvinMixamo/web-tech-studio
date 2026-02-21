import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
    const { courseId } = await params

    try{
        const {
            title,
            description,
            img
        } = await request.json()
        const sql = `UPDATE course SET title = ?, description = ?, img = ? WHERE id = ?`
        const values = [
            title,
            description,
            img,
            courseId
        ]
        await db.query(sql, values)
        return NextResponse.json({message: 'berhasil bray!'}, {status:200})
    }catch(err){
        return NextResponse.json({message: 'gagal bray!', err}, {status:500})
    }
}

export async function DELETE(request, { params }) {
    try{
        const { courseId } = await params
        await db.query(`DELETE FROM lessons WHERE chapter_id IN (SELECT id FROM chapter WHERE course_id = ?)`, [courseId])

        await db.query(`DELETE FROM chapter WHERE course_id = ?`, [courseId])

        await db.query(`DELETE FROM course WHERE id = ?`, [courseId])

        return NextResponse.json({message: "hapus course berhasil"}, {status:200})
    }catch(err){
        return NextResponse.json(err, {status:500})
    }
}