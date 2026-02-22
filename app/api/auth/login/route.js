import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request) {
    try{
        const { username, password } = await request.json()
        const [rows] = await db.query(
            `SELECT id, fullname, username, password, uuid, role FROM users WHERE username = ? AND password = ?`, 
        [username, password]
        )
        if(rows.length === 0){
            return NextResponse.json({message: 'ga ada bray datanya'}, {status: 400})
        }

        const user = rows[0]
        
        const response = NextResponse.json({
            message: 'login berhasil bray!',
            fullname: user.fullname,
            user: user.username,
            role: user.role,
            uuid: user.uuid
        }, { status: 200 });
        response.cookies.set('token', String(user.uuid), {
            path: '/',
            httpOnly: false,
            maxAge: 60 * 60 * 24
        })
        response.cookies.set('role', String(user.role), {
            path: '/',
            httpOnly: false,
            secure: false,
            maxAge: 60 * 60 * 24
        })

        return response
    }catch(err){
        console.error("Detail errornya nih bray:", err)
        return NextResponse.json({message: 'rusak ni api nya, payah'}, {status: 500})
    }
}