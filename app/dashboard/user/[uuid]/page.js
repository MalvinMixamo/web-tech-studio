"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
    const params = useParams()
    const router = useRouter()
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Ambil data kursus yang diikuti user
        fetch(`/api/users/${params.uuid}/courses`)
        .then(res => res.json())
        .then(data => {
            setEnrolledCourses(Array.isArray(data) ? data : []);
            setLoading(false);
        })
        .catch(err => console.error(err));
    }, [params.uuid])

    const handleLogout = async(e) => {
        try{
            const res = await fetch('/api/auth/logout', {
                method: "POST"
            })
            if(res.ok){
                alert('berhasil logout, bye!')
                router.push('/')
            }else{
                alert('error')
            }
        }catch(err){
            alert(err.message)
        }
    }
    return (
        <div className="min-h-screen bg-[#fcfcfc] flex text-[#1a1a1a]">
        <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col sticky top-0 h-screen">
            <div className="p-6">
            <h1 className="text-xl font-bold text-blue-600 tracking-tight">Web Tech Studio</h1>
            </div>
            <nav className="flex-1 px-4 space-y-2 mt-4">
            <a href="#" className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-xl font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 p-3 text-gray-400 hover:bg-gray-50 rounded-xl transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                My Courses
            </a>
            <a href="#" className="flex items-center gap-3 p-3 text-gray-400 hover:bg-gray-50 rounded-xl transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Certificates
            </a>
            </nav>
            <div className="p-4 border-t border-gray-100">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-50 rounded-xl transition font-medium">
                Logout
            </button>
            </div>
        </aside>

        <main className="flex-1 p-8">
            <header className="flex justify-between items-center mb-10">
            <div>
                <h2 className="text-2xl font-bold">Halo, Selamat Belajar! 👋</h2>
                <p className="text-gray-400 text-sm">Ayo selesaikan kursusmu hari ini.</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right">
                <p className="font-bold text-sm">User Student</p>
                <p className="text-xs text-gray-400">ID: {params.uuid}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-blue-600 font-bold">U</div>
            </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-blue-600 p-6 rounded-3xl text-white shadow-xl shadow-blue-100">
                <p className="opacity-80 text-sm font-medium">Kursus Diikuti</p>
                <h3 className="text-3xl font-black mt-1">{enrolledCourses.length}</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100">
                <p className="text-gray-400 text-sm font-medium">Selesai</p>
                <h3 className="text-3xl font-black mt-1 text-green-500">
                {enrolledCourses.filter(c => c.progress_percent === 100).length}
                </h3>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100">
                <p className="text-gray-400 text-sm font-medium">Sertifikat</p>
                <h3 className="text-3xl font-black mt-1 text-orange-400">
                {enrolledCourses.filter(c => c.progress_percent === 100).length}
                </h3>
            </div>
            </div>
            <section>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                Kursus Saya
                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-md">{enrolledCourses.length}</span>
            </h3>

            {loading ? (
                <div className="space-y-4">
                {[1, 2].map(i => <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-2xl" />)}
                </div>
            ) : enrolledCourses.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400">Belum ada kursus yang diikuti bray.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                {enrolledCourses.map(course => (
                    <div key={course.id} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-6 hover:shadow-lg hover:shadow-gray-100 transition duration-300">
                    <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold">
                        {course.title[0]}
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1">{course.title}</h4>
                        <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-xs">
                            <div 
                            className="h-full bg-blue-600 transition-all duration-500" 
                            style={{ width: `${course.progress_percent}%` }}
                            />
                        </div>
                        <span className="text-sm font-bold text-gray-500">{course.progress_percent}%</span>
                        </div>
                    </div>
                    <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600 transition">
                        {course.progress_percent === 100 ? "Lihat Sertifikat" : "Lanjut Belajar"}
                    </button>
                    </div>
                ))}
                </div>
            )}
            </section>
        </main>
        </div>
    )
}