'use client';

import { useEffect, useState } from 'react';
import '../../styles/globals.css'
import styles from './styles.module.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import GameInfoCard from '@/components/GameInfoCard/GameInfoCard'

interface Game {
    id: number;
    opponent: string;
    result: string;
}

export default function History() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch(`${API_URL}/user-history/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                setGames(data);
            })
            .catch(err => {
                console.error("Erro ao buscar histórico:", err);
            })
            .finally(() => setLoading(false));
    });

    if (loading) {
        return (
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                {games.length > 0 ? (
                    games.map(game => (
                        <GameInfoCard
                            key={game.id}
                            username={game.opponent}
                            result={game.result === 'win' ? 'Vitória' : 'Derrota'}
                            time='15' // Pensar em algo sobre esse tempo
                        />
                    ))
                ) : (
                    <p>Nenhuma partida registrada.</p>
                )}
            </div>
            <Footer iconName='history.svg' text='Histórico' />
        </div>
    );
}