import styles from './styles.module.css';
import { useRouter } from 'next/navigation';

interface GameButtonProps {
    hasOngoingGame?: boolean;
}

export default function GameButton({ hasOngoingGame = false }: GameButtonProps) {
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleClick = async () => {
        if (hasOngoingGame) {
            router.push('/game'); // ou /game_board se quiser continuar o atual
            return;
        }

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');

        try {
            const res = await fetch(`${API_URL}/start_game/?user_id=${userId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!res.ok) {
                const error = await res.json();
                alert(error.detail || "Erro ao iniciar o jogo.");
                return;
            }

            window.location.reload();

        } catch (err) {
            console.error("Erro ao iniciar jogo:", err);
            alert("Ocorreu um erro ao tentar iniciar a partida.");
        }
    };

    return (
        <div
            onClick={handleClick}
            className={
                hasOngoingGame
                    ? `${styles.GameButtonContainer} ${styles.continueGame}`
                    : `${styles.GameButtonContainer} ${styles.newGame}`
            }
        >
            <p className={styles.GameButtonText}>
                {hasOngoingGame ? 'Partida em andamento' : 'Iniciar nova partida'}
            </p>
        </div>
    );
}
