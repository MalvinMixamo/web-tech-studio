import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const [rows] = await db.query(`SELECT users.fullname, course.* FROM users LEFT JOIN course ON user_id = course.user_id`)
        return NextResponse.json(rows, {status:200})
    }catch(err){
        return NextResponse.json({message: "query mu salah kayaknya", err}, {status: 500})
    }
}
export async function POST(request) {
    const { title, description, author_id } = await request.json();
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [author_id]);
    if (user[0].role !== 'admin') {
        return Response.json({ error: "Lu bukan admin bray, gak boleh buat kursus cuy!" }, { status: 403 });
    }
    await db.query('INSERT INTO course (title, description, user_id) VALUES (?, ?, ?)', [title, description, author_id]);
    
    return Response.json({ message: "Kursus berhasil dibuat!"});
}