'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import '../../styles/globals.css'
import styles from './styles.module.css'
import GameInfoCard from "@/components/GameInfoCard/GameInfoCard";
import InfoButton from "@/components/InfoButton/InfoButton";
import GamePreview from '@/components/GamePreview/GamePreview';
import { Crown, Info, Play, Trophy } from 'lucide-react';

type LastGame = {
    id: number;
    username: string;
    result: string;
    duration: string;
};

export default function Game() {

    const router = useRouter();
    const [hasOngoingGame, setHasOngoingGame] = useState(false);
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [lastGame, setLastGame] = useState<LastGame | null>(null);
    const [roboConectado, setRoboConectado] = useState(false);
    const [isVirtual, setisVirtual] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const id = localStorage.getItem('user_id');
        setUserId(id);
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setisVirtual(event.target.checked);
    };


    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            alert("Você está tentando sair da partida!");
            event.preventDefault();
            event.returnValue = ""; // necessário para o alerta nativo aparecer em alguns navegadores
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {

                const gameBoardRes = await fetch(`${API_URL}/game_board/`);
                if (gameBoardRes.ok) {
                    setHasOngoingGame(true);
                }

                const lastGameRes = await fetch(`${API_URL}/last_game/?user_id=${userId}`);
                if (lastGameRes.ok) {
                    const data = await lastGameRes.json();
                    setLastGame(data);
                }

                const roboRes = await fetch(`${API_URL}/get-robo-mode/`);
                if (roboRes.ok) {
                    const roboData = await roboRes.json();
                    setRoboConectado(roboData.robo_mode === true);
                }

            } catch (err) {
                console.error("Erro:", err);
            } finally {
                setLoading(false);
            }

            return () => {
                window.removeEventListener("beforeunload", handleBeforeUnload);
            };
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    const handleClick = async (caminho: string) => {
        await fetch(`${API_URL}/start_game/?user_id=${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        router.push(`/${caminho}`);
    };


    const historyClick = (id: number) => {
        router.push(`/gamehistory/${id}`);
    };

    return (
        <div className='flex'>
            {roboConectado && (
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    backgroundColor: '#e0ffe0',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    boxShadow: '0 0 6px rgba(0,0,0,0.2)',
                    zIndex: 1000
                }}>
                    <span style={{ fontWeight: 500, color: '#006600' }}>Robô conectado</span>
                </div>
            )}

            <div className="container mx-auto px-72 my-10 pb-20">
                {/* <GameButton hasOngoingGame={hasOngoingGame} /> */}
                <button
                    className='bg-gradient-to-r cursor-pointer hover:bg-green-300 transition-all flex items-center gap-2 justify-center py-4 from-green-600 to-green-500 w-full text-white text-lg p-2 rounded-lg'
                    onClick={() => handleClick('play')}>
                    <Play />
                    <span className='font-medium'>Iniciar nova partida virtual</span>
                </button>
                <div className='w-full flex justify-center p-4'>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer"/>
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium">Partida virtual</span>
                    </label>
                </div>
                
                <div className='pt-8'>
                    <p className='text-lg font-bold'>Última partida</p>
                    {lastGame ? (
                        <GameInfoCard
                            username={lastGame.username}
                            result={lastGame.result}
                            time={lastGame.duration}
                            onClick={() => historyClick(lastGame.id)}
                        />
                    ) : (
                        <div className='flex mt-4 justify-center py-8 border border-gray-400 rounded-lg border-dashed'>
                            <p className='text-gray-500'>Nenhuma partida encontrada</p>
                        </div>
                    )}
                </div>

                <div className='pt-8'>
                    <p className='text-lg font-bold'>Menu rápido</p>
                    <div className='pt-4 flex gap-4 justify-between'>
                        <InfoButton icon={<Trophy size={32} className='text-orange-500' />} title="Histórico Geral" text="Ver partidas anteriores" onClick={() => handleClick('history')}></InfoButton>
                        <InfoButton icon={<Info size={32} className='text-blue-500' />} title="Estatísticas" text="Veja as suas estatísticas"></InfoButton>
                        <InfoButton icon={<Crown size={32} className='text-purple-500' />} title="Ranking" text="Ver o ranking dos jogadores" onClick={() => handleClick('ranking')}></InfoButton>
                    </div>
                </div>
                <div className='pt-8'>
                    {/* <p className='text-lg font-bold'>Últimos movimentos</p>
                    <GamePreview hasOngoingGame={hasOngoingGame} /> */}
                </div>
            </div>
        </div>
    )
}