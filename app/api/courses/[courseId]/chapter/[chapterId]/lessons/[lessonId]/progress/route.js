import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request, { params }) {
    const { lessonId } = params
    const { userId } = await request.json()

    try {
        await db.query(
            `INSERT INTO user_progress (user_id, lesson_id, is_completed) 
            VALUES (?, ?, true)
            ON DUPLICATE KEY UPDATE
            is_completed = VALUES(is_completed);`, [userId, lessonId]
        )

        return NextResponse.json({ message: "Progres berhasil disimpan!" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Gagal menyimpan progres" }, { status: 500 })
    }
}