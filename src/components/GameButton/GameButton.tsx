import styles from './styles.module.css';

interface GameButtonProps {
    hasOngoingGame?: boolean;
}

export default function GameButton({ hasOngoingGame = false }: GameButtonProps) {
    return (
        <div
            className={
                hasOngoingGame
                    ? `${styles.GameButtonContainer} ${styles.continueGame}`
                    : `${styles.GameButtonContainer} ${styles.newGame}`
            }
        >
            <p className={styles.GameButtonText}>
                {hasOngoingGame ? 'Patida em andamento' : 'Iniciar nova partida'}
            </p>
        </div>
    );
}
