"use client"

import PasswordInput from '@/components/PasswordInput/PasswordInput';
import '../../styles/globals.css'
import Input from "@/components/Input/Input";
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
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
        setError(""); // Limpa erros anteriores
        setIsLoading(true); // Inicia o estado de carregamento

        // Validação de campos obrigatórios
        if (!formData.username.trim()) {
            setError("Nome de usuário é obrigatório.");
            return;
        }

        if (!formData.email.trim()) {
            setError("Email é obrigatório.");
            return;
        }

        // Validação básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Por favor, insira um email válido.");
            return;
        }

        if (!formData.password) {
            setError("Senha é obrigatória.");
            return;
        }

        if (passwordStrength === "Fraca") {
            setError("A senha está fraca. Use uma senha mais segura.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/new-users/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                // Tratamento específico para diferentes códigos de erro
                if (response.status === 400) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Dados inválidos. Verifique as informações fornecidas.");
                } else if (response.status === 409) {
                    throw new Error("Usuário ou email já cadastrado. Tente outro ou faça login.");
                } else if (response.status === 500) {
                    throw new Error("Erro no servidor. Tente novamente mais tarde.");
                } else {
                    throw new Error(`Erro: ${response.status} - ${response.statusText || "Ocorreu um erro desconhecido"}`);
                }
            }

            router.push("/login?success=Conta criada com sucesso");

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("❌ Erro no registro:", error);
            setError(error.message || "Ocorreu um erro ao criar sua conta. Tente novamente.");
        } finally {
            setIsLoading(false); // Finaliza o estado de carregamento independente do resultado
        }
    };

    const checkPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (password.length === 0) return "";
        if (strength <= 2) return "Fraca";
        if (strength === 3 || strength === 4) return "Média";
        return "Forte";
    };

    return (
        <div className="min-h-dvh md:flex justify-center items-center flex-col md:pb-56">

            <div className="flex flex-col items-center justify-center md:pb-5 md:pt-0 py-5">
                <Image src="/icons/castle.svg" alt="Profile" width={65} height={65} className='w-16 md:w-20' />
                <p className='text-3xl font-medium'>Registrar-se</p>
                <p className='text-lg opacity-75 mt-1'>Crie uma conta para jogar</p>
            </div>

            <form className="bg-white border-y border-gray-300 md:border-0 px-8 py-8 md:rounded-lg flex-col flex gap-5 md:shadow" onSubmit={handleSubmit}>
                <Input inputLabel="Nome de usuário" inputName="username" inputText="Digite seu nome de usuário" value={formData.username} onChange={handleChange}></Input>
                <Input inputLabel="Email" inputName="email" inputText="Digite seu email" value={formData.email} onChange={handleChange}></Input>
                <PasswordInput inputLabel="Senha" inputName="password" inputText="Digite sua senha" value={formData.password} onChange={handleChange}></PasswordInput>
                {passwordStrength && (
                    <div className="mb-1">
                        <div className="flex justify-between mb-1">
                            <span className={`text-sm font-medium ${passwordStrength === 'Forte' ? 'text-green-500' : passwordStrength === 'Média' ? 'text-orange-500' : 'text-red-500'}`}>
                                Força da senha: {passwordStrength}
                            </span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-200 rounded-full">
                            <div
                                className="h-2.5 rounded-full transition-all duration-300 ease-in-out"
                                style={{
                                    width: passwordStrength === 'Forte' ? '100%' :
                                        passwordStrength === 'Média' ? '66%' : '33%',
                                    backgroundColor: passwordStrength === 'Forte' ? '#22c55e' :
                                        passwordStrength === 'Média' ? '#f97316' : '#ef4444'
                                }}
                            ></div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                                ABC
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${/[a-z]/.test(formData.password) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                                abc
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${/[0-9]/.test(formData.password) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                                123
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${/[^A-Za-z0-9]/.test(formData.password) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                                @#$
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${formData.password.length >= 8 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                                8+ caracteres
                            </span>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="p-3 mb-3 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                        <span className="font-medium">Erro!</span> {error}
                    </div>
                )}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 uppercase text-white md:px-40 mx-auto rounded-md font-medium text-lg transition-all ${isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-500 cursor-pointer hover:bg-blue-400'}`}
                >
                    <span className='text-center'>
                        {isLoading ? 'Criando conta...' : 'Criar conta'}
                    </span>
                </button>
                <p className='text-center'>Já tem uma conta?
                    <a href="/login" className='text-blue-600 hover:text-blue-500 transition-all ml-1'>
                        Entre agora
                    </a>
                </p>
            </form>
        </div>
    )
}