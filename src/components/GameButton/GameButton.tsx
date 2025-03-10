import styles from './styles.module.css'

export default function GameButton() {
    return (
        <div className={styles.GameButtonContainer}>
            <p className={styles.GameButtonText}>Iniciar nova partida</p>
        </div>
    )
}