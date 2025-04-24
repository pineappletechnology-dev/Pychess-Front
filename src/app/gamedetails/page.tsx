'use client';

import Header from '@/components/Header/Header';
import '../../styles/globals.css'
import styles from './styles.module.css'
import GameDetailPanel from "@/components/GameDetailPanel/GameDetailPanel";
import Footer from '@/components/Footer/Footer';

import { useEffect, useState } from 'react';

export default function GameDetails() {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch(`${API_URL}/user-session/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const draws = data.total_games - (data.wins + data.losses);
                const winRate = ((data.wins / data.total_games) * 100).toFixed(2);
                const lossRate = ((data.losses / data.total_games) * 100).toFixed(2);
                const rating = data.rating

                setUserData({
                    ...data,
                    draws,
                    winRate: `${winRate}%`,
                    lossRate: `${lossRate}%`,
                    rating
                });

                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar dados do usuário:", error);
                setLoading(false);
            });
    });

    if (loading || !userData) {
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
                <p>Informações do jogador</p>
                <GameDetailPanel
                    labels={['Número de partidas', 'Vitórias', 'Derrotas', 'Empates', 'Rating']}
                    values={[
                        userData.total_games.toString(),
                        userData.wins.toString(),
                        userData.losses.toString(),
                        userData.draws.toString(),
                        userData.rating.toString()
                    ]}
                    maxWidth='90%'
                    minWidth='90%'
                />

                <p>Outros dados</p>
                <div className={styles.gameData}>
                    <GameDetailPanel labels={['Taxa de vitória']} values={[userData.winRate]} maxWidth='30%' minWidth='30%' />
                    <GameDetailPanel labels={['Taxa de derrota']} values={[userData.lossRate]} maxWidth='30%' minWidth='30%' />
                </div>
            </div>
            <Footer iconName='person.svg' text='Perfil' />
        </div>
    )
}