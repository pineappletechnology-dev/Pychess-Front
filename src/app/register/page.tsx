"use client"
import PasswordInput from '@/components/PasswordInput/PasswordInput';
import '../../styles/globals.css'
import Input from "@/components/Input/Input";
import GenericButton from '@/components/GenericButton/GenericButton';
import styles from './styles.module.css'
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import { useEffect, useState } from "react";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/new_user/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error(`Erro: ${response.statusText}`);

            const data = await response.json();
            console.log("✅ Usuário registrado:", data);
        } catch (error) {
            console.error("❌ Erro no registro:", error);
        }
    };


    return (
        <div className={styles.pageContainer}>

            <div className={styles.splashFooterContainer}>
                <Image src="/icons/castle.svg" alt="Profile" width={50} height={50} />
                <p>PyChess</p>
                <p>Adicione seus dados para cadastro</p>
            </div>

            <form className={styles.loginContainer} onSubmit={handleSubmit}>
                <Input inputLabel="Nome de usuário" inputName="username" inputText="Digite seu nome de usuário" onChange={handleChange}></Input>
                <Input inputLabel="Email" inputName="email" inputText="Digite seu email" onChange={handleChange}></Input>
                <PasswordInput inputLabel="Senha" inputName="password" inputText="Digite sua senha" onChange={handleChange}></PasswordInput>
                <GenericButton text='Registrar' type="submit"></GenericButton>
                <p>Já tem uma conta? <a href="/login">Entre agora</a></p>
            </form>

            <Footer iconName='person.svg' text='Registro'></Footer>
        </div>
    )
}