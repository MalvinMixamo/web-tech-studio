'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SideNav } from "../../page";
import Link from "next/link";

export default function EditCourse(){
    const params = useParams()
    const [ dataChapters, setDataChapters ] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({ courseId: '', title: '', ordinal: '' })
    
    const fetchChapter = async () => {
        const res = await fetch(`/api/courses/${params.courseId}/chapter`, {method: "GET"})
        const dataFetch = await res.json()
        setDataChapters(dataFetch) 
    }
    useEffect(() => {fetchChapter()}, [])

    const handleCreate = async (e) => {
        e.preventDefault()
        const res = await fetch(`/api/courses/${params.courseId}/chapter`, {
            method: 'POST',
            body: JSON.stringify({
                courseId: params.courseId,
                ...form 
            })
        })
        if(res.ok){
            alert('data berhasil di add')
            fetchChapter()
        }
    }

    const handleDelete = async (id) => {
        if(confirm('Yakin mau hapus chapter ini?')){
            await fetch(`/api/courses/${params.courseId}/chapter/${id}`, {method: 'DELETE'})
            fetchChapter()
        }
    }

    console.log("data chapter :", dataChapters)
    return(
        <div className="h-screen w-full bg-[#fcfcfc] flex text-[#1a1a1a]">
            <SideNav></SideNav>
            <div className="flex-1 p-8 w-full">
                <header className="flex justify-between items-center mb-10">
                    <Link href={`/dashboard/admin/${params.uuid}`} className="bg-white rounded-xl border border-blue-500 text-blue-500 transition hover:bg-blue-500 hover:text-white px-5 py-3 shadow-sm w-fit">Back Home</Link>
                    <button 
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-6 py-3 cursor-pointer rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
                    >
                        + Tambah Chapter Baru
                    </button>
                </header>
                <div className="bg-white rounded-3xl border border-gray-100 overflow-scroll w-full shadow-sm mt-5">
                    <table className="w-3xl md:w-full overflow-scroll text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-5 font-bold text-gray-500">Judul Chapter</th>
                            <th className="p-5 font-bold text-gray-500 text-center">Bab</th>
                            <th className="p-5 font-bold text-gray-500 text-center">Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataChapters.map((chapter) => (
                            <tr key={chapter.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                            <td className="p-5">
                                <Link href={`/dashboard/admin/${params.uuid}/${params.courseId}/edit-course/${chapter.id}/edit-chapter`} className="font-bold hover:text-blue-500 transition">{chapter.title}</Link>
                            </td>
                            <td className="text-center p-5 space-x-2">
                                <p className='text-center' >{chapter.ordinal}</p>
                            </td>
                            <td className="p-5 space-x-2 text-center">
                                <Link href={`/dashboard/admin/${params.uuid}/${chapter.id}/edit-course`} className="text-blue-600 font-bold text-sm hover:underline">Edit Chapter</Link>
                                <button 
                                onClick={() => handleDelete(chapter.id)}
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
                        <label className="text-sm font-bold block mb-2">Judul Chapter</label>
                        <input 
                            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Contoh: Belajar NextJS Expert"
                            onChange={(e) => setForm({...form, title: e.target.value})}
                            required
                        />
                        </div>
                        <div>
                        <label className="text-sm font-bold block mb-2">Bab (angka)</label>
                        <input
                            type="number" 
                            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Jelaskan apa yang dipelajari..."
                            onChange={(e) => setForm({...form, ordinal: e.target.value})}
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
    )
}