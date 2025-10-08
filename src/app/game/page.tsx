'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import '../../styles/globals.css'
import styles from './styles.module.css'
import Footer from "@/components/Footer/Footer";
import GameInfoCard from "@/components/GameInfoCard/GameInfoCard";
import GameButton from "@/components/GameButton/GameButton";
import InfoButton from "@/components/InfoButton/InfoButton";
import GamePreview from '@/components/GamePreview/GamePreview';

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setisVirtual(event.target.checked);
    };


    useEffect(() => {
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

                const lastGameRes = await fetch(`${API_URL}/last_game/`);
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

    const handleClick = (caminho: string) => {
        router.push(`/${caminho}`);
    };


    const historyClick = (id: number) => {
        router.push(`/gamehistory/${id}`);
    };

    return (
        <div className={styles.container}>
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

            <div className={styles.content}>
                <GameButton hasOngoingGame={hasOngoingGame} isVirtual={isVirtual} />
                <div className="flex items-center gap-3">
                    <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isVirtual}
                        onChange={(e) => setisVirtual(e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                                    dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700
                                    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                                    peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                                    after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                                    after:h-5 after:w-5 after:transition-all dark:border-gray-600
                                    peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
                    <span className="ml-3 text-sm font-medium">
                        Jogo virtual
                    </span>
                    </label>

                </div>
                <p>Última partida</p>
                {lastGame ? (
                    <GameInfoCard
                        username={lastGame.username}
                        result={lastGame.result}
                        time={lastGame.duration}
                        onClick={() => historyClick(lastGame.id)}
                    />
                ) : (
                    <p>Carregando última partida...</p>
                )}

                <p>Menu rápido</p>
                <div className={styles.quickMenu}>
                    <InfoButton iconName="history.svg" title="Histórico Geral" text="Ver partidas anteriores" onClick={() => handleClick('history')}></InfoButton>
                    <InfoButton iconName="info.svg" title="Sobre" text="Conheça sobre a plataforma"></InfoButton>
                    <InfoButton iconName="crown.svg" title="Ranking" text="Ver o ranking dos jogadores" onClick={() => handleClick('ranking')}></InfoButton>
                </div>
                <GamePreview hasOngoingGame={hasOngoingGame} />
            </div>
            <Footer iconName="icon-game.svg" text="Jogo"></Footer>
        </div>
    )
}