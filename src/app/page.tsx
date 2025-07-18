'use client';

import Image from "next/image";
import styles from "./styles.module.css"
import Header from "@/components/Header/Header";
import GenericButton from '@/components/GenericButton/GenericButton';
import Footer from '@/components/Footer/Footer';

import { useRouter } from 'next/navigation';

export default function Register() {

    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
        <div className={styles.main}>
            <Header></Header>
            <div className={styles.mainPageContainer}>
                <div className={styles.welcomeContainer}>
                    <div className={styles.welcomeImage}></div>
                    <div className={styles.welcomeLabel}>Bem vindo(a) ao PyChess</div>
                </div>
                <div className={styles.landInfoLayout}>
                    <div className={styles.landInfo}>
                        <Image src="/icons/garra.svg" alt="Profile" width={50} height={50} />
                        <p className={styles.landInfoTitle}>Você VS. a máquina</p>
                        <p className={styles.landInfoDescription}>
                            Enfrente um braço robótico em uma partida de xadrez totalmente automatizada
                        </p>
                    </div>

                    <div className={styles.landInfo}>
                        <Image src="/icons/dados.svg" alt="Profile" width={50} height={50} />
                        <p className={styles.landInfoTitle}>Monitore suas jogadas</p>
                        <p className={styles.landInfoDescription}>
                            Registre suas partidas e confira pelo seu smartphone
                        </p>
                    </div>

                    <div className={styles.didYouKnowLayout}>
                        <p className={styles.didYouKnowTitle}>Sabia que?</p>
                        <p className={styles.didYouKnowDesc}>Existem mais possibilidades de jogos de xadrez do que átomos no universo</p>
                    </div>
                </div>

                <GenericButton text="Jogue agora" onClick={handleClick}></GenericButton>
            </div>
            <Footer iconName='icon-home.svg' text='Login'></Footer>
        </div>

    )
}