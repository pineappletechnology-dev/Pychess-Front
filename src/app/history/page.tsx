'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import '../../styles/globals.css';
import styles from './styles.module.css';
import Footer from '@/components/Footer/Footer';
import GameInfoCard from '@/components/GameInfoCard/GameInfoCard';

interface Game {
    username: string;
    id: number;
    result: string;
    duration: string; // formato "HH:MM:SS"
}

export default function History() {
    const router = useRouter();
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const id = localStorage.getItem('user_id');
        if (id) {
            setUserId(id);
            console.log('User ID encontrado:', id);
        } else {
            console.warn('Nenhum user_id encontrado. Redirecionando...');
            router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        if (!userId) return;

        const token = localStorage.getItem('token');

        fetch(`${API_URL}/user-history/?user_id=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(error.detail || 'Erro desconhecido');
                }
                return res.json();
            })
            .then((data) => {
                console.log('Histórico recebido:', data);
                setGames(data);
            })
            .catch((err) => {
                console.error('Erro ao buscar histórico:', err);
            })
            .finally(() => setLoading(false));
    }, [userId, API_URL]);

    const handleClick = (id: number) => {
        router.push(`/gamehistory/${id}`);
    };

    if (loading) {
        return (
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {games.length > 0 ? (
                    games.map((game) => (
                        <GameInfoCard
                            key={game.id}
                            username={game.username}
                            result={game.result}
                            time={formatDuration(game.duration)}
                            onClick={() => handleClick(game.id)}
                        />
                    ))
                ) : (
                    <p>Nenhuma partida registrada.</p>
                )}
            </div>
            <Footer iconName="history.svg" text="Histórico" />
        </div>
    );
}

/**
 * Função auxiliar para formatar o tempo de jogo (HH:MM:SS → “X min Y seg”)
 * Se quiser deixar no formato puro (HH:MM:SS), basta não usar essa função.
 */
function formatDuration(duration: string) {
    const [hours, minutes, seconds] = duration.split(':').map(Number);

    if (hours > 0) {
        return `${hours}h ${minutes}min ${seconds}s`;
    } else if (minutes > 0) {
        return `${minutes}min ${seconds}s`;
    } else {
        return `${seconds}s`;
    }
}
