'use client'
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register(){
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({ fName: "", lName: "", username: "", password: "", role: "" })
    
    const handleSubmit = async(e) => {
        e.preventDefault()

        const playLoad = {
            fullname: `${formData.fName} ${formData.lName}`,
            username: formData.username,
            password: formData.password,
            role: formData.role
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(playLoad)
        })
        if(res.ok){
            setFormData({ username: '', password: '' })
            alert('Berhasil, sekarang Login!')
            router.push('/login')
        }
    }
    return(
        <div className="flex flex-row gap-0 w-full h-screen">
            <div className="hidden w-0 md:block md:w-[40%] bg-[url(/background-fill.png)] bg-center bg-cover h-full">
                <div className="flex flex-row justify-center items-center h-full text-white w-full md:mt-0">
                    <div className=" w-full md:w-1/2 px-5 md:px-0">
                        <h1 className="text-5xl font-bold">Selamat Datang Kembali Bray</h1>
                        <p className="mt-2 mb-5 text-2xl">Buat Akun terlebih dahulu jika ingin daftar kursus</p>
                        <Link href="/login" className="bg-white px-6 py-3 text-slate-800 hover:bg-gray-50 rounded-md">Sign In</Link>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[60%] bg-white h-full">
                <div className="border-b border-slate-300 py-4 px-6 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] fixed w-full">
                    <h1 className="text-xl font-bold text-blue-600 tracking-tight">Web Tech Studio</h1>
                </div>
                <div className="flex flex-row justify-center items-center h-full text-slate-800 w-full md:mt-0">
                    <div className=" w-full md:w-1/2 px-5 md:px-0">
                        <h1 className="text-3xl md:text-5xl font-bold">Buat Akun</h1>
                        <p className="mt-3 text-xl md:text-3xl">Buat Akun terlebih dahulu jika ingin daftar kursus</p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10">
                            <div className="flex flex-row justify-between">
                                <input 
                                    type="text" 
                                    name="" 
                                    id="" 
                                    placeholder="Nama Depan"
                                    className="bg-gray-100 rounded-md px-5 py-2 text-black placeholder:text-slate-900 focus-within:outline-0 w-[48%]"
                                    required
                                    onChange={(e) => setFormData({...formData, fName:e.target.value})}
                                />
                                <input 
                                    type="text" 
                                    name="" 
                                    id="" 
                                    placeholder="Nama Belakang"
                                    className="bg-gray-100 rounded-md px-5 py-2 text-black placeholder:text-slate-900 focus-within:outline-0 w-[48%]"
                                    required
                                    onChange={(e) => setFormData({...formData, lName:e.target.value})}
                                />
                            </div>
                            <input 
                                type="text" 
                                name="" 
                                id="" 
                                placeholder="Nama Pengguna"
                                className="bg-gray-100 rounded-md px-5 py-2 text-black placeholder:text-slate-900 focus-within:outline-0"
                                required
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                            />
                            <select name="role" id="role" className="focus:outline-0 bg-gray-100 py-2 px-5 hover:cursor-pointer rounded-md" onChange={(e) => setFormData({...formData, role: e.target.value})}>
                                <option value="">Pilih Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            <div id="password" className="bg-gray-100 rounded-md px-5 py-2 focus:outline-0 focus-within:border-yellow-500 flex justify-center">
                                <input className="w-[96%] focus:outline-0 text-black placeholder:text-slate-900" type={showPassword ? "text" : "password"} placeholder="password" required onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="hover:cursor-pointer"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-blue-500 hover:text-blue-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-blue-500 hover:text-blue-600" />
                                    )}
                                </button>
                            </div>
                            <div className="flex flex-row justify-between md:hidden">
                                <p>Sudah Punya Akun?</p>
                                <Link className="text-blue-500 font-medium" href="/login">Login</Link>
                            </div>
                            <input 
                                type="submit" 
                                value="Create Account" 
                                className="bg-linear-to-r from-blue-400 to to-blue-700 text-white font-bold py-3 rounded-md hover:bg-linear-to-r hover:from-blue-600 hover:to-blue-900 hover:cursor-pointer transition "
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
} 