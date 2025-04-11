'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import PasswordInput from '@/components/PasswordInput/PasswordInput';
import '../../styles/globals.css'
import Input from "@/components/Input/Input";
import GenericButton from '@/components/GenericButton/GenericButton';
import styles from './styles.module.css'
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleInputChange = (setter: (val: string) => void) =>
        (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (!res.ok) {
                const errorMessage = Array.isArray(data.detail)
                    ? data.detail.map((d: any) => d.msg).join(' | ')
                    : data.detail || 'Erro ao fazer login';

                setError(errorMessage);
                return;
            }

            localStorage.setItem('token', data.token);
            router.push('/game');
        } catch {
            setError('Erro ao conectar com o servidor.');
        }
    };

    return (
        <div className={styles.pageContainer}>

            <div className={styles.splashFooterContainer}>
                <Image src="/icons/castle.svg" alt="Profile" width={50} height={50} />
                <p>PyChess</p>
                <p>Entre com sua conta para jogar</p>
            </div>

            <form className={styles.loginContainer} onSubmit={handleSubmit}>
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <GenericButton text='Entrar' type="submit" />

                <div className={styles.rememberContainer}>
                    <input type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">Lembrar de mim</label>
                </div>

                <a href="#">Esqueceu sua senha?</a>
                <p className={styles.loginOptions}>
                    Não tem uma conta? <a className={styles.linkHighlight} href="/register">Cadastre-se</a>
                </p>
            </form>

            <Footer iconName='person.svg' text='Login'></Footer>
        </div>
    )
}