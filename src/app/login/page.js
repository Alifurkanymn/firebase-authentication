'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserAuth } from '../authContext';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const { user, googleSignIn, logOut, registerWithEmail, loginWithEmail } = UserAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    const handleSignIn = async () => {
        try {
            await googleSignIn();
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEmailLogin = async () => {
        try {
            await loginWithEmail(email, password);
            setError(null);
        } catch (error) {
            setError(`Giriş hatası: ${error.message}`);
        }
    };

    const handleEmailRegister = async () => {
        router.push('/register');
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 h-screen w-full'>
            <div className='flex justify-center bg-white rounded shadow-lg px-10 lg:px-0'>
                <div className='flex flex-col justify-center h-full'>
                    <h2 className='text-black text-xl font-extralight'>Firebase ile</h2>
                    <h1 className='text-black font-bold text-2xl mb-10'>Email veya Google ile giriş yap</h1>

                    {error && (
                        <div className="bg-red-100 text-red-600 p-3 rounded mb-3 border border-red-400">
                            {error}
                        </div>
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='rounded px-4 py-3 bg-white border-[1px] border-gray-300 text-black'
                    />
                    <input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='mt-4 rounded px-4 py-3 bg-white border-[1px] border-gray-300 text-black'
                    />
                    <button className='bg-red-400 hover:bg-red-500 duration-300 text-white font-bold py-3 px-4 rounded mt-10' onClick={handleEmailLogin}>
                        Email İle Giriş Yap
                    </button>
                    <p className='text-black mt-3 text-center text-sm'>Veya</p>
                    <button className='bg-white border-[1px] border-red-500 hover:bg-red-400 hover:text-white duration-300 text-red-500 font-bold py-3 px-4 rounded mt-3 flex items-center justify-center' onClick={handleSignIn}>
                        <FaGoogle />
                    </button>
                    <div className='flex items-center mt-10'>
                        <p className='text-black'>Hesabın mı yok ?</p>
                        <button className='text-start text-red-500 font-bold ms-3 rounded' onClick={handleEmailRegister}>
                            Kayıt Ol
                        </button>
                    </div>
                </div>
            </div>
            <div className="hidden md:block bg-gradient-to-r from-red-200 to-red-400"></div>
        </div>
    );
}

export default Login;
