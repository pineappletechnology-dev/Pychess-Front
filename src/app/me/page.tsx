'use client';

import { useEffect, useState } from 'react';
import InfoButton from '@/components/InfoButton/InfoButton';
import '../../styles/globals.css';
import styles from './styles.module.css';
import Image from "next/image";
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

export default function Me() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '••••••••',
    });
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${API_URL}/user-session/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error('Erro ao buscar dados do usuário');

                const data = await res.json();

                setUserData({
                    username: data.username,
                    email: data.email,
                    password: '••••••••',
                });

                setLoading(false);
            } catch (error) {
                console.error('❌ Erro ao carregar dados do usuário:', error);
            }
        };

        fetchUserData();
    }, [API_URL]);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <Image src="/icons/loading.svg" alt="Loading" width={50} height={50} className={styles.spinner} />
                <p>Carregando perfil...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.dataInputContainer}>
                    <div className={styles.userContent}>
                        <p>Foto do usuário</p>
                        <Image src={`/icons/edit.svg`} alt="Editar" width={25} height={25} />
                    </div>

                    <div className={styles.userContent}>
                        <input className={styles.userInput} type="text" name="username" value={userData.username} readOnly />
                        <Image src={`/icons/edit.svg`} alt="Editar" width={25} height={25} />
                    </div>

                    <div className={styles.userContent}>
                        <input className={styles.userInput} type="text" name="email" value={userData.email} readOnly />
                        <Image src={`/icons/edit.svg`} alt="Editar" width={25} height={25} />
                    </div>

                    <div className={styles.userContent}>
                        <input className={styles.userInput} type="password" name="password" value={userData.password} readOnly />
                        <Image src={`/icons/edit.svg`} alt="Editar" width={25} height={25} />
                    </div>
                </div>

                <div className={styles.infoButtonContainer}>
                    <InfoButton iconName="history.svg" title="Histórico" text="seus jogos anteriores" />
                    <InfoButton iconName="crown.svg" title="Ranking" text="confira o seu ranking" />
                </div>

                <button className={styles.deleteAccountButton}>
                    <Image src={'/icons/delete.svg'} alt="trash can" width={50} height={50} />
                    <p>APAGAR CONTA</p>
                </button>
            </div>

            <Footer iconName='person.svg' text='Meu perfil' />
        </div>
    );
}
