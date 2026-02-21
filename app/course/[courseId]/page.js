'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function DetailCourse(){
    const params = useParams()
    const [course, setCourse] = useState(null)
    const [chapter, setChapter] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getCourseDetail = async () => {
            try{
                const resC = await fetch(`/api/courses/${params.courseId}`)
                const resCh = await fetch(`/api/courses/${params.courseId}/chapter`)
                const resultC = await resC.json()
                const resultCh = await resCh.json()
                setCourse(resultC)
                setChapter(resultCh)
            }catch(e){
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        if(params.courseId) getCourseDetail()
    }, [params.courseId])
    console.log(course)
    if (loading) return <p>Loading bray...</p>
    if (!course) return <p>Data nggak ketemu!</p>
    return (
        <div className="min-h-screen bg-white text-[#1a1a1a] font-sans">
            {/* Navigation */}
            <nav className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <h1 className="text-xl font-bold text-blue-600 tracking-tight cursor-pointer" onClick={() => window.history.back()}>
                ← Web Tech Studio
                </h1>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition shadow-md shadow-blue-100">
                    Enroll Now
                </button>
            </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                <div className="mb-8">
                    <h2 className="text-4xl font-extrabold mt-4 mb-6 leading-tight">
                    {course.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{course.fullname || 'Instructor'}</span>
                    </div>
                    <span>•</span>
                    <span>Last updated Feb 2026</span>
                    </div>
                </div>

                <img src={course.img} className="aspect-video bg-gray-900 rounded-3xl mb-10 overflow-hidden shadow-2xl relative group">
                </img>

                <section className="prose prose-blue max-w-none">
                    <h3 className="text-2xl font-bold mb-4">Tentang Kursus</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                    {course.description || 'Belajar materi ini secara mendalam dengan kurikulum yang dirancang khusus untuk kebutuhan industri saat ini.'}
                    </p>
                </section>
                </div>

                <div className="lg:col-span-1">
                <div className="sticky top-28 p-8 border border-gray-100 rounded-3xl bg-gray-50/50">
                    <h4 className="text-xl font-bold mb-6">Materi Kursus</h4>
                    <div className="space-y-4">
                    {chapter.map((ch) => (
                        <div key={ch.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 transition cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-gray-300 group-hover:text-blue-400 transition">0{ch.ordinal}</span>
                            <span className="font-medium text-sm">Chapter {ch.title}</span>
                        </div>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        </div>
                    ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-gray-500 font-medium">Harga Akses</span>
                        <span className="text-2xl font-black text-blue-600">FREE</span>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
                        Mulai Belajar Sekarang
                    </button>
                    </div>
                </div>
                </div>

            </div>
            </main>
        </div>
    );
}