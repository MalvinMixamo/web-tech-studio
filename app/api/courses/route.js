import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const [rows] = await db.query(`SELECT 
                c.id, 
                c.title, 
                c.description,
                c.img,
                c.user_uuid,
                u.fullname AS instructor_name
            FROM course c
            INNER JOIN users u ON c.user_uuid = u.uuid
            ORDER BY c.id DESC`)
        return NextResponse.json(rows || [], {status:200})
    }catch(err){
        return NextResponse.json({message: "query mu salah kayaknya", err}, {status: 500})
    }
}
export async function POST(request) {
    const { title, description, img, user_uuid } = await request.json();
    const [user] = await db.query('SELECT * FROM users WHERE uuid = ?', [user_uuid]);
    if (user[0].role !== 'admin') {
        return Response.json({ error: "Lu bukan admin bray, gak boleh buat kursus cuy!" }, { status: 403 });
    }
    await db.query('INSERT INTO course (title, description, img, user_uuid) VALUES (?, ?, ?, ?)', [title, description, img, user_uuid]);
    
    return Response.json({ message: "Kursus berhasil dibuat!"});
}