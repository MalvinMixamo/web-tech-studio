import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    try{
        const { uuid } = await params
        const sql = `SELECT 
                c.id AS course_id,
                c.title AS course_title,
                (SELECT COUNT(*) FROM user_progress up 
                 WHERE up.user_uuid = u.uuid 
                 AND up.is_completed = 1 
                 AND up.lesson_id IN (
                     SELECT l.id FROM lessons l 
                     JOIN chapter ch ON l.chapter_id = ch.id 
                     WHERE ch.course_id = c.id
                 )) AS completed_lessons,
                (SELECT COUNT(*) FROM lessons l 
                 JOIN chapter ch ON l.chapter_id = ch.id 
                 WHERE ch.course_id = c.id) AS total_lessons
            FROM users u
            JOIN enrollments e ON u.uuid = e.user_uuid
            JOIN course c ON e.course_id = c.id
            WHERE u.uuid = ?`
            const [rows] = await db.query(sql, [uuid])
            if (!rows || rows.length === 0) {
            return NextResponse.json({ message: "Kamu belum daftar kursus apapun bray!" }, { status: 200 });
        }

            const courseProgress = rows.map(row => {
                const percentage = row.total_lessons > 0 
                    ? Math.round((row.completed_lessons / row.total_lessons) * 100) 
                    : 0;

                return {
                    id: row.course_id,
                    title: row.course_title,
                    completed: row.completed_lessons,
                    total: row.total_lessons,
                    progress_percent: percentage,
                    status: percentage === 100 ? "Selesai" : "Sedang Dipelajari"
                };
            });
            return NextResponse.json(courseProgress, {status:200})
    }catch(err){
        return NextResponse.json(err, {status:500})
    }
}

export async function POST(request, { params }) {
    try {
        const { uuid } = await params
        const { course_id } = await request.json()
        const [existing] = await db.query(
            `SELECT * FROM enrollments WHERE user_uuid = ? AND course_id = ?`,
            [uuid, course_id]
        )

        if (existing.length > 0) {
            return NextResponse.json(
                { message: "Kamu sudah terdaftar di kursus ini, bray!" },
                { status: 400 }
            )
        }
        const sql = `INSERT INTO enrollments (user_uuid, course_id, status) VALUES (?, ?, 0)`;
        await db.query(sql, [uuid, course_id])

        return NextResponse.json(
            { message: "Berhasil daftar kursus! Selamat belajar bray." },
            { status: 201 }
        )

    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}