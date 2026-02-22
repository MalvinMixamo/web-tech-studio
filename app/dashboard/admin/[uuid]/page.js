"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import  Link  from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const router = useRouter()
    const params = useParams()
    const [courses, setCourses] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({ title: '', description: '', img: '' })

    const fetchCourses = async () => {
        const res = await fetch('/api/courses')
        const data = await res.json()
        setCourses(data)
    }

    useEffect(() => { fetchCourses(); }, [])

    const handleCreate = async (e) => {
        e.preventDefault()
        const res = await fetch('/api/courses', {
        method: 'POST',
        body: JSON.stringify({ ...form, user_uuid: params.uuid }),
        });
        if (res.ok) {
        setShowModal(false)
        setForm({ title: '', description: '' })
        fetchCourses()
        }
    }

    const handleDelete = async (id) => {
        if (confirm("Yakin hapus kursus ini bray? Materi di dalemnya bakal ilang juga lho!")) {
        await fetch(`/api/courses/${id}`, { method: 'DELETE' });
        fetchCourses();
        }
    }
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
            <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col h-screen sticky top-0">
                <Link href="/" className="p-6 text-xl font-bold text-blue-600">Web Tech Studio ADMIN</Link>
                <nav className="flex-1 px-4 space-y-2">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl font-bold">Manage Courses</div>
                <div className="p-3 text-gray-400 hover:bg-gray-50 rounded-xl cursor-not-allowed">Students List</div>
                <div className="p-3 text-gray-400 hover:bg-gray-50 rounded-xl cursor-not-allowed">Reports</div>
                </nav>
                <div className="p-4 border-t border-gray-100">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-50 rounded-xl transition font-medium">
                    Logout
                </button>
                </div>
            </aside>

            <div className="flex-1 p-8">
                <header className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold">Management Kursus 🛠️</h2>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
                >
                    + Tambah Kursus Baru
                </button>
                </header>

                {/* Table / List Kursus */}
                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="p-5 font-bold text-gray-500">Judul Kursus</th>
                        <th className="p-5 font-bold text-gray-500">Gambar</th>
                        <th className="p-5 font-bold text-gray-500">Instruktur</th>
                        <th className="p-5 font-bold text-gray-500">Aksi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.map((course) => (
                        <tr key={course.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                        <td className="p-5">
                            <p className="font-bold">{course.title}</p>
                            <p className="text-xs text-gray-400">{course.description?.substring(0, 50)}...</p>
                        </td>
                        <td>
                            <img src={course.img} alt="gambar" className='w-40 h-auto my-2' />
                        </td>
                        <td className="p-5 text-sm font-medium text-gray-600">{course.instructor_name || 'Admin'}</td>
                        <td className="p-5 space-x-2">
                            <button className="text-blue-600 font-bold text-sm hover:underline">Edit Lessons</button>
                            <button 
                            onClick={() => handleDelete(course.id)}
                            className="text-red-500 font-bold text-sm hover:underline"
                            >
                            Delete
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                    <h3 className="text-xl font-bold mb-6">Buat Kursus Baru</h3>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div>
                        <label className="text-sm font-bold block mb-2">Judul Kursus</label>
                        <input 
                            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Contoh: Belajar NextJS Expert"
                            onChange={(e) => setForm({...form, title: e.target.value})}
                            required
                        />
                        </div>
                        <div>
                        <label className="text-sm font-bold block mb-2">Deskripsi Singkat</label>
                        <textarea 
                            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none h-32"
                            placeholder="Jelaskan apa yang dipelajari..."
                            onChange={(e) => setForm({...form, description: e.target.value})}
                            required
                        />
                        </div>
                        <div>
                            <label className='text-sm font-bold block mb-2'>Gambar</label>
                            <input
                                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Url gambar kursus"
                                onChange={(e) => setForm({...form, img: e.target.value})}
                                required
                            />
                        </div>
                        <div className="flex gap-3 pt-4">
                        <button 
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="flex-1 p-4 bg-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-200"
                        >
                            Batal
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 p-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700"
                        >
                            Simpan Kursus
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}