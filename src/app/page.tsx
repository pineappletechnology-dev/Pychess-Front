'use client';

import Image from "next/image";

import GenericButton from '@/components/GenericButton/GenericButton';
import Footer from '@/components/Footer/Footer';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Bot, BarChart3, Lightbulb } from "lucide-react";

export default function Register() {

    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    const chessMessages = [
        "O primeiro programa de xadrez foi escrito por Alan Turing em 1951",
        "O termo 'Xeque-mate' vem do persa 'Shah Mat', que significa 'O rei está morto'",
        "Existem mais possibilidades de jogos de xadrez do que átomos no universo"
    ];
    
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => 
                (prevIndex + 1) % chessMessages.length
            );
        }, 2000);
        
        return () => clearInterval(interval);
    }, [chessMessages.length]);

    const handleClick = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/verify-token/?token=${token}`, {
                method: 'GET',
            });

            if (res.ok) {
                const data = await res.json();
                if (data.valid) {
                    router.push('/game');
                } else {
                    // Token inválido por alguma razão inesperada
                    localStorage.removeItem('token');
                    localStorage.removeItem('user_id');
                    router.push('/login');
                }
            } else {
                // Token expirado ou inválido
                localStorage.removeItem('token');
                localStorage.removeItem('user_id');
                router.push('/login');
            }
        } catch (error) {
            console.error("Erro ao verificar o token:", error);
            router.push('/login');
        }
    };

    return (
        <div className="">
            <div className="lg:max-w-[800px] px-5 mx-auto">
                <div className="py-12">
                    <div className="flex items-center flex-col gap-8">
                        <Image 
                            src="/images/chessimage.png" 
                            alt="Banner" 
                            width={832} 
                            height={256} 
                            className="max-h-[256px] w-full rounded-xl" 
                        />
                        <div className="bg-blue-600 text-center w-full p-4 text-2xl text-white rounded-xl font-medium">
                            Bem vindo(a) ao PyChess
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 py-8">
                        <div className="bg-white p-8 flex items-center gap-4 rounded-xl shadow">
                            <div className="bg-blue-600 max-w-max p-3 rounded-xl">
                                <Bot size={36} className="text-white" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-lg">Você VS. a máquina</p>
                                <p className="">
                                    Enfrente um braço robótico em uma partida de xadrez totalmente automatizada
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-8 flex items-center gap-4 rounded-xl shadow">
                            <div className="bg-green-600 max-w-max p-3 rounded-xl">
                                <BarChart3 size={36} className="text-white" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-lg">Monitore suas jogadas</p>
                                <p className="">
                                    Registre suas partidas e confira pelo seu smartphone
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#e4f0ff] border border-[#bfdbfe] p-8 flex gap-4 rounded-xl shadow">
                            <div className="bg-purple-600 max-w-max p-3 max-h-[60px] rounded-xl">
                                <Lightbulb size={36} className="text-white" />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <p className="font-semibold text-lg">Sabia que?</p>
                                <p className="text-[#1e4eb7]">
                                    {chessMessages[currentMessageIndex]}
                                </p>
                                <div className="flex justify-center gap-2 mt-3">
                                    {chessMessages.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-[10px] h-[10px] rounded-full bg-blue-600 transition-opacity duration-300 ${
                                                index === currentMessageIndex ? 'opacity-100' : 'opacity-30'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <GenericButton text="Jogue agora" onClick={handleClick}></GenericButton>
                    </div>
                </div>
            </div>
            <Footer iconName='icon-home.svg' text='Login'></Footer>
        </div>

    )
}