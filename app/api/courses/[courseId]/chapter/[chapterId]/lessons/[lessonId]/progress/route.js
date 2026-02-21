import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request, { params }) {
    const { lessonId } = await params
    const { user_uuid } = await request.json()

    try {
        await db.query(
            `INSERT INTO user_progress (user_uuid, lesson_id, is_completed) 
            VALUES (?, ?, true)
            ON DUPLICATE KEY UPDATE
            is_completed = VALUES(is_completed);`, [user_uuid, lessonId]
        )

        return NextResponse.json({ message: "Progres berhasil disimpan!" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: "Gagal menyimpan progres", err }, { status: 500 })
    }
}