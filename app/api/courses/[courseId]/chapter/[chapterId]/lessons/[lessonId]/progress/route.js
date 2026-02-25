import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request, { params }) {
    const { chapterId } = await params
    const { user_uuid } = await request.json()

    try {
        await db.query(
            `INSERT INTO user_progress (user_uuid, chapter_id, is_completed) 
            VALUES (?, ?, true)
            ON DUPLICATE KEY UPDATE
            is_completed = VALUES(is_completed);`, [user_uuid, chapterId]
        )

        return NextResponse.json({ message: "Progres berhasil disimpan!" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: "Gagal menyimpan progres", err }, { status: 500 })
    }
}