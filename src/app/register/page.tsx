"use client"

import PasswordInput from '@/components/PasswordInput/PasswordInput';
import '../../styles/globals.css'
import Input from "@/components/Input/Input";
import GenericButton from '@/components/GenericButton/GenericButton';
import styles from './styles.module.css'
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Register() {
    const [passwordStrength, setPasswordStrength] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.name === "password") {
            const strength = checkPasswordStrength(e.target.value);
            setPasswordStrength(strength);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordStrength === "Fraca") {
            alert("A senha está fraca. Use uma senha mais segura.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/new-users/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error(`Erro: ${response.statusText}`);

            router.push("/login?success=Conta criada com sucesso");

        } catch (error) {
            console.error("❌ Erro no registro:", error);
        }
    };

    const checkPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength <= 2) return "Fraca";
        if (strength === 3 || strength === 4) return "Média";
        return "Forte";
    };

    return (
        <div className={styles.pageContainer}>

            <div className={styles.splashFooterContainer}>
                <Image src="/icons/castle.svg" alt="Profile" width={50} height={50} />
                <p>PyChess</p>
                <p>Adicione seus dados para cadastro</p>
            </div>

            <form className={styles.loginContainer} onSubmit={handleSubmit}>
                <Input inputLabel="Nome de usuário" inputName="username" inputText="Digite seu nome de usuário" value={formData.username} onChange={handleChange}></Input>
                <Input inputLabel="Email" inputName="email" inputText="Digite seu email" value={formData.email} onChange={handleChange}></Input>
                <PasswordInput inputLabel="Senha" inputName="password" inputText="Digite sua senha" value={formData.password} onChange={handleChange}></PasswordInput>
                {passwordStrength && (
                    <p style={{
                        color: passwordStrength === 'Forte' ? 'green' :
                            passwordStrength === 'Média' ? 'orange' : 'red'
                    }}>
                        Força da senha: {passwordStrength}
                    </p>
                )}
                <GenericButton text='Registrar' type="submit"></GenericButton>
                <p>Já tem uma conta? <a href="/login">Entre agora</a></p>
            </form>

            <Footer iconName='person.svg' text='Registro'></Footer>
        </div>
    )
}