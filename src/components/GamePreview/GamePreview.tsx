import styles from './styles.module.css'

interface GamePreviewProps {
    hasOngoingGame?: boolean;
}

export default function GamePreview({ hasOngoingGame = false }: GamePreviewProps) {
    return (
        <div className={styles.container}>
            <p>
                {hasOngoingGame
                    ? 'Partida em andamento, continue jogando!'
                    : 'Nenhum jogo em andamento'}
            </p>
        </div>
    );
}