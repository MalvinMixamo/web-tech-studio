"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans">
      <nav className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600 tracking-tight">Web Tech Studio</h1>
          <div className="flex gap-8 text-sm font-medium align-middle">
            <a href="#" className="hover:text-blue-600 transition py-2">Courses</a>
            <a href="#" className="hover:text-blue-600 transition py-2">Mentors</a>
            <Link href="/Login" className='hover:text-blue-600 transition py-2'>Sign In</Link>
            <Link href="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <header className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-extrabold leading-tight mb-6">
          Kuasai Skill Baru <br />
          <span className="text-blue-600">Tanpa Batas</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-10">
          Akses kursus berkualitas tinggi dari instruktur berpengalaman. 
          Belajar kapan saja, di mana saja.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
            Mulai Belajar
          </button>
          <button className="border border-gray-200 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
            Lihat Demo
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-2xl font-bold">Kursus Terpopuler</h3>
          <Link href="#" className="text-blue-600 font-medium hover:underline">Lihat Semua</Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-gray-100 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(courses) && courses.map((course) => (
              <div key={course.id} className="group border border-gray-100 rounded-2xl p-4 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300">
                <div className="aspect-video bg-gray-100 rounded-xl mb-4 overflow-hidden">
                  <div className="w-full h-full bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-300">
                    <img src={course.img} alt="" className='w-full h-full object-cover group-hover:scale-110 transition duration-500'/>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Course</span>
                <h4 className="text-xl font-bold mt-2 mb-4 group-hover:text-blue-600 transition">{course.title}</h4>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span className="font-bold text-lg">Gratis</span>
                  <Link href={`/course/${course.id}`} className="text-sm font-bold bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
          <p>&copy; 2026 Web Tech Studio.</p>
        </div>
      </footer>
    </div>
  );
}