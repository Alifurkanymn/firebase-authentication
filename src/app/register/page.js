'use client'

import React, { useState } from 'react';
import { UserAuth } from '../authContext';
import { useRouter } from 'next/navigation';

const Register = () => {
    const { registerWithEmail } = UserAuth();
    const router = useRouter();

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        try {
            await registerWithEmail(email, password, displayName);
            router.push('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 h-screen w-full'>
            <div className='flex justify-center bg-white rounded shadow-lg px-10 lg:px-0'>
                <div className='flex flex-col justify-center h-full w-10/12 md:w-6/12'>
                    <h2 className='text-black text-xl font-extralight'>Firebase</h2>
                    <h1 className='text-black font-bold text-2xl mb-10'>Email ile kayıt ol</h1>

                    {error && <p className="text-red-500">{error}</p>}
                    <input
                        type="text"
                        placeholder="İsim"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className='mt-4 rounded px-4 py-3 bg-white border-[1px] border-gray-300 text-black'
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='mt-4 rounded px-4 py-3 bg-white border-[1px] border-gray-300 text-black'
                    />
                    <input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='mt-4 rounded px-4 py-3 bg-white border-[1px] border-gray-300 text-black'
                    />
                    <button
                        className='bg-red-400 hover:bg-red-500 duration-300 text-white font-bold py-3 px-4 rounded mt-10'
                        onClick={handleRegister}
                    >
                        Kayıt Ol
                    </button>
                </div>
            </div>
            <div className="hidden md:block bg-gradient-to-r from-red-200 to-red-400"></div>
        </div>
    );
};

export default Register;
