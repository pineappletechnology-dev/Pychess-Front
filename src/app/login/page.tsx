'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import PasswordInput from '@/components/PasswordInput/PasswordInput';
import '../../styles/globals.css'
import Input from "@/components/Input/Input";

import Image from 'next/image';

export default function Login() {
    const router = useRouter();
    const searcParams = useSearchParams();
    const successMessage = searcParams.get("success");
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (successMessage) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleInputChange = (setter: (val: string) => void) =>
        (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (!res.ok) {
                const errorMessage = Array.isArray(data.detail)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ? data.detail.map((d: any) => d.msg).join(' | ')
                    : data.detail || 'Erro ao fazer login';

                setError(errorMessage);
                return;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user_id', data.user_id);

            router.push('/game');
        } catch {
            setError('Erro ao conectar com o servidor.');
        }
    };

    return (
        <div className="min-h-dvh md:flex justify-center items-center flex-col md:pb-56">

            {showSuccess && (
                <div className="">
                    {successMessage}
                </div>
            )}

            <div className="flex flex-col items-center justify-center md:pb-5 md:pt-0 py-5">
                <Image src="/icons/castle.svg" alt="Profile" width={65} height={65} className='w-16 md:w-20' />
                <p className='text-3xl font-medium'>Acessar conta</p>
                <p className='text-lg opacity-75 mt-1'>Entre com sua conta para jogar</p>
            </div>

            <form className="bg-white border-y border-gray-300 md:border-0 px-8 py-8 md:rounded-lg flex-col flex gap-5 md:shadow" onSubmit={handleSubmit}>
                <Input
                    inputLabel="Nome de usuário"
                    inputName="username"
                    inputText="Digite seu nome de usuário"
                    value={username}
                    onChange={handleInputChange(setUsername)}
                />
                <PasswordInput
                    inputLabel="Senha"
                    inputName="password"
                    inputText="Digite sua senha"
                    value={password}
                    onChange={handleInputChange(setPassword)}
                />

                <div className="flex items-center gap-1">
                    <input type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">Lembrar de mim</label>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className='bg-gradient-to-r from-blue-600 to-blue-500 w-full py-3 uppercase text-white md:px-40 mx-auto rounded-md font-medium text-lg cursor-pointer hover:bg-blue-400 transition-all'>
                    <span className='text-center'>Entrar</span>
                </button>

                <a href="#" className='text-center hover:text-blue-500 transition-all'>Esqueceu sua senha?</a>
                <p className="text-center">
                    Não tem uma conta?
                    <a className="text-blue-600 hover:text-blue-500 transition-all ml-1" href="/register">
                        Cadastre-se
                    </a>
                </p>
            </form>
        </div>
    )
}