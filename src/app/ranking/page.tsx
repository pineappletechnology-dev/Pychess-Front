'use client';

import '../../styles/globals.css'
import Header from '@/components/Header/Header'
import styles from './styles.module.css'
import Footer from '@/components/Footer/Footer'
import RankItem from '@/components/RankItem/RankItem'
import Image from 'next/image'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    username: string;
    rating: number;
}

export default function Ranking() {
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);

    const token = localStorage.getItem('token');

    if (!token) {
        router.push('/');
    }

    useEffect(() => {
        fetch(`${API_URL}/get-users/`)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error('Erro ao buscar usuários:', err))
            .finally(() => setLoading(false));
    });

    if (loading) {
        return (
            <div className={styles.container}>
                <Header />
                <div className={styles.spinnerContainer}>
                    <div className={styles.spinner}></div>
                </div>
                <Footer iconName='crown.svg' text='Ranking' />
            </div>
        );
    }

    const topUser = users[0];
    const topFive = users.slice(1, 6);

    return (
        <div className={styles.container}>
            <Header></Header>
            <div className={styles.content}>
                {topUser && (
                    <div className={styles.bestContainer}>
                        <div className={styles.bestName}>
                            <p className={styles.bestIcon}>
                                <Image src={`/icons/crown.svg`} alt="Profile" width={50} height={50} />
                            </p>
                            <p className={styles.bestTitle}>{topUser.username}</p>
                        </div>
                        <div className={styles.bestDesc}>
                            <p className={styles.bestText}>{topUser.rating} pontos</p>
                        </div>
                    </div>
                )}

                <p>Top 5</p>
                <div className={styles.topPlayersContainer}>
                    {topFive.map((user, index) => (
                        <RankItem
                            key={index}
                            name={user.username}
                            victoryCount={`${user.rating} pontos`}
                        />
                    ))}
                </div>

            </div>
            <Footer iconName='crown.svg' text='Ranking'></Footer>
        </div>
    )
}